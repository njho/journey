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
        this._deltaY = new Animated.Value(height - 100);
    }

    componentDidMount() {

    }

    iconPicker(value) {

        switch(value) {
            case 'bump':
                return 'md-wifi'
            case 'photo':
                return 'md-square-outline'
        }


    }


    render() {

        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 25,
                borderBottomColor: '#9A9CE0',
                borderBottomWidth: 1,
                flex: 1,
            }}>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={this.iconPicker(this.props.meta.last_action)} size={40} color="#9A9CE0"/>
                        <Text style={styles.subText}>{this.props.meta.last_action_meta}</Text>

                        <Text style={styles.subText}>{this.props.meta.last_entry_date}</Text>

                    </View>
                    <View style={{flex: 4, marginLeft: 10, flexDirection: 'column', justifyContent: 'center', }}>
                        <Text style={styles.titleText}>{this.props.name}</Text>
                        <View style={{flexDirection: 'row',}}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>{this.props.meta.num_followers} Entries</Text>
                            </View>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>{this.props.meta.num_contributors} <Icon name="md-locate" size={14} color="white"/></Text>
                            </View>


                        </View>
                    </View>
                </TouchableOpacity>
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
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)(JourneyListItem);
//
