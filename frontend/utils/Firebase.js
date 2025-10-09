import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-25598.firebaseapp.com",
  projectId: "loginonecart-25598",
  storageBucket: "loginonecart-25598.firebasestorage.app",
  messagingSenderId: "233851447291",
  appId: "1:233851447291:web:2cd0154041a8f9eebf8d5e"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}