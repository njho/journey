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

class Banner extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flex: 1, width: width, height: height}}>

                    <Text style={styles.mainTitle}>Near You Now</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>


                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            backgroundColor: '#33416f',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: 27,
                                height: 27,
                                borderRadius: 27,
                                backgroundColor: '#32406d',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                    backgroundColor: '#242E4E',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="ios-pin-outline" style={{color: 'white'}} size={15}/>
                                </View>
                            </View>
                        </View>
                        <Text style={{color: 'white', paddingLeft: 10}}>
                            Madison Square Gardens
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{marginBottom: 20}}>
                    <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}} end={{x: 1, y: .50}}
                                    style={{borderRadius: 5, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="ios-analytics-outline" style={{color: 'white', marginLeft: 20, marginRight: 10}} size={20}/>
                        <Text style={{color: 'white', marginVertical: 10, marginRight: 20, fontSize: 14}}>
                            View More</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fbfffd',
        marginHorizontal: 5,
        borderRadius: 10,
        width: width / 2.5,
        height: width * 0.6,
        elevation: 4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 5,
    },
    actionTitle: {
        textAlign: 'center',
        marginHorizontal: 30,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },

    subText: {
        marginHorizontal: 10,
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 14
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(Banner);