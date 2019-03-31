const admin = require('firebase-admin');
var {google} = require('googleapis');
// If you are running from non-google cloud services
// You need a serviceAccount json from, downloaded either from google cloud dashboard or firebase
//  https://console.firebase.google.com/u/0/project/<project-id>/settings/serviceaccounts/adminsdk
// var serviceAccount = require('./serviceAccount.json');

const app = admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyDiUbOpgOlkH9Z5q9VYe0ETK5L1dbkcuOc",
  authDomain: "ao-speech-to-tex-1553895570081.firebaseapp.com",
  databaseURL: "https://ao-speech-to-tex-1553895570081.firebaseio.com",
  projectId: "ao-speech-to-tex-1553895570081",
  storageBucket: "ao-speech-to-tex-1553895570081.appspot.com",
  messagingSenderId: "412805037378",
});


// registration token is obtained from client side, the id to identify the client device
var registrationToken = 'fFq_H7wPCNc:APA91bGLE0PjzK_f0zeXSpRQpISCR3ePBwiZXfcMaSkCQ7oT2XCXtC_RSUZOD4a6O2aIcQM3mDO7pCyTc4mHiPdWL32akSFvm2xzX90zDqUE4qkXzPBGdkaDajNcA0ZDSsE7yqKR0V5V';
// There is a specific message format: https://firebase.google.com/docs/cloud-messaging/concept-options
var message = {
  token: registrationToken,
  notification:{
    title: "Portugal vs. Denmark",
    body: "great match!"
  }
}

function sendNotification(req, res) {
  // Send a message to the device corresponding to the provided registration token.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
      res.status(200).send(response);

      // Exit! Stop firebase hogging the process
      // app.delete();
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send(error);

      // Exit! Stop firebase hogging the process
      // app.delete();
    });
}
exports.sendNotification = sendNotification;




// Not used.
// For obtain bearer token, for HTTP API use only
// var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
// var SCOPES = [MESSAGING_SCOPE];
// function getAccessToken() {
//     return new Promise(function(resolve, reject) {
//         var jwtClient = new google.auth.JWT(
//             serviceAccount.client_email,
//             null,
//             serviceAccount.private_key,
//             SCOPES,
//             null
//         );
        
//         jwtClient.authorize(function(err, tokens) {
//           if (err) {
//               reject(err);
//               return;
//           }
//           resolve(tokens.access_token);

//           console.log(tokens.access_token)
//         });
//     });
// }
// getAccessToken();