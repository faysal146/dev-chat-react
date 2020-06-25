import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import App from './app/App';
import '@/styles/theme.less';
import { Provider } from 'react-redux';
import store from './app/store/index';
import 'emoji-mart/css/emoji-mart.css'

import * as serviceWorker from './serviceWorker';

const WithHotReload = process.env.NODE_ENV === 'production' ? App : hot(App);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <WithHotReload />
        </BrowserRouter>
    </Provider>,
    // <React.StrictMode>

    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
