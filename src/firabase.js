import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCGUHN6U-IQTYPr6BWN9Jo3vYlFt62oYAg",
  authDomain: "e-ticaret-ff6e1.firebaseapp.com",
  projectId: "e-ticaret-ff6e1",
  storageBucket: "e-ticaret-ff6e1.appspot.com",
  messagingSenderId: "490159660506",
  appId: "1:490159660506:web:06ef5896901bf8a499f4e3",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
