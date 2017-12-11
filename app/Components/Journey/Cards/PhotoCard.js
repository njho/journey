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
import agent from '../../helpers/agent';
import * as Animatable from 'react-native-animatable';
import Interactable from 'react-native-interactable';


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


class BumpMainCard extends React.Component {

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


    render() {


        return (
            <View style={styles.cardContainer}>

                <View style={[{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }]}>

                    <View style={{flexDirection: 'row', paddingVertical: 20}}>
                        <View
                            style={[{
                                alignItems: 'center',
                            }, {transform: [{translateX: width * 0.08},]}]}
                        >
                            <Image style={styles.userPhoto}
                                   source={require('../../../../app/Assets/images/elon_musk.jpeg')}/>

                        </View>
                        <View
                            style={[{
                                alignItems: 'center'
                            }, {transform: [{translateX: -width * 0.08}]}]}
                        >
                            <Image style={styles.userPhoto}
                                   source={require('../../../../app/Assets/images/whitney_wolf.jpg')}/>

                        </View>
                    </View>
                    <View>
                        <MapView
                            style={{width: width, height: height * 0.15, borderRadius: 5}}
                            initialRegion={this.state.region}
                            region={this.state.region}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
        },
        userPhoto: {
            height: width * 0.1,
            width: width * 0.1,
            borderRadius: width * 0.3,
            alignSelf: 'flex-start'
        },
        titleText: {
            color: '#9A9CE0',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginHorizontal: 15,
            width: '100%'

        },
        subText: {
            textAlign: 'center',
            color: '#9A9CE0',
            marginTop: 4,
            marginHorizontal: 35,
            fontSize: 13,

        },
        inverseSubText: {
            color: 'white',
            textAlign: 'center',
            marginHorizontal: 20,
            fontSize: 15,
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
            marginBottom: 5,
            paddingVertical: 7,
            marginHorizontal: 5,
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    BumpMainCard
)
;
//
