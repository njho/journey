/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";


export default class Journey extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Journey', () => Journey);

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
            console.log('[BackgroundGeolocation HeadlessTask] - getCurrentPosition:', location);
            break;
        case 'http':
            // Use await for async tasks
            let dog = await getCurrentPosition();
            console.log('[BackgroundGeolocation HeadlessTask] - http:', dog);
            break;
        case 'location':
            // Use await for async tasks
            let cat = await getCurrentPosition();
            console.log('[BackgroundGeolocation HeadlessTask] - location:', cat);
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

