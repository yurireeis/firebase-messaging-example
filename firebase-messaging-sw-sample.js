importScripts("https://www.gstatic.com/firebasejs/7.13.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.13.0/firebase-messaging.js");


firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

const messaging = firebase.messaging();

const notificationAction = payload => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
}

messaging.usePublicVapidKey("");
messaging.setBackgroundMessageHandler(notificationAction);
