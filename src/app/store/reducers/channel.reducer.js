import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from './user.reducer';
const initialState = {
    loading: true,
    currentChannel: null,
    isPrivate: false,
};
const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannel(state, action) {
            const { channel, isPrivate } = action.payload;
            return {
                ...state,
                loading: false,
                currentChannel: channel,
                isPrivate,
            };
        },
        setStarted(state, action) {
            if (!state.currentChannel) return state;
            return {
                ...state,
                currentChannel: {
                    ...state.currentChannel,
                    started: action.payload,
                },
            };
        },
    },
    extraReducers: {
        [logoutUser.fulfilled]: (state) => initialState,
    },
});

export const { setChannel, setStarted } = channelSlice.actions;

export default channelSlice.reducer;
