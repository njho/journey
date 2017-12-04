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
        // {
        //     label: 'One',
        //     screen: 'login', // this is a registered name for a screen
        //      icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'Screen One',
        //     tabBarHidden: true
        // },

        // {
        //     label: 'two',
        //     screen: 'neighbors', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'neighborhood Detected',
        //     tabBarHidden: true,
        //     overrideBackPress: true
        // },

        // {
        //     label: 'three',
        //     screen: 'locationCommunity', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'location',
        //     tabBarHidden: true,
        //     overrideBackPress: true
        // },
        // {
        //     label: 'two',
        //     screen: 'locations', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'neighborhood Detected',
        //     tabBarHidden: false,
        // },

        // {
        //     label: 'two',
        //     screen: 'liveStreams', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'neighborhood Detected',
        //     tabBarHidden: false,
        //     passProps: {sessionId: 'balls'}
        // },
        //
        // {
        //     label: 'two',
        //     screen: 'streamer', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'neighborhood Detected',
        //     tabBarHidden: false,
        // },
        // {
        //     label: 'one?',
        //     screen: 'mainActions', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/americanExpressIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'mainActions Detected',
        //     tabBarHidden: false,
        // },
        // {
        //     label: 'BumpConfirmation',
        //     screen: 'bumpConfirmation', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/americanExpressIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'mainActions Detected',
        //     tabBarHidden: false,
        // },

        // {
        //     label: 'bump',
        //     screen: 'bump', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'Bump',
        //     tabBarHidden: false,
        // },

        {
            label: 'UrlShare',
            screen: 'UrlShare', // this is a registered name for a screen
            icon: require('./app/Assets/icons/visaIcon.png'),
            /*
             selectedIcon: require('../img/one_selected.png'), // iOS only
             */
            title: 'Bump',
            tabBarHidden: false,
        },



        // {
        //     label: 'two',
        //     screen: 'personalJourneyStart', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'neighborhood Detected',
        //     tabBarHidden: false,
        // },

        //
        // {
        //     label: 'two',
        //     screen: 'neighborhoodDetected', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'neighborhood Detected',
        //     tabBarHidden: true,
        //     overrideBackPress: true
        // },
        //
        // {
        //     label: 'four',
        //     screen: 'locationConfirmation', // this is a registered name for a screen
        //     icon: require('./app/Assets/icons/visaIcon.png'),
        //     /*
        //      selectedIcon: require('../img/one_selected.png'), // iOS only
        //      */
        //     title: 'locationConfirmation',
        //     tabBarHidden: true,
        //     overrideBackPress: true
        // },

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
