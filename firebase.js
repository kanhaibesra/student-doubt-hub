import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7wxm5D2JNATqfZGcPaJPNLl_e7TYv3H0",
  authDomain: "student-doubt-hub.firebaseapp.com",
  projectId: "student-doubt-hub",
  storageBucket: "student-doubt-hub.firebasestorage.app",
  messagingSenderId: "362077244450",
  appId: "1:362077244450:web:b007554725df7927a18e7b"
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

console.log("✅ Firebase Ready");
console.log("✅ Firestore Ready");

export { auth, db, onAuthStateChanged, signOut };