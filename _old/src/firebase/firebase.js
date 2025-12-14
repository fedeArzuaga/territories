// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx9cgXX7AY853Kc6PtE8qjCWuAbrdbPjg",
  authDomain: "territorios-bd4b0.firebaseapp.com",
  projectId: "territorios-bd4b0",
  storageBucket: "territorios-bd4b0.firebasestorage.app",
  messagingSenderId: "113980364883",
  appId: "1:113980364883:web:66aa7008798af9d014cea6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)