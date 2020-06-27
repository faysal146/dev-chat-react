import firebase from 'firebase';

export function errorMessage(code) {
    if (code === 'auth/user-not-found') return 'user not found';
    if (code === 'auth/email-already-in-use')
        return 'email address already in use';
    if (code === 'auth/wrong-password') return 'email or password is not match';
    return 'something went wrong';
}

export const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

export const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};
export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};



export const buildPath = (userId, itemId) =>
    userId > itemId ? `${userId}-${itemId}` : `${itemId}-${userId}`;
