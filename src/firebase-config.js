
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyDZCiL20pDPCT5RY-mD3igeobQ2POy0JfY",
  authDomain: "flipkart-clone-43cb1.firebaseapp.com",
  projectId: "flipkart-clone-43cb1",
  storageBucket: "flipkart-clone-43cb1.appspot.com",
  messagingSenderId: "891412474475",
  appId: "1:891412474475:web:b18d7bf645c16d36c1df2e",
  measurementId: "G-KG3FQB4WSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);