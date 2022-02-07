// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCKOgAj49C5wHqBBY7z6SNJA-UGw3D4v4s",
    authDomain: "kuatitugratis.firebaseapp.com",
    projectId: "kuatitugratis",
    storageBucket: "kuatitugratis.appspot.com",
    messagingSenderId: "601495076773",
    appId: "1:601495076773:web:eac3a446b411b47b03724c",
    measurementId: "G-KRZB669BC7"
  };


firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle =()=>{
  signInWithPopup(auth,provider)
  .then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}
export const db = getFirestore(app)
  

  