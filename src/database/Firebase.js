import * as firebase from 'firebase'

const firebaseConfig={
    apiKey: "AIzaSyCESElRcA4gZMqKNpppaSiB5fGTCsknBH4",
    authDomain: "mychatapp-69b9d.firebaseapp.com",
    databaseURL: "https://mychatapp-69b9d.firebaseio.com",
    projectId: "mychatapp-69b9d",
    storageBucket: "mychatapp-69b9d.appspot.com",
    messagingSenderId: "274787509223",
    appId: "1:274787509223:web:21b4b57e128b1e22985342"
}

firebase.initializeApp(firebaseConfig)

export default firebase