import React, { useState, useEffect } from 'react';
import { List } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { userSelector } from '@/app/store/selectors/user.selector';
import { useSelector, useDispatch } from 'react-redux';
import { UserProfileContainer } from '@/styles/dashboard.style';
import { setChannel } from '@/app/store/reducers/channel.reducer';
import { db } from '@/firebase/firebase';
import AsideHeader from './AsideHeader';
import CreateNewChannelWizard from './CreateNewChannelWizard';
import Model from './Model';

const DashboardAside = () => {
    const user = useSelector(userSelector);
    const histroy = useHistory();
    const [showModel, setShowModel] = useState(false);

    const [channels, setChannels] = useState({});
    const [activeChannel, setActiveChannel] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Object.keys(channels).length && !activeChannel) {
            const selectedChannel = Object.values(channels)[0];
            dispatch(setChannel(selectedChannel));
            setActiveChannel(selectedChannel.id);
            histroy.push('/chat/' + selectedChannel.id);
        }
    }, [channels, activeChannel, dispatch, histroy]);

    useEffect(() => {
        const unsubscribe = db
            .collection('channels')
            .onSnapshot((docSnapshot) => {
                docSnapshot.docChanges().forEach((change) => {
                    if (change.doc.exists) {
                        if (
                            change.type === 'added' ||
                            change.type === 'modified'
                        ) {
                            setChannels((prev) => {
                                const data = change.doc.data();
                                return {
                                    ...prev,
                                    [change.doc.id]: {
                                        id: change.doc.id,
                                        channel: data.channel,
                                        descriptions: data.descriptions,
                                        creator: data.creator,
                                    },
                                };
                            });
                        }
                        if (change.type === 'removed') {
                            setChannels((prev) => {
                                const docs = { ...prev };
                                delete docs[change.doc.id];
                                return docs;
                            });
                        }
                    }
                });
            });
        return () => {
            unsubscribe();
        };
    }, []);

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
            <CreateNewChannelWizard
                totalChannel={channels.length}
                toggleModel={toggleModel}
            />

            <List hover className='mt-3 pointer'>
                {Object.keys(channels).map((itemId) => (
                    <List.Item
                        className={
                            'px-2 rounded my-1 ' +
                            (itemId === activeChannel ? 'is-active-list' : '')
                        }
                        key={itemId}
                        onClick={() => {
                            setActiveChannel(itemId);
                            dispatch(setChannel(channels[itemId]));
                            histroy.push('/chat/' + itemId);
                        }}
                    >
                        #{channels[itemId].channel}
                    </List.Item>
                ))}
            </List>
        </UserProfileContainer>
    );
};

export default DashboardAside;
