import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAN8ljDyFLsJTUoBFVQ0mcw9GdSEvk3IZ8",
  authDomain: "globalchat-earn.firebaseapp.com",
  projectId: "globalchat-earn",
  storageBucket: "globalchat-earn.firebasestorage.app",
  messagingSenderId: "384905673913",
  appId: "1:384905673913:web:12682b3768d9289ef72f68",
  measurementId: "G-LERWSC8D0B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
