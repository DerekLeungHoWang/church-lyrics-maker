import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBlA_t8YlSKqwMrDwWCHuKoEe0l_N4OS-o",
    authDomain: "church-lyrics-maker.firebaseapp.com",
    projectId: "church-lyrics-maker",
    storageBucket: "church-lyrics-maker.appspot.com",
    messagingSenderId: "10601038340",
    appId: "1:10601038340:web:2f0edb8b69cba8bd692b51",
    measurementId: "G-JNL4M2D0TJ"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };