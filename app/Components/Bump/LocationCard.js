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


class LocationCard extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.Value(0),
            translate: new Animated.Value(0),
            status: 0,
            personalJourney: null,
            data: [{name: 'Clean Up the Oceans'}],
            region: {
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        }
        this._deltaY = new Animated.Value(height - 100);

    }

    componentDidMount() {

    }


    render() {

        return (
            <View style={styles.cardContainer}>

                <Text style={styles.titleText}>Check In?</Text>

                <View
                    style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5, alignSelf: 'stretch'}}>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation().showModal({screen: 'locations'})}>
                        <Text style={styles.inverseSubText}>Community</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.inverseSubText}>Location</Text>
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={() => this.props.next()}>
                    <View>
                        <Text style={styles.subText}>Skip</Text>
                    </View>
                </TouchableWithoutFeedback>

                <MapView
                    style={{alignSelf: 'stretch', bottom: 0, height: height * 0.2, borderRadius: 5}}
                    initialRegion={this.state.region}
                    region={this.state.region}
                />

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
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            flexDirection: 'column',
            marginBottom: 30,
        },
        titleText: {
            color: '#9A9CE0',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginHorizontal: 15,
        },
        subText: {
            textAlign: 'center',
            color: '#9A9CE0',
            marginTop: 4,
            marginHorizontal: 35,
            fontSize: 13,
            marginBottom: 20,
        },
        inverseSubText: {
            color: 'white',
            textAlign: 'center',
            marginHorizontal: 20,
            fontSize: 13,
        },
        panelContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        button: {
            backgroundColor: '#9A9CE0',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 15,
            marginBottom: 15,
            paddingVertical: 7,
            marginHorizontal: 5,
            minWidth: 115
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    LocationCard
)
;
//
