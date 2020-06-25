import React from 'react';
import { isAuthenticated } from '@/app/store/selectors/user.selector';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default ({ children, ...others }) => {
    const isAuth = useSelector(isAuthenticated);
    return (
        <Route {...others}>{!isAuth ? children : <Redirect to='/' />}</Route>
    );
};
