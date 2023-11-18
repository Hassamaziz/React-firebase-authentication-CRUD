// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzD8wYUj3vbHNPh5qv3A2aBVPdoG4nTW4",
  authDomain: "signup-signinpage-69.firebaseapp.com",
  projectId: "signup-signinpage-69",
  storageBucket: "signup-signinpage-69.appspot.com",
  messagingSenderId: "275815869975",
  appId: "1:275815869975:web:b75cdcb2ece589a1f53652",
  measurementId: "G-QKCD8XC2L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const firestore = getFirestore(app);
export {analytics,auth,googleProvider,facebookProvider,firestore}