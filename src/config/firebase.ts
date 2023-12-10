// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrATnjP6V8AgwX1c7EUI2yRfw9U7Grjl8",
  authDomain: "react-project-be624.firebaseapp.com",
  projectId: "react-project-be624",
  storageBucket: "react-project-be624.appspot.com",
  messagingSenderId: "667837352624",
  appId: "1:667837352624:web:f3638c74ac71d7e73b0975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);