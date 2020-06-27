import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from 'rsuite';
import {useHistory} from 'react-router-dom'
import { db, realTimeDB } from '@/firebase/firebase';
import firebase from 'firebase';
import UserList from './AsideLists';
import {useDispatch} from 'react-redux'
import {setChannel} from '@/app/store/reducers/channel.reducer'

var isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

var isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};
var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};


const DirectMessages = ({ user }) => {
    const [userList, setUserList] = useState({});
    const [activeUser, setActiveUser] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const changeChannel = (id) => {
		setActiveUser(id)  
		dispatch(setChannel(userList[id]))
		history.push('/chat/' + id);
    }

    const addUser = useCallback((data) => {
    	setUserList((prev) => {
            return {
                ...prev,
                [data.id]: { ...data, state: 'offline' },
            };
        });
    }, [])
    const removeUser = useCallback((id) => {
    	setUserList(prev => {
    		const old = { ...prev };
    		delete [id];
    		return old
        })
    }, [])

    useEffect(() => {
        db.collection('users').onSnapshot((snap) => snap.docChanges().forEach((change) => {
                const data = change.doc.data();
                if (change.type === 'added' && change.doc.exists && data.id !== user.id) addUser(data)
                if (change.type === 'removed') removeUser(data.id)
            })
        );
        const userStatusDatabaseRef = realTimeDB.ref('status/' + user.id);
        const userStatusFirestoreRef = db.doc('status/' + user.id);

        realTimeDB.ref('.info/connected').on('value', function(snapshot) {
        	if (snapshot.val() === false) {
        		userStatusFirestoreRef.set(isOfflineForFirestore);
       			return;
    		};

    		userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
	        	userStatusDatabaseRef.set(isOnlineForDatabase);
		        userStatusFirestoreRef.set(isOnlineForFirestore);
    		});
        })

	    db.collection('status')
	    	.where('state', '==', 'online')
	    	.onSnapshot(function(snapshot) {
	        snapshot.docChanges().forEach(function(change) {
	        	if(!change.doc.exists) return; 
	        	const docId = change.doc.id
	            if (change.type === 'added' && docId !== user.id) {
	                setUserList(prev => ({...prev, [docId]: {
	                	...prev[docId],
	                	state: 'online'
	                }}))
	            }
	            if (change.type === 'removed' && docId !== user.id) {
	            	if(docId !== user.id)
	                setUserList(prev => ({...prev, [docId]: {
	                	...prev[docId],
	                	state: 'offline'
	                }}))
	            }
	        });
	    });

    }, [user.id]);

    return (
        <div>
            <p className='my-2'>
                <span className='mr-1'>
                    <Icon icon='envelope' />
                </span>
                <span>Messages ({Object.keys(userList).length})</span>
            </p>
            <UserList collections={userList} active={activeUser} setActive={changeChannel} type='USER' />
        </div>
    );
};

export default DirectMessages;
