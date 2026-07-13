import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyBmTYxN3NkSFpgtlFZV66oxPiv4kXkQfOk",
    authDomain: "duet-cover.firebaseapp.com",
    projectId: "duet-cover",
    storageBucket: "duet-cover.firebasestorage.app",
    messagingSenderId: "969795730942",
    appId: "1:969795730942:web:30d702946f92fe950554af"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


