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


class JourneyListItem extends React.Component {
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
            <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
            }}>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1,}} onPress={() => this.toggle()}>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>

                        {this.state.selected ?
                            <View style={{width: '100%', height: width * 0.2, alignItems: 'center', justifyContent: 'center'}}>

                                <Icon name="ios-checkmark-circle-outline" size={40} color="#83E588"/>
                            </View>
                            :
                            <View style={{width: '100%', height: width * 0.2,}}>
                                <Image
                                    style={{width: null, height: null, flex: 1,}}
                                    source={{uri: 'http://image.boomsbeat.com/data/images/full/759/1-jpg'}}/>
                            </View>
                        }


                    </View>
                    <View style={{flex: 4, flexDirection: 'column', justifyContent: 'center', paddingVertical: 10}}>
                        <Text style={styles.titleText}>{this.props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            elevation: 10,
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
            fontSize: 14,
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
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)(JourneyListItem);
//
