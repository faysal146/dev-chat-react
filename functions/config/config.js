const admin = require('firebase-admin');
const serviceAccount = require('serviceAccount.json')
module.exports = {
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://dev-chat-react.firebaseio.com',
}