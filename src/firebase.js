// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKTtl2eeCzvCbTDpnN-kBrHchEQamPeSQ",
  authDomain: "admin-panel-55820.firebaseapp.com",
  projectId: "admin-panel-55820",
  storageBucket: "admin-panel-55820.appspot.com",
  messagingSenderId: "506306156414",
  appId: "1:506306156414:web:4211f8d9c3fc8e35db452f",
  measurementId: "G-CW9Q4N6FCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);