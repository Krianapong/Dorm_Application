import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // สำหรับการเข้าสู่ระบบ **อย่าลืมใส่ compat ไม่งั้น error version
import "firebase/compat/firestore"; // สำหรับฐานข้อมูล
import "firebase/compat/storage"; // สำหรับรูปภาพ

const firebaseConfig = {
  apiKey: "AIzaSyAx8TXpJGQhcJ08o9QqNonoHK1HGqZcexw",
  authDomain: "hopak2-7320e.firebaseapp.com",
  databaseURL: "https://hopak2-7320e-default-rtdb.firebaseio.com",
  projectId: "hopak2-7320e",
  storageBucket: "hopak2-7320e.appspot.com",
  messagingSenderId: "738362440716",
  appId: "1:738362440716:web:417f899fad1f8e588f0229",
  measurementId: "G-C8Y3FCPYPV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

export default firebaseApp;