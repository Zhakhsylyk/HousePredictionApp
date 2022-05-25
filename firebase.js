// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhz9vfcSGwxb3akqgVg78bjBfXZxdYYqI",
  authDomain: "diplomadb-5a8da.firebaseapp.com",
  projectId: "diplomadb-5a8da",
  storageBucket: "diplomadb-5a8da.appspot.com",
  messagingSenderId: "863470079407",
  appId: "1:863470079407:web:30290e84fc49e5f08b335a"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}


export { firebase }