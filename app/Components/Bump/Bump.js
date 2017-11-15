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

// const connectToSession = async () => {
//     try {
//         await OpenTok.connect(sessionId, token);
//     } catch (e) {
//         console.log(e)
//         console.log('wtf');
//     }
// }

class Bump extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            animation: 1,
        }

    }

    componentDidMount() {
        this.scan.play()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.bumpButton} onPress={() => {this.setState({ ...this.state, animation: 2});setTimeout(() => {this.bump.play()}, 2)
                }
                }>
                    {this.state.animation === 1 ?
                        <Animation
                            ref={animation => {
                                this.scan = animation;
                            }}
                            style={{
                                position: 'absolute',
                                width: width * 0.5,
                                height: width * 0.5,
                            }}
                            loop = {true}
                            source={require('../../Assets/lottie/lottieFile.json')}
                        /> :  <Animation
                            ref={animation => {
                                this.bump = animation;
                            }}
                            style={{
                                position: 'absolute',
                                width: width * 0.75,
                                height: width * 0.75,
                            }}
                            source={require('../../Assets/lottie/done.json')}/>}

                </TouchableOpacity>
                {this.state.animation ===1 ? <Text style={{marginTop: 20, color: 'white'}}>Waiting on Bump...</Text> : <Text style={{marginTop: 20}}></Text>}
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#716cff',
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        width: width,
        flexDirection: 'column',
    },
    bumpButton: {
        backgroundColor: 'white',
        borderColor: '#4846a6',
        elevation: 10,
        borderWidth: 15,
        marginHorizontal: 5,
        borderRadius: width * 0.7,
        width: width * 0.7,
        height: width * 0.7,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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


export default connect(mapStateToProps, mapDispatchToProps)(Bump);