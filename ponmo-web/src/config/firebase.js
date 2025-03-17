import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDw2Gr5nZeqAysy7YEpsFj3OVUdh9vI-0w",
    authDomain: "login-fa863.firebaseapp.com",
    projectId: "login-fa863",
    storageBucket: "login-fa863.firebasestorage.app",
    messagingSenderId: "318066549064",
    appId: "1:318066549064:web:e83bb1f54c95a7448d937d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); 