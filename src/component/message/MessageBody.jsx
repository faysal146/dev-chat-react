import React, { useEffect, createRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessagesContainer } from '@/styles/dashboard.style';
import UserMessageItem from './UserMessageItem';
import { MessagePlaceholder } from '@/styles/custom.style';
import { subscribeMessages } from '@/firebase/controller';

const messageBodyScrollRef = createRef();

const MessageBody = ({
    messagesLoaded, 
    addMessage, 
    removeMessage, 
    clearMessages, 
    handleMessageLoaded,
    messages
}) => {

    const { id: channelId } = useParams();

    useEffect(() => {
        const getMessage = subscribeMessages(channelId)
        const unsubscribe = getMessage(docSnapshot => {
            if (docSnapshot.size < 1) return handleMessageLoaded(true);
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
                            addMessage(change.doc.id,{
                                id: change.doc.id,
                                message: data.message,
                                images: data.images,
                                createdBy: data.user,
                                created_at: data.created_at.toMillis(),
                            })
                            handleMessageLoaded(true);
                            toBottom()
                        }
                    }
                    if (change.type === 'removed') {
                        removeMessage(change.doc.id)
                    }
                } else {
                    handleMessageLoaded(true);
                }
            });
        })
        return () => {
            clearMessages();
            handleMessageLoaded(false);
            unsubscribe();
        };
    }, [channelId]);
    function toBottom() {
        if (messageBodyScrollRef.current)
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
        return [1, 2, 3].map((val) => <MessagePlaceholder
            style={{ marginTop: 30 }}
            rows={3}
            rowHeight={7}
            rowMargin={13}
            graph='circle'
            active
            key={val}
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
