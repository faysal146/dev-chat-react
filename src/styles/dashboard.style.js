import styled from 'styled-components';
import { Popover, Button } from 'rsuite';

export const Brand = styled.h2`
    color: #f9cb40;
`;

export const UserProfileContainer = styled.div`
    padding: 20px;
    background: var(--optional-bg);
    height: 100%;
`;

export const ManuDropDown = styled(Popover)`
    min-width: 200px;
    max-width: 350px;
`;

export const DashbordHeaderAvatar = styled(Button)`
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    text-transform: capitalize;
    width: 100%;
    &:hover,
    &:active,
    &:focus {
        background: rgba(255, 255, 255, 0.2);
    }
`;

export const MessageFormContainer = styled.div`
    background: var(--bg-dark-light);
`;
export const MessageInputGroup = styled.div`
    position: relative;
    overflow: hidden;
    input {
        width: 100%;
        height: 45px;
        padding: 10px;
        border: 1px solid var(--bg-light);
        background: var(--bg-dark);
        &:focus {
            outline: 1px solid var(--bg-light);
        }
    }
    svg {
        width: 24px;
        height: 24px;
    }
    .icon-container {
        display: flex;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        .chat-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .plus {
            background: #3541c173;
        }
    }
    button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        &.upload {
            border-radius: 5px;
            left: 7px;
            background: #008cff61;
            i {
                font-size: 12px;
            }
        }
        .emoji {
            i {
                font-size: 20px;
            }
        }
    }
`;

export const SendMessageButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 50px;
    background: #3541c173;
    outline: none;
    &:focus,
    &:active {
        outline: none;
    }
    &:disabled {
        opacity: 0.5;
    }
`;

export const MessagesContainer = styled.div`
    flex-grow: 1;
    background: var(--bg-dark-light);
    overflow: auto;
`;

export const UserMessage = styled.div`
    border-bottom: 1px solid var(--bg-dark-light-hover);
    padding-bottom: 8px;
`;
