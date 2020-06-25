import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {logout, signupFirebase, signinFirebase, checkIsAuthenticated } from '@/firebase/controller';

export const signUpUser = createAsyncThunk('user/signUp', async (data) => {
    const avatar = 'https://firebasestorage.googleapis.com/v0/b/dev-chat-react.appspot.com/o/user-avatar%2Fdefault-avatar.png?alt=media&token=8b37e2a2-85bc-40cf-9a93-d02f80fa8549'
    const res = await signupFirebase({
        ...data, 
        avatar
    })
    const userData = {
        id: res.user.uid,
        name: data.name,
        avatar,
        email: res.user.email,
    };
    return userData;
})
export const signInUser = createAsyncThunk('user/signIn', async (data,{ rejectWithValue }) => {
    try {
        const authUser = await signinFirebase(data);
        return {
            id: authUser.user.uid,
            name: authUser.user.displayName,
            email: authUser.user.email,
            avatar: authUser.user.photoURL,
        };
    } catch(err) {
        throw err;
    }
})
export const logoutUser = createAsyncThunk('user/logout', logout);
export const checkSession = createAsyncThunk('user/auth', checkIsAuthenticated)

const initialState = {
    loading: true,
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return { loading: false, currentUser: action.payload };
        },
    },
    extraReducers: {
        [logoutUser.fulfilled]: (state) => {
            return { currentUser: null, loading: false }
        },
        [checkSession.fulfilled]: (state, action) => {
            return {...state, currentUser: action.payload, loading: false }
        },
        [checkSession.rejected]: (state, payload) => {
            return {...state, currentUser: null, loading: false }
        },
        [signUpUser.fulfilled]:(state, action) => {
            return {...state, currentUser: action.payload }
        },
        [signInUser.fulfilled]:(state, action) => {
            return {...state, currentUser: action.payload }
        },    
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
