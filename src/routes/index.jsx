import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ChatPage from '@/pages/ChatPage';

import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';

const index = () => {
    return (
        <Switch>
            <PublicRoute path='/login' exect>
                <Login />
            </PublicRoute>
            <PublicRoute path='/register' exect>
                <Register />
            </PublicRoute>
            <PrivateRoute path='/' exect>
                <ChatPage />
            </PrivateRoute>
        </Switch>
    );
};

export default index;
