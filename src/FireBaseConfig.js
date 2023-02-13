// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7TQ4QbEWF6JgJf7CeWTPudmtuqC-2pEU",
  authDomain: "vue3-2023-c45bf.firebaseapp.com",
  projectId: "vue3-2023-c45bf",
  storageBucket: "vue3-2023-c45bf.appspot.com",
  messagingSenderId: "561211430790",
  appId: "1:561211430790:web:82337ebedcb93221b47e07",
  measurementId: "G-GTYG679JH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth();

export { auth };