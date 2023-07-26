importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

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

const messaging = firebase.messaging()

// messaging.onBackgroundMessage(payload => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   )
//   // Customize notification here
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/icons/favicon-96x96.png'
//   }

//   self.registration.showNotification(notificationTitle, notificationOptions)
// })
