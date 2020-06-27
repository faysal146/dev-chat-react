import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyBLbNQyb_rQ3gfqL09cJjfgcEsx5f6Lt1U',
    authDomain: 'dev-chat-react.firebaseapp.com',
    databaseURL: 'https://dev-chat-react.firebaseio.com',
    projectId: 'dev-chat-react',
    storageBucket: 'dev-chat-react.appspot.com',
    messagingSenderId: '319666811439',
    appId: '1:319666811439:web:1e9aaf356c768974700cda',
    measurementId: 'G-YVZ0MRV160',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
export const db = firebase.firestore();
export const realTimeDB = firebase.database()
export const storageRef = firebase.storage().ref();

export default firebaseApp;
