import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsjV6hg4q5C2TKAxqDy3ckjTRqCCzifMw",
    authDomain: "test-40446.firebaseapp.com",
    projectId: "test-40446",
    storageBucket: "test-40446.appspot.com",
    messagingSenderId: "794819487358",
    appId: "1:794819487358:web:eacfcb0ad4245d93f9da2f",
    measurementId: "G-XLH2GKQX5P"
};
// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
// export { firestore, firebase };
