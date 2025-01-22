importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGXNBcviukgio0Njtui32shfJwYi2ps2A',
  authDomain: 'poppy-73a6b.firebaseapp.com',
  projectId: 'poppy-73a6b',
  storageBucket: 'poppy-73a6b.firebasestorage.app',
  messagingSenderId: '1062790020599',
  appId: '1:1062790020599:web:bda0f53b46901e554f82f2',
  measurementId: 'G-DVQ5EY1537',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('Received background message', payload);

  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: { url: link },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log('Notification click received');

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const url = event.notification.data.url;

      if (!url) return;

      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        console.log('OPENWINDOW ON CLIENT');
        return clients.openWindow(url);
      }
    }),
  );
});
