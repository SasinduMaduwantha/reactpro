import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJk8U5Hr8CMwI0Mgr45LHsk2IQqEiPeOw",
  authDomain: "exapp-c6ee7.firebaseapp.com",
  projectId: "exapp-c6ee7",
  storageBucket: "exapp-c6ee7.appspot.com",
  messagingSenderId: "95563416478",
  appId: "1:95563416478:web:6c08202411d43a5869cc8f",
  measurementId: "G-KT01GYD4QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if Analytics is supported before initializing
const initializeAnalytics = async () => {
  const supported = await isSupported();
  if (supported) {
    getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
};

initializeAnalytics();

export default app;
