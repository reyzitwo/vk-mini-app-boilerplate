import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from './store';

import Router from '@reyzitwo/react-router-vkminiapps';
import structure from './structure';
import App from './App';

import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';
import { AdaptivityProvider } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit', {})

ReactDOM.render(
    <Provider store={store}>
        <AdaptivityProvider>
            <Router structure={structure}>
                <App/>
            </Router>
        </AdaptivityProvider>
    </Provider>,
    document.getElementById('root')
);

import('./eruda.js').then(({ default: eruda }) => {}) 
