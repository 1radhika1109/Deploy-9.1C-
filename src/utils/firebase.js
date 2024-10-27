
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhWLwY1MiezaZy8xZSwYG1g7_J2Fm6SxU",
  authDomain: "task-edc9d.firebaseapp.com",
  projectId: "task-edc9d",
  storageBucket: "task-edc9d.appspot.com",
  messagingSenderId: "922436591785",
  appId: "1:922436591785:web:932a5d97eebfe8d892c9b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;