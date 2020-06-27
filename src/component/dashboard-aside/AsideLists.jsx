import React from 'react';
import { List } from 'rsuite';
import {
    ListItemContainer,
    UserStatusDot,
    NotificationsLabel,
} from '@/styles/dashboard.style';

const buildPath = (userId, itemId) =>
    userId > itemId ? `${userId}-${itemId}` : `${itemId}-${userId}`;

function notificationsLabel(notifications, itemId, type, userId) {
    if (type === 'USER' && notifications[buildPath(userId, itemId)]) {
        return (
            <NotificationsLabel>
                {notifications[buildPath(userId, itemId)].count}
            </NotificationsLabel>
        );
    } else if (notifications[itemId]) {
        return (
            <NotificationsLabel>
                {notifications[itemId].count}
            </NotificationsLabel>
        );
    } else return null;
}

const ChannelLists = ({
    collections,
    active,
    setActive,
    type,
    notifications,
    userId,
}) => {
    return (
        <List hover className='mt-2 pointer ml-2'>
            {Object.keys(collections).map((itemId) => (
                <List.Item
                    className={
                        'px-2 rounded mb-1 ' +
                        (itemId === active ? 'is-active-list' : '')
                    }
                    key={itemId}
                    onClick={() => setActive(itemId, type)}
                >
                    <ListItemContainer>
                        <span>
                            {type === 'USER' ? '@' : '#'}
                            {collections[itemId].name}
                        </span>
                        <div>
                            {/*notificationsLabel(
                                notifications,
                                itemId,
                                type,
                                userId
                            ) */}
                            {type === 'USER' && (
                                <UserStatusDot
                                    status={collections[itemId].state}
                                />
                            )}
                        </div>
                    </ListItemContainer>
                </List.Item>
            ))}
        </List>
    );
};

export default ChannelLists;
