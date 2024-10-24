// Import the Firebase functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCToVTfc...",
  authDomain: "disasteralleviation-foundation.firebaseapp.com",
  projectId: "disasteralleviation-foundation",
  storageBucket: "disasteralleviation-foundation.appspot.com",
  messagingSenderId: "432118387996",
  appId: "1:432118387996:web:e38af69c07d6c6d45296d9",
  measurementId: "G-1JHEBQS4VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
