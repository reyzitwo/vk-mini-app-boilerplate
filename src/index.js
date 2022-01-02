import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'react-router-vkminiapps';
import structure from './structure';
import App from './App';

import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';
import { AdaptivityProvider } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

bridge.subscribe((e) => {
    switch (e.detail.type) {
        case 'VKWebAppUpdateConfig':
            let schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
            document.body.attributes.setNamedItem(schemeAttribute);
            break;

        default:
            break;
    }
})

bridge.send('VKWebAppInit', {})

ReactDOM.render(
    <Router structure={structure}>
        <AdaptivityProvider>
            <App/>
        </AdaptivityProvider>
    </Router>,
    document.getElementById('root')
);

import('./eruda.js').then(({ default: eruda }) => {}) 