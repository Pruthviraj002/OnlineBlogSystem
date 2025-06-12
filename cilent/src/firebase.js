// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-8ca42.firebaseapp.com",
    projectId: "mern-blog-8ca42",
    storageBucket: "mern-blog-8ca42.firebasestorage.app",
    messagingSenderId: "601237219863",
    appId: "1:601237219863:web:5cff50016dac6467720a52",
    measurementId: "G-DGPRGQXELN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


