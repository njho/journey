import React from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    Easing,
    ScrollView,
    TouchableWithoutFeedback,
    ToastAndroid,
    Slider,
    Picker,
    Platform,
    StatusBar
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';

import Chat from '../Chat/Chat';


import {theme} from "../helpers/constants";


const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LATITUDE_DELTA = 0.0062;
const LONGITUDE_DELTA = 0.0021;

const mapStateToProps = state => ({
    subscriberSessionId: state.navigationReducer.subscriberSessionId
});

const mapDispatchToProps = dispatch => ({
    timeToggle: (value) => {
        dispatch({type: 'TIME_TOGGLE', isTimeInput: value});
    },
});

const shadowStyle = {
    ...Platform.select({
        android: {elevation: 5,},
        ios: {shadowOpacity: 0.35, shadowOffset: {width: 0, height: 5}, shadowColor: "#000", shadowRadius: 3,}
    })
};

// const connectToSession = async () => {
//     try {
//         await OpenTok.connect(sessionId, token);
//     } catch (e) {
//         console.log(e)
//         console.log('wtf');
//     }
// }

class ActionCards extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TouchableOpacity
                style={styles.card}>
                <View style={{width: '100%', height: 5, backgroundColor: this.props.color}}/>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name={this.props.icon} size={25}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.mainTitle}>{this.props.actionTitle}</Text>
                        <Text style={styles.subText}>{this.props.actionSubtext}</Text>
                    </View>

            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: width / 3,
        height: width / 2,
        elevation: 5,
        flexDirection: 'column',
    },
    mainTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 5,
    },

    actionTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 5
    },

    subText: {
        color: 'white',
        marginVertical: 5,
        fontSize: 14
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(ActionCards);