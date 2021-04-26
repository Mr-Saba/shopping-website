import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBNde924cISDG8ajnER-xPJkWWHwELs0-s",
    authDomain: "website-project-d1c83.firebaseapp.com",
    projectId: "website-project-d1c83",
    storageBucket: "website-project-d1c83.appspot.com",
    messagingSenderId: "593501227079",
    appId: "1:593501227079:web:7b02af1633048b11288962",
    measurementId: "G-XDH63YD10D"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const firestore = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

  export {firestore, auth, firebase, storage}