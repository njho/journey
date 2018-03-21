import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Keyboard
} from 'react-native';
import {Navigation, NativeEventsReceiver} from 'react-native-navigation';
import BackgroundGeolocation from "react-native-background-geolocation";
import agent from './app/Components/helpers/agent';

import {Provider} from 'react-redux';
import store from './app/store.js';

import {bootstrap} from './app/Components/config/bootstrap';
import {registerScreens} from './screens';

import {NativeModules} from 'react-native';



bootstrap();
registerScreens(store, Provider);

Navigation.isAppLaunched()
    .then(appLaunched => {
        if (appLaunched) {
            startApp(); // App is launched -> show UI
        }
        new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
    });

function startApp() {
    Navigation.startTabBasedApp({
        tabs: [
            // {
            //     label: 'Login',
            //     screen: 'login', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'Screen One',
            //     tabBarHidden: true
            // },
            // {
            //     label: 'One',
            //     screen: 'quotePage', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
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

            // {
            //     label: 'two',
            //     screen: 'streamer', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //         /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'neighborhood Detected',
            //     tabBarHidden: false,
            // }
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
            //
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

            // {
            //     label: 'UrlShare',
            //     screen: 'UrlShare', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'Bump',
            //     tabBarHidden: false,
            // },
            // {
            //     label: 'JourneyView',
            //     screen: 'JourneyView', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'JourneyView',
            //     tabBarHidden: false,
            // },
            // {
            //     label: 'Timeline',
            //     screen: 'Timeline', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'Timeline',
            //     tabBarHidden: false,
            // },
            // {
            //     label: 'LiveStoryView',
            //     screen: 'LiveStoryView', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'LiveStoryView',
            //     tabBarHidden: false,
            // },
            // {
            //     label: 'LiveStoryMapView',
            //     screen: 'LiveStoryMapView', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'LiveStoryView',
            //     tabBarHidden: false,
            // },

            // {
            //     label: 'JourneyPicker',
            //     screen: 'JourneyPicker', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'JourneyPicker',
            //     tabBarHidden: false,
            // },
            // {
            //     label: 'individualTimeline',
            //     screen: 'IndividualTimeline', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     title: 'individualtimeline',
            //     tabBarHidden: false,
            // },


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
            // {
            //     label: 'Profile',
            //     screen: 'Profile', // this is a registered name for a screen
            //     icon: require('./app/Assets/icons/visaIcon.png'),
            //     /*
            //      selectedIcon: require('../img/one_selected.png'), // iOS only
            //      */
            //     tabBarHidden: false,
            //
            // },
            {
                label: 'JourneyStart',
                screen: 'JourneyStart', // this is a registered name for a screen
                icon: require('./app/Assets/icons/visaIcon.png'),
                /*
                 selectedIcon: require('../img/one_selected.png'), // iOS only
                 */
                title: 'JourneyStart',
                tabBarHidden: false,
            },

        ]
        ,
        drawer: {
            left: {
                screen: 'SideDrawer',
            },

        },
        tabsStyle: {
            topBarShadowColor: 'red',
            statusBarColor: '#221B36',    },
        appStyle: {
            topBarShadowColor: 'red',
            statusBarColor: '#221B36',

        }

    });
}


////
// Define your Headless task -- simply a javascript async function to receive
// events from BackgroundGeolocation:
//
let HeadlessTask = async (event) => {
    let params = event.params;
    console.log('[BackgroundGeolocation HeadlessTask] -', event.name, params);

    switch (event.name) {
        case 'heartbeat':
            // Use await for async tasks
            let location = await getCurrentPosition();
            let date = event.timestamp;
            console.log('[BackgroundGeolocation HeadlessTask] - getCurrentPosition:', location);

            //Take a picture with the current location data.
            // NativeModules.picturePackage.takePicture(timestamp);


            break;
        case 'http':
            // Use await for async tasks
            let dog = await getCurrentPosition();
            console.log('[BackgroundGeolocation HeadlessTask] - http:', dog);
            // agent.FirebaseQuery.uploadImage();

            break;
        case 'location':
            // Use await for async tasks
            let cat = await getCurrentPosition();
            console.log('[BackgroundGeolocation HeadlessTask] - location:', location);
            break;
    }
}

////
// You're free to execute any API method upon BackgroundGeolocation in your HeadlessTask.
// Just be sure to wrap them in a Promise and "await" their completion.
//
let getCurrentPosition = () => {
    return new Promise((resolve) => {
        BackgroundGeolocation.getCurrentPosition((location) => {
            resolve(location);
        }, (error) => {
            resolve(error);
        }, {
            samples: 1,
            persist: false
        });
    });
};

////
// Register your HeadlessTask with BackgroundGeolocation plugin.
//
BackgroundGeolocation.registerHeadlessTask(HeadlessTask);


AppRegistry.registerComponent('Journey', () => Journey);
