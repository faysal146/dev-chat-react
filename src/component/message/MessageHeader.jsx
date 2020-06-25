import React from 'react';
import { FlexboxGrid, Icon } from 'rsuite';
import { IconWithSize } from '@/styles/custom.style';
import { MessageInputGroup } from '@/styles/dashboard.style';

const MessageHeader = ({ channel }) => {
    return (
        <FlexboxGrid
            align='middle'
            style={{ background: 'var(--bg-dark-light)' }}
            className='py-2 px-4 rounded'
        >
            <FlexboxGrid.Item colspan={12}>
                <h3>
                    {channel.channel}{' '}
                    <IconWithSize icon='star-o' className='size-10' />
                </h3>
                <span className='mt-2'>
                    <IconWithSize icon='peoples' className='size-10' />
                    <span className='ml-2'>2</span>
                </span>
                {/*<Icon icon="star" />*/}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
                <MessageInputGroup className='flex-grow-1 rounded'>
                    <div className='icon-container'>
                        <div className='chat-icon'>
                            <Icon icon='search' />
                        </div>
                    </div>
                    <input
                        className='rounded w-100'
                        style={{ paddingLeft: '30px' }}
                        type='text'
                        placeholder='Search Meassage...'
                    />
                </MessageInputGroup>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
};

export default MessageHeader;
