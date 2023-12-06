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
  appId: "1:940936256349:web:8ec07e1976e26e62c926b4",
  measurementId: "G-PZEW03FQTX"
};

const db = firebase.initializeApp(firebaseConfig);
export const auth = db.auth();
export const firestore = db.firestore();
export const storageRef = db.storage();
export const storage = db.storage(); 

export default db;