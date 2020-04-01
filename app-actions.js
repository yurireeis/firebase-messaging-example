import * as firebaseService from "./firebase-service.js";

const tokenDivId = "token_div";
const permissionDivId = "permission_div";

const showHideDiv = (divId, show) => {
  const div = document.querySelector("#" + divId);
  if (show) {
    div.style = "display: visible";
  } else {
    div.style = "display: none";
  }
};

const updateUIForPushEnabled = currentToken => {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}

const updateUIForPushPermissionRequired = () => {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
};

const clearMessages = () => {
  const messagesElement = document.querySelector("#messages");
  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild);
  }
};

const showToken = currentToken => {
  const tokenElement = document.querySelector("#token");
  tokenElement.textContent = currentToken;
};

export const resetUI = messaging => {
  clearMessages();
  showToken("loading...");
  firebaseService.requestToken(messaging).then((currentToken) => {
    if (currentToken) {
      firebaseService.sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      console.log("No Instance ID token available. Request permission to generate one.");
      updateUIForPushPermissionRequired();
      firebaseService.setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    showToken("Error retrieving Instance ID token. ", err);
    firebaseService.setTokenSentToServer(false);
  });
};

export const deleteToken = async messaging => {
  const currentToken = await firebaseService.requestToken(messaging);
  await firebaseService.requestDeleteToken(messaging, currentToken);
  console.log('Token deleted.');
  firebaseService.setTokenSentToServer(false);
  resetUI(messaging);
};

export const refreshToken = async messaging => {
  const refreshedToken = await firebaseService.requestToken(messaging);
  firebaseService.setTokenSentToServer(false);
  firebaseService.sendTokenToServer(refreshedToken);
  resetUI(messaging);
};

export const appendMessage = payload => {
  console.log("Message received. ", payload);
  const messagesElement = document.querySelector("#messages");
  const dataHeaderELement = document.createElement("h5");
  const dataElement = document.createElement("pre");
  dataElement.style = "overflow-x:hidden;";
  dataHeaderELement.textContent = "Received message:";
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
};
