import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC72vfiKS2nGUs7t_YsdD60KWsfMM_tKHA",
    authDomain: "money-9affd.firebaseapp.com",
    projectId: "money-9affd",
    storageBucket: "money-9affd.appspot.com",
    messagingSenderId: "989519946593",
    appId: "1:989519946593:web:e2f5731a9dc0cc4fab5b20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
