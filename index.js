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
import firebase from 'react-native-firebase';
import moment from 'moment';

import agent from './app/Components/helpers/agent';


import {Provider} from 'react-redux';
import store from './app/store.js';

import {bootstrap} from './app/Components/config/bootstrap';
import {registerScreens} from './screens';

import {NativeModules} from 'react-native';
import realm from './app/Components/helpers/realm';

import helperFunctions from './app/Components/helpers/helperFunctions';

const TRACKER_HOST_TWO = 'https://us-central1-journeyapp91.cloudfunctions.net/graphql/locationUpdate';


bootstrap();
registerScreens(store, Provider);

Navigation.isAppLaunched()
    .then(appLaunched => {
        if (appLaunched) {
            console.log('App is launched -> show UI')
            startApp(); // App is launched -> show UI
        }

        console.log('App hasn\'t been launched yet -> show the UI only when needed.')

        new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
    });

firebase.messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            // user has a device token
            console.log('This is the token: ' + fcmToken);
        } else {
            // user doesn't have a device token yet
            console.log('user does not have a token yet')
        }
    });

firebase.messaging().hasPermission()
    .then(enabled => {
        if (enabled) {
            // user has permissions
            console.log('The user has Permissions');
        } else {
            // user doesn't have permission
            console.log('The user does not have Permissions');
            firebase.messaging().requestPermission()
                .then(() => {
                    // User has authorised
                    console.log('The User has authorized google cloud messaging');
                })
                .catch(error => {
                    // User has rejected permissions
                    console.log('The User has not authorized google cloud messaging');

                });
        }
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
            statusBarColor: '#221B36',
        },
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
            // let dog = await getCurrentPosition();
            //console.log('[BackgroundGeolocation HeadlessTask] - http:', dog);
            // agent.FirebaseQuery.uploadImage();

            console.log('===================HEADLESS HTTP =======================>');
            let response = params;
            let responseText = response.responseText;
            let res = JSON.parse(responseText);
            console.log(res);
            console.log(res.uid);
            console.log(res.timestamp);
            // agent.FirebaseQuery.uploadImage();


            //Retrieve ALL the failed persists and determine if this SUCCESSFUL HTTP is a previously failed attempt
            let failedPersists = realm.objects('FailedPersists');
            // console.log(failedPersists);
            let failedPersist = failedPersists.filtered('uuid = \'' + res.uid.replace(/"/g, "") + '\'');
            // console.log('this is the failed persist: ' + failedPersist);
            // console.log(failedPersist);

            if (failedPersists.length > 0) {
                console.log(failedPersists);
                failedPersists.forEach(function (element, index, array) {
                    console.log(element.uuid);
                })
            }
            // console.log('Failed Persist: ' + failedPersist);


            //=================== CHECK LAST DATA COLLECT ===================>
            let LastDataCollect = realm.objects('LastDataCollect');
            console.log('this is the last Data Collect');
            console.log(LastDataCollect);

            //=================== PICTURE OR VIDEO? BASED ON USER PARAMETERS ===================>
            //=================== 0: Picture, 1: Video  ===================>
            console.log(helperFunctions.weightedRand());
            let rand012 = helperFunctions.weightedRand({0: 0.5, 1: 0.5});
            let number = rand012();
            console.log('This is the random distribution: ' + rand012());
            console.log('This is the random distribution1: ' + number);


            console.log(response.status);

            if (failedPersist.length === 0) {
                if (response.status !== 200) {
                    console.log('Not a successful HTTP Request. Take a picture and persist as one to upload later with a 200 okay HTTP');

                    let lastLocationUuid = realm.objects('LastLocation');
                    console.log('this is the lastLocationUuid: ' + lastLocationUuid[0].uuid);
                    // NativeModules.picturePackage.takePicture(lastLocationUuid,
                    //     () => {
                    //         console.log('takePicture Callback invoked');
                    //     })

                    realm.write(() => {
                        realm.create('FailedPersists', {uuid: lastLocationUuid[0].uuid, timestamp: 'placeholder'})
                    });

                    //Log the current failed persists
                    let FailedPersists = realm.objects('FailedPersists');
                    console.log('Failed Persists');
                    if (FailedPersists.length > 0) {
                        console.log(FailedPersists);
                        FailedPersists.forEach(function (element, index, array) {
                            console.log(element.uuid);
                        })
                    }

                } else if (response.status === 200) {
                    //Take picture and upload
                    console.log('response 200');
                    console.log(LastDataCollect.length);
                    console.log(LastDataCollect[0]);
                    console.log(res.timestamp)

                    if (LastDataCollect.length > 0 && (res.timestamp - LastDataCollect[0].timestamp) > 60000) {
                        console.log('This was the time Difference: ' + (res.timestamp - LastDataCollect[0].timestamp) / 1000 + 's');

                        realm.write(() => {
                            realm.create('LastDataCollect', {
                                id: 0,
                                timestamp: moment(res.timestamp).format('x')
                            }, true);
                        });

                        if (number == 0) {
                            console.log('======================> Take a Video')
                            NativeModules.videoPackage.takeVideo('test_journey', res.uid.replace(/"/g, ""),
                                () => {
                                    console.log('takeVideo Callback invoked');
                                    agent.FirebaseQuery.uploadVideo('test_journey', res.uid.replace(/"/g, ""));
                                })
                        } else {
                            console.log('======================> Take a Picture')
                            NativeModules.picturePackage.takePicture('test_journey', res.uid.replace(/"/g, ""),
                                () => {
                                    console.log('takePicture Callback invoked');
                                    agent.FirebaseQuery.uploadImage('test_journey', res.uid.replace(/"/g, ""));
                                })
                        }

                        let rand012 = 0;
                        let number = 0;

                    } else if (LastDataCollect.length > 0 && (res.timestamp - LastDataCollect[0].timestamp) <= 60000) {
                        console.log('response 200 okay, too little time between events. Do not call.');
                        console.log('PREVENTING COLLISION CITY');
                        console.log('This was the time Difference: ' + (res.timestamp - LastDataCollect[0].timestamp) / 1000 + 's');

                    } else {
                        console.log('in the else');
                        realm.write(() => {
                            realm.create('LastDataCollect', {
                                id: 0,
                                timestamp: moment(res.timestamp).format('x')
                            }, true);
                        });

                        if (number == 0) {
                            console.log('======================> Take a Video')

                            NativeModules.videoPackage.takeVideo('test_journey', res.uid.replace(/"/g, ""),
                                () => {
                                    console.log('takeVideo Callback invoked');
                                    agent.FirebaseQuery.uploadVideo('test_journey', res.uid.replace(/"/g, ""));
                                })
                        } else {
                            console.log('======================> Take a Picture')

                            NativeModules.picturePackage.takePicture('test_journey', res.uid.replace(/"/g, ""),
                                () => {
                                    console.log('takePicture Callback invoked');
                                    agent.FirebaseQuery.uploadImage('test_journey', res.uid.replace(/"/g, ""));
                                })
                        }
                    }
                }

            } else {
                if (response.status === 200 && failedPersist[0].uuid === res.replace(/"/g, "")) {
                    console.log('http success, but this was a previously failed event, so only Upload Photo');
                    // agent.FirebaseQuery.uploadImage(res.uid);

                    console.log('delete the successfully uploaded photo from realm');
                    realm.write(() => {
                        realm.delete(failedPersist);
                    })

                    console.log('this is the FAILED PERSISTS with unit removed');
                    if (failedPersists.length > 0) {
                        console.log(failedPersists);
                        failedPersists.forEach(function (element, index, array) {
                            console.log(element.uuid);
                        })
                    }
                }
            }

            break;
        case 'location':
            // Use await for async tasks
            // let cat = await getCurrentPosition();
            console.log('[BackgroundGeolocation HeadlessTask] - location:', location);
            break;
    }
}

////
// Register your HeadlessTask with BackgroundGeolocation plugin.
//
BackgroundGeolocation.registerHeadlessTask(HeadlessTask);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => handleBackgroundMessage()); // <-- Add this line

const handleBackgroundMessage = async (message) => {

    console.log('message received in the background');
    console.log(message);
    //Step 4. Reconfigure BackgroundGeolocation to
    BackgroundGeolocation.configure({
            disableElasticity: true,
            distanceFilter: 10,
            stopOnTerminate: false,
            stopAfterElapsedMinutes: 1,
            enableHeadless: true,
            heartbeatInterval: 60,
            startOnBoot: true,
            foregroundService: true,
            url: TRACKER_HOST_TWO,
            extras: {
                journey_id: 'test_journey'
            },
            autoSync: true,
            debug:
                true,
            logLevel:
            BackgroundGeolocation.LOG_LEVEL_VERBOSE
        },
        (state) => {
            console.log('Background Geolocation configured');
            console.log('Starting Background Geolocation');
            BackgroundGeolocation.start();
        })

    return Promise.resolve();
};


AppRegistry.registerComponent('Journey', () => Journey);


