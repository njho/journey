import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Keyboard
} from 'react-native';
import {bootstrap} from './app/Components/config/bootstrap';

import {Provider} from 'react-redux';
import store from './app/store.js';

import Login from './app/Components/Login/';
import QuotePage from './app/Components/QuotePage';

bootstrap();


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
}


AppRegistry.registerComponent('Journey', () => Journey);
