import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import channelReducer from './reducers/channel.reducer';

const rootReducers = combineReducers({
    user: userReducer,
    currentChannel: channelReducer,
});

const store = configureStore({
    reducer: rootReducers,
});

export default store;
