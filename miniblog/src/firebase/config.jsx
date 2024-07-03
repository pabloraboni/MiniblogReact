import { initializeApp } from "firebase/app";
// import { getFireStore } from "firebase/firestore"; //(Não funciona)
// import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB0RNaUW9eeAXn8-zgoql_RXr9akFWkyV8",
  authDomain: "miniblog-b6cc2.firebaseapp.com",
  projectId: "miniblog-b6cc2",
  storageBucket: "miniblog-b6cc2.appspot.com",
  messagingSenderId: "584504037658",
  appId: "1:584504037658:web:3c1a9ed8ff576aa8965ca3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};