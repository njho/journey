import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Keyboard
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import {Provider} from 'react-redux';
import store from './app/store.js';

import {bootstrap} from './app/Components/config/bootstrap';
import { registerScreens } from './screens';

import Login from './app/Components/Login/';
import QuotePage from './app/Components/QuotePage';

bootstrap();
registerScreens(store, Provider);

Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'One',
            screen: 'login', // this is a registered name for a screen
             icon: require('./app/Assets/icons/visaIcon.png'),
            /*
             selectedIcon: require('../img/one_selected.png'), // iOS only
             */
            title: 'Screen One',
            tabBarHidden: true
        }
    ]
});
/*
export default class Journey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    render() {
        return (
            <Provider store={store}>
                <QuotePage></QuotePage>
            </Provider>
        );
    }
}*/


AppRegistry.registerComponent('Journey', () => Journey);