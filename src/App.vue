<template>
  <v-app>
      <v-app-bar color="lime text-white">
        <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>
        <v-toolbar-title>To-Do 리스트</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row class="my-5">
            <v-col cols="8" offset="1">
              <v-text-field label="할 일" v-model="sTodoTitle"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn height="56" color="pink" dark prepend-icon="mdi-plus" variant="flat" @click="fnSubmitTodo()">추가하기</v-btn>
            </v-col>
          </v-row>
          
          <!-- 동기화 페이지 컴포넌트 엘리먼트 사용 -->
          <list_page/>
          
        </v-container>
      </v-main>
      <v-footer color="lime-darken-3" fixed>
        <div class="mx-auto">Copyright &copy; {{ new Date().getFullYear() }} RunaUXLabs.web.app</div>
      </v-footer>
  </v-app>
</template>

<script>
// 동기화페이지 컴포넌트 가져옴
import list_page from '@/components/list_page'
// 파이어베이스에서 oTodosinDB 객체 변수 가져옴
import { oTodosinDB } from '@/datasources/firebase';
// 파이어스토어 모듈객체 가져오기
import { doc, setDoc } from "firebase/firestore";

export default {
  name: 'App',
  components: { 'list_page': list_page },
  data() {
    return {
      oTodos: [], // 할일 데이터 목록 저장 변수
      sTodoTitle: '' // 할 일 제목 저장 문자열 변수
    }
  },
  // firestore를 쉽게 사용하도록 oTodos 변수로 변경
  firestore:{
      oTodos: oTodosinDB
  },
  methods: {
    // setDoc(db, 'doc', 'id') 할 일 제목, 완료, 수정모드 상태값을 DB에 저장
    fnSubmitTodo() {
      setDoc(doc(oTodosinDB), {
        todo_title: this.sTodoTitle,
        b_completed: false,
        b_edit: false
      });
      this.sTodoTitle = '';
    }
  }
}
</script>

