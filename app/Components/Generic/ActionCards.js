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
import { Navigation } from 'react-native-navigation';


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

                <View style={styles.card}>
                    <LinearGradient colors={[ '#fbf9ff', '#fbf9ff','#fbf9ff','#fbf9ff','#fbf9ff','#fbf9ff','#fbf9ff','#fbf9ff','#fbf9ff', '#fbf9ff', '#fbf9ff','#fbf9ff','#fbf9ff', '#d8d5db']} start={{x: 0, y: .50}} end={{x: 1, y: .50}}
                                    style={{
                                        borderRadius: 10,
                                        alignSelf: 'flex-start',
                                        flex: 1,
                                        alignItems: 'center'
                                    }}>
                        <View style={{
                            width: '100%',
                            height: 10,
                            backgroundColor: this.props.color,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            top: 0,
                            position: 'absolute',

                        }}/>
                        <View style={{marginTop: 30}}>
                            <View style={{
                                width: width / 6.5,
                                height: width / 6.5,
                                backgroundColor: 'white',
                                borderRadius: width / 6.5,
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                                <View style={{
                                    opacity: 0.7,
                                    width: width / 8,
                                    height: width / 8,
                                    backgroundColor: this.props.color,
                                    borderRadius: width / 8,
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}>
                                    <Text>
                                        <Icon name={this.props.icon} style={{color: 'white'}} size={25}/>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Text style={styles.mainTitle}>{this.props.actionTitle}</Text>
                                <Text style={styles.subText}>{this.props.actionSubtext}</Text>

                            </View>
                        </View>
                        <View style={{marginBottom: 30}}></View>
                    </LinearGradient>
                </View>


        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fbf9ff',
        marginHorizontal: 5,
        borderRadius: 10,
        width: width / 2.5,
        height: width * 0.6,
        elevation: 4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainTitle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 15,
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


export default connect(mapStateToProps, mapDispatchToProps)(ActionCards);