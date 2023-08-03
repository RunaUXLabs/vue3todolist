<template>
  <v-row class="mt-5">
    <v-col cols="12">
      <v-list two-line v-for="item in this.oTodos" :key=item.key>
        <!-- item.b_edit값을 통해 읽기모드인 경우만 표시 -->
        <v-card color="grey-lighten-2 pa-6" v-if="!item.b_edit">
          <v-list-item-action start>
            <!-- 체크박스 표시하고 선택되면 변경상태 DB에 저장 -->
            <v-checkbox-btn v-model="item.b_completed" @change="fnCheckboxChange(item)"></v-checkbox-btn>
            <!-- 아이콘 표시하고 클릭하면 수정/삭제 모드로 변경함 -->
            <v-btn prepend-icon="mdi-note-edit-outline" @click="fnSetEditTodo(item.id)">수정</v-btn>
            <v-btn prepend-icon="mdi-trash-can-outline" @click="fnRemoveTodo(item.id)">삭제</v-btn>
          </v-list-item-action>
          <!-- 체크박스 선택시 클래스 추가로 제목에 취소선 표시 -->
          <v-list-item-title :class="{ 'style_completed': item.b_completed }">
            {{ item.todo_title }}
          </v-list-item-title>
        </v-card>

        <!-- item.b_edit값을 통해 수정모드인 경우 어둡게 표시 -->
        <v-card color="grey-lighten-1" v-else>
          <v-list-item class="pa-2">
            <v-list-item-action start>
              <v-checkbox-btn v-model="item.b_completed"></v-checkbox-btn>
            </v-list-item-action>
            <!-- v-list-item안에서 텍스트입력과 버튼 사용을 위해 v-card 엘리먼트 사용 -->
            <v-card-text>
              <!-- 포커스를 입력창으로 바로 옮기고 삭제 아이콘도 추가함 -->
              <v-text-field clearable v-model="item.todo_title"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <!-- 수정모드에서 '저장' 아이콘 클릭하면 해당 item 저장 -->
              <v-btn prepend-icon="mdi-checkbox-marked-circle-outline" @click="fnSaveEdit(item)">저장</v-btn>
              <!-- 수정모드에서 '취소' 아이콘 클릭하면 취소하고 읽기모드로 돌아감 -->
              <v-btn prepend-icon="mdi-undo-variant" @click="fnCancelEdit(item.id)">취소</v-btn>
            </v-card-actions>
          </v-list-item>
        </v-card>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
// 파이어베이스에서 oTodosinDB 객체 변수 가져옴
import { database, oTodosinDB } from '@/datasources/firebase';
// 파이어스토어 모듈객체 가져오기
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default {
  name: 'list_page',
  data() {
    return {
      oTodos: [], // 할일 데이터 목록 저장 변수
      sTodoTitle: '' // 할 일 제목 저장 문자열 변수
    };
  },
  // firestore를 쉽게 사용하도록 oTodos 변수로 변경
  firestore: { oTodos: oTodosinDB },
  methods: {
    // deleteDoc(doc(db, 'doc', 'id')) 전달된 할 일을 DB에서 제거
    fnRemoveTodo(pKey) {
      deleteDoc(doc(database, 'todos', pKey));
    },
    // updateDoc(doc(db, 'doc', 'id'),{필드수정}) 전달된 할 일의 b_edit를 수정모드로 변경
    fnSetEditTodo(pKey) {
      updateDoc(doc(database, 'todos', pKey), { b_edit: true });
    },
    // updateDoc(doc(db, 'doc', 'id'),{필드수정}) 전달된 할 일의 b_edit를 읽기모드로 변경
    fnCancelEdit(pKey) {
      updateDoc(doc(database, 'todos', pKey), { b_edit: false });
    },
    // updateDoc(doc(db, 'doc', 'id'),{필드수정}) 전달된 할 일의 수정값을 DB에 저장
    fnSaveEdit(sKey) {
      const pKey = sKey.id
      updateDoc(doc(database, 'todos', pKey), {
        todo_title: sKey.todo_title,
        b_completed: sKey.b_completed,
        b_edit: false
      });
    },
    // updateDoc(doc(db, 'doc', 'id'),{필드수정}) 체크박스 선택되면 DB에 b_completed 변경값 저장
    fnCheckboxChange(sKey) {
      const pKey = sKey.id
      updateDoc(doc(database, 'todos', pKey), {
        b_completed: sKey.b_completed
      });
    }
  }
};
</script>

<style>
.style_completed {
  text-decoration: line-through;
}</style>