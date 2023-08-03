// 파이어베이스 앱 객체 모듈 가져오기
import { initializeApp } from "firebase/app"
// 파이어스토어 객체 변수 가져오기
import { getFirestore, collection } from 'firebase/firestore'

// 파이어베이스 DB를 초기화하고 연결
const oDB = initializeApp({
  // 파이어베이스 콘솔에서 복사하여 붙여넣기
  apiKey: "AIzaSyBgiMJKRkGMb_SnAH32eOO4UjwhVG6bVqo",
  authDomain: "coherent-galaxy-278501.firebaseapp.com",
  databaseURL: "https://coherent-galaxy-278501-default-rtdb.firebaseio.com",
  projectId: "coherent-galaxy-278501",
  storageBucket: "coherent-galaxy-278501.appspot.com",
  messagingSenderId: "624537175284",
  appId: "1:624537175284:web:9aff185598f783e51a0aa1",
  measurementId: "G-Q953HQW1N6"
})

// 파이어베이스 DB객체 중에서 todos 항목을 다른 곳에서 oTodosinDB로 사용하도록 내보내기
export const database = getFirestore(oDB);
export const oTodosinDB = collection(database, 'todos');