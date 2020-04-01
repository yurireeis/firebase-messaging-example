export const subscribeToTopic = (
  messaging,
  registrationTokens,
  topic
) => {
  // TODO: call some api here
}

export const requestToken = messaging => messaging.getToken();

export const unsubscribeFromTopic = (
  messaging,
  registrationTokens,
  topic
) => {
  // TODO: call some api here
}

export const sendTokenToServer = currentToken => {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO: Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' + 'unless it changes');
  }
};

export const isTokenSentToServer = () => window.localStorage.getItem('sentToServer') === '1';

export const setTokenSentToServer = sent => window.localStorage.setItem('sentToServer', sent ? '1' : '0');

export const requestPermission = () => Notification.requestPermission();

export const requestDeleteToken = (
  messaging,
  currentToken
) => messaging.deleteToken(currentToken);
