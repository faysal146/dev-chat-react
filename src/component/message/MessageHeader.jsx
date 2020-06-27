import React from 'react';
import { FlexboxGrid, Icon } from 'rsuite';
import { IconWithSize } from '@/styles/custom.style';
import { MessageInputGroup } from '@/styles/dashboard.style';
import styled from 'styled-components';

const Button = styled.button`
    &:focus,
    &:active {
        outline: none;
    }
`;

const MessageHeader = ({ channel, handleSearch, handleMarkStarted }) => {
    return (
        <FlexboxGrid
            align='middle'
            style={{ background: 'var(--bg-dark-light)' }}
            className='py-2 px-4 rounded'
        >
            <FlexboxGrid.Item colspan={12}>
                <h3 className='size-4'>
                    {channel.name}{' '}
                    <Button
                        onClick={handleMarkStarted}
                        className='bg-transparent'
                    >
                        {channel.started ? (
                            <Icon icon='star' />
                        ) : (
                            <IconWithSize
                                icon='star-o'
                                className='size-10'
                                color='green'
                            />
                        )}
                    </Button>
                </h3>
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
                        onInput={(e) => handleSearch(e.target.value)}
                    />
                </MessageInputGroup>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
};

export default MessageHeader;
