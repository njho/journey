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


class HorizontalAvatar extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
        this._deltaY = new Animated.Value(height - 100);
    }

    componentDidMount() {

    }

    iconPicker(value) {
        switch (value) {
            case 'bump':
                return 'md-wifi'
            case 'photo':
                return 'md-square-outline'
        }
    }

    toggle() {
        this.setState({
            ...this.state,
            selected: !this.state.selected
        })

    }


    render() {

        return (
            <View style={[{
                marginTop: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                alignSelf: 'stretch'
            }]}>
                <View
                    style={[{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: 0.14 * width,
                        height: 0.14 * width,
                        borderRadius: 0.11 * width,
                        borderColor: '#538FB7',
                        borderWidth: 1,
                    }]}
                >
                    <View
                        style={[{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#538FB7',
                            width: 0.13 * width,
                            height: 0.13 * width,
                            borderRadius: 0.15 * width
                        }]}
                    >
                        <Icon name="ios-document-outline"
                              style={{
                                  color: 'white',
                                  margin: 10
                              }} size={25}/>
                    </View>
                </View>
                <View style={{flexDirection: 'column', marginLeft: 15,}}>
                    <TouchableOpacity>
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                                color: this.props.mainColor,
                                fontSize: 28
                            }}>{this.props.name}</Text>
                        </View></TouchableOpacity>
                    {this.props.journey !== "" ? <TouchableOpacity>
                        <View>
                            <Text style={{color: this.props.subColor, fontSize: 14}}>/{this.props.journey}</Text>
                        </View>
                    </TouchableOpacity> : null}

                </View>
                {this.props.button ?
                    <View style={{position: 'absolute', right: 0}}>
                        <Icon name="ios-arrow-dropright-circle" size={40} color="#00BBF5"/>
                    </View>
                    : null}

            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            backgroundColor: 'white',
            elevation: 10,
            paddingHorizontal: 15,
            marginHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: 40,
        },
        titleText: {
            color: '#9A9CE0',
            fontWeight: 'bold',
            fontSize: 20,
        },
        subText: {
            color: '#9A9CE0',
            fontSize: 12,
            marginHorizontal: 10,
            textAlign: 'center',

        },
        button: {
            backgroundColor: '#86E5C6',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginTop: 5,
            marginBottom: 5,
            paddingVertical: 7,
            marginRight: 5,
        },
        buttonText: {
            color: 'white',
            fontSize: 12,
            marginHorizontal: 15,
        },

    });


export default connect(mapStateToProps, mapDispatchToProps)(HorizontalAvatar);
//
