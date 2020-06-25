import React, { useEffect } from 'react';
import Routes from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading } from '@/app/store/selectors/user.selector';
import { GlobalStyles } from '@/styles/global.style';
import { checkSession } from '@/app/store/reducers/user.reducer';

import { Loader } from 'rsuite';

const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    useEffect(() => {
        dispatch(checkSession())
    }, [dispatch]);

    return (
        <>
            <GlobalStyles />
            {loading ? <Loader center size='lg' /> : <Routes />}
        </>
    );
};

export default App;
