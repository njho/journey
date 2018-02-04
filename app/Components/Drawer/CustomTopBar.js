import React, {Component} from 'react';
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
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
    ToastAndroid,
    Switch,

    Slider,
    Picker,
    Platform,
    StatusBar
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';
import Interactable from 'react-native-interactable';
import firebase from 'react-native-firebase';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';


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


class SideDrawer extends Component {

    logout = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigator.toggleDrawer({
                side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                animated: false, // does the toggle have transition animation or does it happen immediately (optional)
            });
            this.props.navigator.handleDeepLink({
                link: 'login',
                payload: '' // (optional) Extra payload with deep link
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity stye={styles.button}>
                    <Text style={styles.text}>Press Me</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({});


export default connect(mapStateToProps, mapDispatchToProps)

(
    SideDrawer
)
;
//
