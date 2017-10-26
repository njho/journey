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
import LocationCommunity from './app/Components/Community/LocationCommunity';

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
        },
        {
            label: 'two',
            screen: 'neighborhoodDetected', // this is a registered name for a screen
            icon: require('./app/Assets/icons/visaIcon.png'),
            /*
             selectedIcon: require('../img/one_selected.png'), // iOS only
             */
            title: 'neighborhood Detected',
            tabBarHidden: true,
            overrideBackPress: true
        },
        {
            label: 'two',
            screen: 'neighbors', // this is a registered name for a screen
            icon: require('./app/Assets/icons/visaIcon.png'),
            /*
             selectedIcon: require('../img/one_selected.png'), // iOS only
             */
            title: 'neighborhood Detected',
            tabBarHidden: true,
            overrideBackPress: true
        },

        {
            label: 'three',
            screen: 'locationCommunity', // this is a registered name for a screen
            icon: require('./app/Assets/icons/visaIcon.png'),
            /*
             selectedIcon: require('../img/one_selected.png'), // iOS only
             */
            title: 'location',
            tabBarHidden: true,
            overrideBackPress: true
        },
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
