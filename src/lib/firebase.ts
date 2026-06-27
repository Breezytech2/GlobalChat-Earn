import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, query, where, orderBy, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const storage = getStorage(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, db, storage, analytics, GoogleAuthProvider, OAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, query, where, orderBy, addDoc, serverTimestamp, getDocs, ref, uploadBytes, getDownloadURL };

