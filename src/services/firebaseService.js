// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {firebaseConfig} from "../config/firebaseDotenvConfig.js";






// Initialize Firebase
 const app = initializeApp(firebaseConfig);

// Initialize Firestore

export const db = getFirestore(app);



