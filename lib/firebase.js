import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase Config (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAGpccikzxLluOiSmAHc2wDHC6CU6sSnLE",
    authDomain: "YOUR_AUurl-shortener-b86d8.firebaseapp.comTH_DOMAIN",
    projectId: "url-shortener-b86d8",
    storageBucket: "url-shortener-b86d8.firebasestorage.app",
    messagingSenderId: "387044625962",
    appId: "1:387044625962:web:148bcbc9b32cdc85f8fd53",
};

// ✅ Initialize Firebase (Prevents multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
