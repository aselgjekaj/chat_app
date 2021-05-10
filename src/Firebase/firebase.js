import firebase from 'firebase'
import 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyB-5C3tMCdBkPhGCIMzC-foz5-oN65MKIg",
    authDomain: "bobobobobochat.firebaseapp.com",
    projectId: "bobobobobochat",
    storageBucket: "bobobobobochat.appspot.com",
    messagingSenderId: "22210485824",
    appId: "1:22210485824:web:49fdda1ef0532e4fc549a5",
    measurementId: "G-6RQR9PJVCG"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
const messaging = firebase.messaging();
export default firebase;

