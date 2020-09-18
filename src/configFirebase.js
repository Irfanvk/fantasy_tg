import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/messaging';


const config = {
    apiKey: "AIzaSyDn8C7If4c5r6S477-jgalzIGjPJ2LIGVA",
    authDomain: "tg-fantasy.firebaseapp.com",
    databaseURL: "https://tg-fantasy.firebaseio.com",
    projectId: "tg-fantasy",
    storageBucket: "tg-fantasy.appspot.com",
    messagingSenderId: "765551193615",
    appId: "1:765551193615:web:b34058ca1b74acf1"
};

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

const messaging = firebase.messaging()

export default {
    db,
    messaging
}