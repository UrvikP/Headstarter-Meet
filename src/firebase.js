// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//a
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuskOVw7omyieZVTUZRawCpECSMZpwTiE",
    authDomain: "headstarter-authentication.firebaseapp.com",
    projectId: "headstarter-authentication",
    storageBucket: "headstarter-authentication.appspot.com",
    messagingSenderId: "222849680311",
    appId: "1:222849680311:web:954e0e27b7832c55bade32",
    measurementId: "G-BESGGH278P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
