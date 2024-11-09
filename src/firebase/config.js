import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDMbAL16428sWP2x92YZLKxLnPwcyfpBIE",
  authDomain: "labact-f210c.firebaseapp.com",
  projectId: "labact-f210c",
  storageBucket: "labact-f210c.firebasestorage.app",
  messagingSenderId: "962539179627",
  appId: "1:962539179627:web:73f3ec6add0332b5816b2e",
  measurementId: "G-5995NX31WY"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}
 
