import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCL0UFQZCjVWTmdPR6hb42XrhDakQTX1tg",
    authDomain: "ecommerce-e849a.firebaseapp.com",
    projectId: "ecommerce-e849a",
    storageBucket: "ecommerce-e849a.appspot.com",
    messagingSenderId: "919744382063",
    appId: "1:919744382063:web:5cb4f268053d8bf5ecb99a",
    measurementId: "G-7E97DP12GV"
  };

firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();

  export { db, auth, storage }