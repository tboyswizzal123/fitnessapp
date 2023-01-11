import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore'
import { enableIndexedDbPersistence } from "firebase/firestore"; 
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";


const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_API_KEY_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

// Initialize Firebase
  
export var db = app.firestore();
  
export const auth = app.auth();
export default app