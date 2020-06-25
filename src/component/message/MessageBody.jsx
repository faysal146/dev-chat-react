import React, { useEffect, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessagesContainer } from '@/styles/dashboard.style';
import UserMessageItem from './UserMessageItem';
import { MessagePlaceholder } from '@/styles/custom.style';
import { db } from '@/firebase/firebase';

const messageBodyScrollRef = createRef();

const MessageBody = () => {
    const [messages, setMessages] = useState({});
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const { id: channelId } = useParams();

    useEffect(() => {
        const unsubscribe = db
            .collection(`messages/${channelId}/chats`)
            .orderBy('created_at')
            .onSnapshot((docSnapshot) => {
                if (docSnapshot.size < 1) return setMessagesLoaded(true);
                docSnapshot.docChanges().forEach((change) => {
                    if (change.doc.exists) {
                        const data = change.doc.data();
                        if (
                            change.type === 'added' ||
                            change.type === 'modified'
                        ) {
                            if (
                                data.created_at &&
                                !docSnapshot.metadata.hasPendingWrites
                            ) {
                                setMessages((prev) => ({
                                    ...prev,
                                    [change.doc.id]: {
                                        id: change.doc.id,
                                        message: data.message,
                                        images: data.images,
                                        createdBy: data.user,
                                        created_at: data.created_at.toMillis(),
                                    },
                                }));
                                setMessagesLoaded(true);
                                toBottom()
                            }
                        }
                        if (change.type === 'removed') {
                            setMessages((prev) => {
                                const docs = { ...prev };
                                delete docs[change.doc.id];
                                return docs;
                            });
                        }
                    } else {
                        setMessagesLoaded(true);
                    }
                });
            });
        return () => {
            setMessages({});
            setMessagesLoaded(false);
            unsubscribe();
        };
    }, [channelId]);
    function toBottom() {
        if(messageBodyScrollRef.current)
            messageBodyScrollRef.current.scrollTo(0, messageBodyScrollRef.current.scrollHeight);
    }
    useEffect(() => {
        if (messageBodyScrollRef.current) {
            setTimeout(() => {
               toBottom()
            }, 1000)
        }
    }, [messagesLoaded]);

    const DomNode = () => {
        if (messagesLoaded && Object.keys(messages).length < 1) {
            return <p className='text-center py-3'>No Messages Yet</p>;
        }

        if (messagesLoaded) {
            return Object.values(messages).map((item) => (
                <UserMessageItem {...item} key={item.id} />
            ));
        }
        return [1,2,3].map((_,index) => <MessagePlaceholder
                style={{ marginTop: 30 }}
                rows={3}
                rowHeight={7}
                rowMargin={13}
                graph='circle'
                active
            />
        )
    };

    return (
        <MessagesContainer
            className='my-3 rounded p-4'
            ref={messageBodyScrollRef}
        >
            <DomNode />
        </MessagesContainer>
    );
};

export default MessageBody;
