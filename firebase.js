// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkgFUi8JVKw3LdJvI5NbK72vwFYrFq-nY',
  authDomain: 'bookstore-262f2.firebaseapp.com',
  projectId: 'bookstore-262f2',
  storageBucket: 'bookstore-262f2.appspot.com',
  messagingSenderId: '978256570027',
  appId: '1:978256570027:web:683dbb087b9755997879ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth , db};
