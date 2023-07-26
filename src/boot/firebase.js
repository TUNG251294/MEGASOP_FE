import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyAaHYdGARIGI3kRqJ4tAHp9Lvq0dF_BZQE',
  authDomain: 'vue-firebase-notif.firebaseapp.com',
  projectId: 'vue-firebase-notif',
  storageBucket: 'vue-firebase-notif.appspot.com',
  messagingSenderId: '482523259088',
  appId: '1:482523259088:web:53885404f848dde1bbfed5',
  measurementId: 'G-XBF1CFF8XW'
}

firebase.initializeApp(firebaseConfig)

//const messaging = firebase.messaging()
let messaging = null
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
}
export default messaging
