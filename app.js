import * as actions from "./app-actions.js";
import * as config from "./config.js";


const registrationTokens = [
    "YOUR_REGISTRATION_TOKEN_1",
    "YOUR_REGISTRATION_TOKEN_n"
];

firebase.initializeApp(config.firebase);
firebase.analytics();

const messaging = firebase.messaging();
const refreshToken = () => actions.refreshToken(messaging);
const deleteToken = () => actions.deleteToken(messaging);

messaging.usePublicVapidKey(config.vapiKey);
messaging.onMessage(actions.appendMessage);
messaging.onTokenRefresh(() => actions.refreshToken(messaging));
actions.resetUI(messaging);

window.refreshToken = refreshToken;
window.deleteToken = deleteToken;
