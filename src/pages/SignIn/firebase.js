import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLWWtX8Do3wZ6jYXUcQ-1q_vADu8b1nuA",
  authDomain: "msc-igdtuw-2024.firebaseapp.com",
  projectId: "msc-igdtuw-2024",
  storageBucket: "msc-igdtuw-2024.appspot.com",
  messagingSenderId: "168763768935",
  appId: "1:168763768935:web:17e0aa7d5e13d8f8fcd4c2",
  measurementId: "G-0S37Y5WWNW"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {firestore, auth, provider};