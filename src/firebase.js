// D:\Astro-main\Astro-main\src\firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9gor5X0AmJyKJmjd5ZT2aUZeNXd0wtAg",
    authDomain: "steerudev-b65ba.firebaseapp.com",
    projectId: "steerudev-b65ba",
    storageBucket: "steerudev-b65ba.firebasestorage.app",
    messagingSenderId: "960804957763",
    appId: "1:960804957763:web:3ed9f3d0dce37658b9eef6",
    measurementId: "G-5HDH7V6V01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

