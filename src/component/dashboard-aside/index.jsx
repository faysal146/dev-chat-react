import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { userSelector } from '@/app/store/selectors/user.selector';
// import { currentChannelSelector } from '@/app/store/selectors/channelSelector';
import { useSelector, useDispatch } from 'react-redux';
import { UserProfileContainer } from '@/styles/dashboard.style';
import { setChannel } from '@/app/store/reducers/channel.reducer';
import { db, realTimeDB } from '@/firebase/firebase';
import AsideHeader from './AsideHeader';
import CreateNewChannelWizard from './CreateNewChannelWizard';
import Model from './Model';
import ChannelLists from './AsideLists';
import { Icon } from 'rsuite';
import _ from 'lodash';
import {
    isOfflineForDatabase,
    isOfflineForFirestore,
    isOnlineForDatabase,
    isOnlineForFirestore,
    buildPath,
} from '@/firebase/utils';

const DashboardAside = () => {
    const user = useSelector(userSelector);
    // const currentChannel = useSelector(currentChannelSelector);

    const histroy = useHistory();
    const dispatch = useDispatch();

    const [showModel, setShowModel] = useState(false);
    const [startedChannels, setStartedChannels] = useState({});
    const [channels, setChannels] = useState({});
    const [userList, setUserList] = useState({});
    const [activeListItem, setActiveListItem] = useState(null);
    const [notifications, setNotifications] = useState({});

    const addToCollection = useCallback((data, collections) => {
        const fn =
            collections === 'USER'
                ? setUserList
                : collections === 'STARTED'
                ? setStartedChannels
                : setChannels;
        fn((prev) => {
            return {
                ...prev,
                [data.id]: { ...data, state: 'offline' },
            };
        });
    }, []);

    const removeFromCollection = useCallback((id, collections) => {
        const fn =
            collections === 'USER'
                ? setUserList
                : collections === 'STARTED'
                ? setStartedChannels
                : setChannels;
        fn((prev) => {
            const old = { ...prev };
            delete [id];
            return old;
        });
    }, []);

    const handleChannel = useCallback(
        (itemId, type) => {
            setActiveListItem(itemId);
            let path = itemId;

            if (type === 'USER') {
                path = buildPath(user.id, itemId);

                dispatch(
                    setChannel({
                        channel: { ...userList[itemId], id: path },
                        isPrivate: true,
                    })
                );
            } else {
                const collection =
                    type === 'STARTED' ? startedChannels : channels;
                dispatch(
                    setChannel({
                        channel: {
                            ...collection[itemId],
                            started: !!startedChannels[itemId],
                        },
                        isPrivate: false,
                    })
                );
            }
            histroy.push('/chat/' + path);
        },
        [histroy, user.id, dispatch, userList, startedChannels, channels]
    );

    const listenNotifications = useCallback((channelId) => {
        // let some = []
        // db.collection('messages/' + channelId + '/chats').onSnapshot((snap) => {
        //     snap.docChanges().forEach((change) => {
        //         if (change.doc.exists && change.type === 'added') {
        //             console.log(change.doc.data());
        //         }
        //     });
        // });
        // if (!currentChannel) return;
        // db.collection('notifications')
        //     .doc(channelId)
        //     .onSnapshot((snap) => {
        //         if (snap.exists && currentChannel.id !== channelId) {
        //             const data = snap.data();
        //             setNotifications((prev) => ({
        //                 ...prev,
        //                 [data.id]: data,
        //             }));
        //         }
        //     });
    }, []);

    useEffect(() => {
        const collections = Object.keys(startedChannels).length
            ? { collection: startedChannels, type: 'STARTED' }
            : { collection: channels, type: 'CHANNEL' };

        if (Object.keys(collections.collection).length && !activeListItem) {
            const selectedChannelId = Object.values(collections.collection)[0]
                .id;

            handleChannel(selectedChannelId, collections.type);
        }
    }, [channels, activeListItem, handleChannel, startedChannels]);

    const listenChannles = useCallback(() => {
        const unsubscribeChannels = db
            .collection('channels')
            .onSnapshot((docSnapshot) => {
                docSnapshot.docChanges().forEach((change) => {
                    if (change.doc.exists) {
                        if (
                            change.type === 'added' ||
                            change.type === 'modified'
                        ) {
                            addToCollection(
                                {
                                    ..._.pick(change.doc.data(), [
                                        'name',
                                        'descriptions',
                                        'creator',
                                    ]),
                                    id: change.doc.id,
                                },
                                'CHANNEL'
                            );
                            // listenNotifications(change.doc.id);
                        }
                        if (change.type === 'removed') {
                            console.log(change.doc.id);
                            removeFromCollection(change.doc.id, 'CHANNEL');
                        }
                    }
                });
            });
        return unsubscribeChannels;
    }, [addToCollection, removeFromCollection]);
    useEffect(() => {
        console.log('call how');
        if (!user) return;
        let unsubscribeChannles;
        const unsubscribeUsersStarted = db
            .collection(`users/${user.id}/started`)
            .onSnapshot((snap) => {
                snap.docChanges().forEach((change) => {
                    if (change.doc.exists) {
                        const data = change.doc.data();
                        if (change.type === 'added') {
                            setStartedChannels((prev) => ({
                                ...prev,
                                [change.doc.id]: {
                                    ..._.pick(data, [
                                        'name',
                                        'descriptions',
                                        'creator',
                                    ]),
                                    id: change.doc.id,
                                },
                            }));
                        }
                        if (change.type === 'removed') {
                            setStartedChannels((prev) => {
                                const old = { ...prev };
                                delete old[change.doc.id];
                                return old;
                            });
                        }
                    }
                });
                unsubscribeChannles = listenChannles();
            });

        return () => {
            unsubscribeUsersStarted();
            if (unsubscribeChannles) unsubscribeChannles();
        };
        /* eslint-disable */
    }, [user]);

    useEffect(() => {
        if (!user) return;
        console.log('kdjfk');
        const unsubscribeUser = db.collection('users').onSnapshot((snap) =>
            snap.docChanges().forEach((change) => {
                const data = change.doc.data();
                if (
                    change.type === 'added' &&
                    change.doc.exists &&
                    data.id !== user.id
                ) {
                    // const path = buildPath(user.id, change.doc.id);
                    // listenNotifications(path);
                    addToCollection(data, 'USER');
                }
                if (change.type === 'removed')
                    removeFromCollection(data.id, 'USER');
            })
        );
        const userStatusDatabaseRef = realTimeDB.ref('status/' + user.id);
        const userStatusFirestoreRef = db.doc('status/' + user.id);

        realTimeDB.ref('.info/connected').on('value', function (snapshot) {
            if (snapshot.val() === false) {
                userStatusFirestoreRef.set(isOfflineForFirestore);
                return;
            }

            userStatusDatabaseRef
                .onDisconnect()
                .set(isOfflineForDatabase)
                .then(function () {
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                    userStatusFirestoreRef.set(isOnlineForFirestore);
                });
        });

        const unsubscribeStatus = db
            .collection('status')
            .where('state', '==', 'online')
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (!change.doc.exists) return;
                    const docId = change.doc.id;
                    if (change.type === 'added' && docId !== user.id) {
                        setUserList((prev) => ({
                            ...prev,
                            [docId]: {
                                ...prev[docId],
                                state: 'online',
                            },
                        }));
                    }
                    if (change.type === 'removed' && docId !== user.id) {
                        if (docId !== user.id)
                            setUserList((prev) => ({
                                ...prev,
                                [docId]: {
                                    ...prev[docId],
                                    state: 'offline',
                                },
                            }));
                    }
                });
            });

        return () => {
            unsubscribeUser();
            unsubscribeStatus();
        };
        /* eslint-disable */
    }, [user.id]);

    const toggleModel = (val) => {
        if (typeof val === 'boolean') {
            setShowModel(val);
        } else {
            setShowModel((prev) => !prev);
        }
    };

    return (
        <UserProfileContainer>
            <AsideHeader user={user} />
            <Model toggleModel={toggleModel} show={showModel} user={user} />

            <div>
                <p className='my-2'>
                    <span className='mr-1'>
                        <Icon icon='star' />
                    </span>
                    <span>
                        Star Channels ({Object.keys(startedChannels).length})
                    </span>
                </p>
                <ChannelLists
                    collections={startedChannels}
                    setActive={handleChannel}
                    active={activeListItem}
                />
            </div>
            <CreateNewChannelWizard
                totalChannel={channels.length}
                toggleModel={toggleModel}
            />
            <ChannelLists
                collections={channels}
                active={activeListItem}
                setActive={handleChannel}
                notifications={notifications}
            />
            <div>
                <p className='my-2'>
                    <span className='mr-1'>
                        <Icon icon='envelope' />
                    </span>
                    <span>Messages ({Object.keys(userList).length})</span>
                </p>
                <ChannelLists
                    collections={userList}
                    active={activeListItem}
                    setActive={handleChannel}
                    type='USER'
                    notifications={notifications}
                    userId={user.id}
                />
            </div>
        </UserProfileContainer>
    );
};

export default DashboardAside;
