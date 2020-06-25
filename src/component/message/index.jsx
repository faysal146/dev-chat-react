import React from 'react';
import { useSelector } from 'react-redux';
import {
    currentChannelSelector,
    isChannelLoading,
} from '@/app/store/selectors/channelSelector';
import { Loader } from 'rsuite';
import MessageHeader from './MessageHeader';
import MessageBody from './MessageBody';
import MessageForm from './MessageForm';
const Message = () => {
    const channel = useSelector(currentChannelSelector);
    const loading = useSelector(isChannelLoading);
    if (loading)
        return (
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <Loader size='md' />
            </div>
        );
    return (
        <div className='p-4 d-flex h-100 flex-column'>
            <MessageHeader channel={channel} />
            <MessageBody channel={channel} />
            <MessageForm channel={channel} />
        </div>
    );
};

export default Message;
