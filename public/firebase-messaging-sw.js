importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCiC8m5pNQ9mG5t5iou8NSsk1k7JPk2k68",
    authDomain: "wecango.firebaseapp.com",
    projectId: "wecango",
    storageBucket: "wecango.appspot.com",
    messagingSenderId: "352727726767",
    appId: "1:352727726767:web:d0c40a11dc90a941c0f25a",
    measurementId: "G-9N5WDM9MY4"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    let dePay = JSON.parse(payload.data.payload);
    const notificationTitle = dePay.title;
    const notificationOptions = {
        body: dePay.message,
        badge: 'https://wecango.s3.ap-northeast-2.amazonaws.com/logo111.png',
        icon: 'https://wecango.s3.ap-northeast-2.amazonaws.com/logo111.png'
    };

    self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        if(dePay.linkUrl){
            event.waitUntil(self.clients.openWindow(dePay.linkUrl));
        }else {
            event.waitUntil(self.clients.openWindow("https://wecango.org"));
        }

    });

    self.registration.showNotification(notificationTitle,
        notificationOptions);


});
