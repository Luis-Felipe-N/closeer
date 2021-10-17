// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC5UbhgngCI8WjXOFAzMgC_VladuDyQHeM",
  authDomain: "closser-fb5a5.firebaseapp.com",
  projectId: "closser-fb5a5",
  storageBucket: "closser-fb5a5.appspot.com",
  messagingSenderId: "938206560673",
  appId: "1:938206560673:web:1c7dfc250c58a511378be0"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

const db = getDatabase();
const auth = getAuth()
export {
  db,
  auth
}
  