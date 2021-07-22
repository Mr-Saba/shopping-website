import firebase from "firebase"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, 
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const remoteConfig = firebase.remoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

  remoteConfig.defaultConfig = {
    "WebMode": "light"
  };

  remoteConfig.fetchAndActivate()
    .then(() => {
      // ...
    })
    .catch((err) => {
      // ...
  });

  const webmode = remoteConfig.getString("WebMode")

  const firestore = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

  export {firestore, auth, firebase, storage, webmode}