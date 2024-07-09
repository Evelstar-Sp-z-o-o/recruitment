// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBw6IIBBFWfUDAEKENi3r1HpSm0nPTYrUk',
  authDomain: 'evelstar-fleet-dev.firebaseapp.com',
  projectId: 'evelstar-fleet-dev',
  storageBucket: 'evelstar-fleet-dev.appspot.com',
  messagingSenderId: '86518246374',
  appId: '1:86518246374:web:dd52da388e6dab59f18427',
  measurementId: 'G-VBKKSC61E1',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'assets/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
