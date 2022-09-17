// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWPuXivKOma-VsGEB2Ag48MrTXjPm9L3o",
  authDomain: "note2note-81b1c.firebaseapp.com",
  projectId: "note2note-81b1c",
  storageBucket: "note2note-81b1c.appspot.com",
  messagingSenderId: "554473375632",
  appId: "1:554473375632:web:3f835c788686c47029d515",
  measurementId: "G-TM6NXM0CST"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)