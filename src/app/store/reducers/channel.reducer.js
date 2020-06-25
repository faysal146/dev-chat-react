import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from './user.reducer'
const initialState = {
    loading: true,
    currentChannel: null,
};
const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannel(state, action) {
            return { ...state, loading: false, currentChannel: action.payload };
        },
    },
    extraReducers: {
    	[logoutUser.fulfilled]: (state) => initialState
    }
});

export const { setChannel } = channelSlice.actions;

export default channelSlice.reducer;
