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
import agent from '../helpers/agent';
import * as Animatable from 'react-native-animatable';
import FadeInView from "../helpers/FadeInView";
import Interactable from 'react-native-interactable';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';


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


class SlideAndRotate extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            spinValue: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }


    toggle() {
        this.setState({
            ...this.state,
            selected: !this.state.selected
        })

        Animated.parallel([
            Animated.timing(
                this.state.spinValue,
                {
                    toValue: this.state.selected ? 0 : 1,
                    duration: 200,
                    easing: Easing.linear,
                }
            ), Animated.timing(
                this.state.opacity,
                {
                    toValue: this.state.selected ? 0 : 1,
                    duration: 200,
                    easing: Easing.linear,
                }
            )
        ]).start();

    }


    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg']
        })

        const opacity = this.state.opacity.interpolate({
            inputRange: [0,1],
            outputRange: [width/3, 0]
        })

        return (
            <View style={[this.props.style, {flexDirection: 'row', alignItems: 'center'},]}>
                <Animated.View style={{transform: [{translateX: opacity}]}}>
                    <TouchableOpacity>
                        <Text
                            style={{marginRight: 10, color: this.props.backgroundColor, fontWeight: 'bold'}}
                            ref="text">I was here!</Text>
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity
                    onPress={() => this.toggle()}
                    style={[{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: this.props.backgroundColor,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }]}>
                    <Animated.View style={{transform: [{rotate: spin}]}}>
                        <Icon name={this.props.icon}
                              style={[{
                                  color: 'white',
                              },]} size={20}/>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({});


export default connect(mapStateToProps, mapDispatchToProps)(SlideAndRotate);
//
