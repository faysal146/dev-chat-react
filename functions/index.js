const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

exports.onUserStatusChanged = functions.database
    .ref('/status/{uid}')
    .onUpdate(async (change, context) => {
        const eventStatus = change.after.val();

        const userStatusFirestoreRef = firestore.doc(
            `status/${context.params.uid}`
        );

        const statusSnapshot = await change.after.ref.once('value');
        const status = statusSnapshot.val();
        if (status.last_changed > eventStatus.last_changed) {
            return null;
        }
        eventStatus.last_changed = new Date(eventStatus.last_changed);
        return userStatusFirestoreRef.set(eventStatus);
    });

exports.createNotifications = functions.firestore
    .document('messages/{channelId}/chats/{messageId}')
    .onCreate((snap, context) => {
        const notificationsRef = firestore.doc(
            `notifications/${context.params.channelId}`
        );
        notificationsRef.get().then((snapshot) => {
            if (snapshot.exists) {
                notificationsRef.update({ count: snapshot.data().count + 1 });
            } else {
                notificationsRef.set({
                    id: context.params.channelId,
                    count: 1,
                });
            }
        });
    });
