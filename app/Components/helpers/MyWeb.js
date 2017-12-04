import React, { Component } from 'react';
import { WebView } from 'react-native';
import {connect} from 'react-redux';


class MyWeb extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WebView
                source={{uri: this.props.url}}
            />
        );
    }
}

export default connect()(MyWeb);