import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA9dZdCK88LA0rY9kZuJk3dFB1wFtkBavI",
    authDomain: "ultimate-warewolf.firebaseapp.com",
    databaseURL: "https://ultimate-warewolf.firebaseio.com",
    projectId: "ultimate-warewolf",
    storageBucket: "ultimate-warewolf.appspot.com",
    messagingSenderId: "367115602697",
    appId: "1:367115602697:web:39f8e22ef60299a789e1d8"
}

firebase.initializeApp(firebaseConfig)
export default firebase