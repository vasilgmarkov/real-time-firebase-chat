import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1RjbT4ILUEDbnQThG7zr2U4Cc9G5_dkY",
  authDomain: "ubichat2019.firebaseapp.com",
  databaseURL: "https://ubichat2019.firebaseio.com",
  projectId: "ubichat2019",
  storageBucket: "ubichat2019.appspot.com",
  messagingSenderId: "447766201701",
  appId: "1:447766201701:web:e9e3ea33b86d1e6a7acd8c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase;

export default db;
