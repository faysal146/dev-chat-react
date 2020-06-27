import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    currentChannelSelector,
    isChannelLoading,
} from '@/app/store/selectors/channelSelector';
import { setStarted } from '@/app/store/reducers/channel.reducer';
import { userSelector } from '@/app/store/selectors/user.selector';
import { Loader, Alert } from 'rsuite';
import MessageHeader from './MessageHeader';
import MessageBody from './MessageBody';
import MessageForm from './MessageForm';
import { db } from '@/firebase/firebase';

const Message = () => {
    const channel = useSelector(currentChannelSelector);
    const user = useSelector(userSelector);
    const loading = useSelector(isChannelLoading);
    const [messages, setMessages] = useState({});
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [filterValue, setFilterValue] = useState({});
    const dispatch = useDispatch();

    const handleSearch = (query) => {
        if (query.trim() === '') {
            if (Object.keys(filterValue).length) setFilterValue({});
            return;
        }
        const rgx = new RegExp(query, 'gi');
        const searchedValue = Object.values(messages).reduce((acc, val) => {
            if (val.message && rgx.test(val.message)) {
                acc[val.id] = val;
            } else if (val.createdBy.name && rgx.test(val.createdBy.name)) {
                acc[val.id] = val;
            }
            return acc;
        }, {});
        setFilterValue(searchedValue);
    };

    const addMessage = useCallback((messageId, content) => {
        setMessages((prev) => {
            return {
                ...prev,
                [messageId]: content,
            };
        });
    }, []);

    const removeMessage = useCallback((messageId) => {
        setMessages((prev) => {
            const docs = { ...prev };
            delete docs[messageId];
            return docs;
        });
    }, []);
    const handleMessageLoaded = useCallback(
        (val) => setMessagesLoaded(val),
        []
    );
    const clearMessages = useCallback(() => setMessages({}), []);

    const handleMarkStarted = () => {
        if (!user) return;
        db.doc(`users/${user.id}/started/${channel.id}`)
            .get()
            .then((snap) => {
                console.log(snap);
                if (snap.exists) {
                    snap.ref
                        .delete()
                        .then(() => {
                            Alert.success(
                                'successfully unstated channel',
                                3000
                            );
                            dispatch(setStarted(false));
                        })
                        .catch(() => Alert.error('someting went wrong', 3000));
                } else {
                    snap.ref
                        .set(channel)
                        .then(() => {
                            Alert.success('successfully stated channel', 3000);
                            dispatch(setStarted(true));
                        })
                        .catch(() => Alert.error('someting went wrong', 3000));
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.error('Channel Not Found or Exists', 3000);
            });
    };

    if (loading)
        return (
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <Loader size='md' />
            </div>
        );
    return (
        <div className='p-4 d-flex h-100 flex-column'>
            <MessageHeader
                channel={channel}
                handleSearch={handleSearch}
                handleMarkStarted={handleMarkStarted}
            />
            <MessageBody
                channel={channel}
                messages={
                    Object.keys(filterValue).length ? filterValue : messages
                }
                addMessage={addMessage}
                removeMessage={removeMessage}
                messagesLoaded={messagesLoaded}
                clearMessages={clearMessages}
                handleMessageLoaded={handleMessageLoaded}
            />
            <MessageForm channel={channel} />
        </div>
    );
};

export default Message;
