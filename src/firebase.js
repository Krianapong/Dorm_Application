import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // สำหรับการเข้าสู่ระบบ **อย่าลืมใส่ compat ไม่งั้น error version
import "firebase/compat/firestore"; // สำหรับฐานข้อมูล
import "firebase/compat/storage"; // สำหรับรูปภาพ

const firebaseConfig = {
  apiKey: "AIzaSyDb0AZuE7orVxZqnkt__CerM3Be_uTZW3Y",
  authDomain: "dorm-169aa.firebaseapp.com",
  databaseURL: "https://dorm-169aa-default-rtdb.firebaseio.com",
  projectId: "dorm-169aa",
  storageBucket: "dorm-169aa.appspot.com",
  messagingSenderId: "866077917876",
  appId: "1:866077917876:web:655f2b0c6a9e392109cde1",
  measurementId: "G-KHLP4JMMYD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

export default firebaseApp;