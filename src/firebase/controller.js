import { firebaseAuth, db, storageRef } from './firebase';
import { firestore } from 'firebase';

export const signupFirebase = async ({ email, password, name, avatar }) => {
    try {
        const authUser = await firebaseAuth.createUserWithEmailAndPassword(
            email,
            password
        );
        await authUser.user.updateProfile({
            displayName: name,
            photoURL: avatar,
        });
        await db
            .collection('users')
            .doc(authUser.user.uid)
            .set({
                id: authUser.user.uid,
                email,
                name,
                avatar
            });

        return authUser;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const signinFirebase = ({ email, password }) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
};

export const createChannel = ({ data, creator }) => {
    return db.collection('channels').add({
        ...data,
        creator,
        created_at: firestore.FieldValue.serverTimestamp(),
        updated_at: firestore.FieldValue.serverTimestamp(),
    });
};

export const checkIsAuthenticated = () => {
    return new Promise((resolve, reject) => {
        const unregister = firebaseAuth.onAuthStateChanged((user) => {
            unregister();
            if (user)
                resolve({
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    id: user.uid,
                });
            else reject(null);
        }, reject);
    });
};

export const createMessage = (channelId, messageObj) => {
    const timeSt = firestore.FieldValue.serverTimestamp();

    return db
        .collection('messages')
        .doc(channelId)
        .collection('chats')
        .add({
            ...messageObj,
            created_at: timeSt,
            updated_at: timeSt,
        });
};

export const logout = () => firebaseAuth.signOut();

export const uploadImages = (path, file) => (callBack) => {
    const metadata = {
        contentType: 'image/jpeg',
    };
    const uploadTask = storageRef.child(path).put(file, metadata);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            callBack({
                progress:
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                pause: uploadTask.pause,
                resume: uploadTask.resume,
                cancle: uploadTask.cancel,
                status: snapshot.state,
            });
        },
        (err) => {
            callBack({
                progress: 0,
                pause: uploadTask.pause,
                resume: uploadTask.resume,
                cancle: uploadTask.cancel,
                status: 'error',
            });
            console.log(err);
            // switch (err.code) {
            //     case 'storage/unauthorized':
            //         // User doesn't have permission to access the object
            //         break;

            //     case 'storage/canceled':
            //         // User canceled the upload
            //         break;

            //     case 'storage/unknown':
            //         // Unknown error occurred, inspect error.serverResponse
            //         break;
            // }
        },
        () => {
            uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                    callBack({
                        status: 'success',
                        progress: 100,
                        url: downloadURL,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    );
};

export const subscribeMessages = (channelId) => (callBack) => {
    return db
        .collection(`messages/${channelId}/chats`)
        .orderBy('created_at')
        .onSnapshot((docSnapshot) => callBack(docSnapshot));
};
