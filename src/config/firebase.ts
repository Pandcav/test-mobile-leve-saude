import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2NTj8D0HL3os_zITybYmPv1IV7Itpkwg",
  authDomain: "leve-saude-feedback.firebaseapp.com",
  projectId: "leve-saude-feedback",
  storageBucket: "leve-saude-feedback.firebasestorage.app",
  messagingSenderId: "1087589731636",
  appId: "1:1087589731636:web:a61fe290675fad5d7a6961"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };