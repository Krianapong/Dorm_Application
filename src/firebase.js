import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // สำหรับการเข้าสู่ระบบ **อย่าลืมใส่ compat ไม่งั้น error version
import "firebase/compat/firestore"; // สำหรับฐานข้อมูล
import "firebase/compat/storage"; // สำหรับรูปภาพ

const firebaseConfig = {
  apiKey: "AIzaSyDG_Z8LkAD5BvPgRiCmNfB_Ir09rUtMQGA",
  authDomain: "hopak-8af20.firebaseapp.com",
  databaseURL: "https://hopak-8af20-default-rtdb.firebaseio.com",
  projectId: "hopak-8af20",
  storageBucket: "hopak-8af20.appspot.com",
  messagingSenderId: "940936256349",
  appId: "1:940936256349:web:bb817ff8eb20e9a7c926b4",
  measurementId: "G-FCD1YNV5SQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

export default firebaseApp;