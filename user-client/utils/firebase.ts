// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import * as auth from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxMm59d92QhS6m058G8mSueO_9Faz1V0w",
  authDomain: "grocerie-19fca.firebaseapp.com",
  projectId: "grocerie-19fca",
  storageBucket: "grocerie-19fca.appspot.com",
  messagingSenderId: "498446967355",
  appId: "1:498446967355:web:2b5dc35dda10efcf0a721e",
  measurementId: "G-RLNLK7WLCC"
};

// Initialize Firebase
let app;
if(getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

export { auth };