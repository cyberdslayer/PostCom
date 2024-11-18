import { initializeApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import { exportTraceState } from "next/dist/trace";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_L50G4U0NJtApRFA1_SsqY99IlmKeKLg",
  authDomain: "carman-7d087.firebaseapp.com",
  projectId: "carman-7d087",
  storageBucket: "carman-7d087.firebasestorage.app",
  messagingSenderId: "841726587867",
  appId: "1:841726587867:web:0e67b2c2c5de071e676dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseApp = getApps().length===0 ? initializeApp(firebaseConfig):getApps()[0];

export const auth = getAuth(firebaseApp);