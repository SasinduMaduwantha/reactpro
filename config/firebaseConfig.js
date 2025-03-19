// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJk8U5Hr8CMwI0Mgr45LHsk2IQqEiPeOw",
  authDomain: "exapp-c6ee7.firebaseapp.com",
  projectId: "exapp-c6ee7",
  storageBucket: "exapp-c6ee7.firebasestorage.app",
  messagingSenderId: "95563416478",
  appId: "1:95563416478:web:6c08202411d43a5869cc8f",
  measurementId: "G-KT01GYD4QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);