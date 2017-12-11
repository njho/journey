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
    Share,
    Picker,
    Platform,
    DeviceEventEmitter,
    StatusBar,
    Alert
} from 'react-native';

import { NativeModules } from 'react-native';
import { getTagId, readTag, writeTag } from 'nfc-react-native'





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

    readTagId() {
        getTagId()
    }

    readTagData() {
        readTag([
            { sector: 1, blocks: [1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
            { sector: 2, blocks: [0,1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
            { sector: 3, blocks: [0], clave: 'FFFFFFFFFFFF', keyType: 'A' }
        ])
    }

    writeTagData() {
        Alert.alert('I have no idea');

        writeTag([{ sector: 1, blocks: [
            { index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
            { index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
            clave: 'FFFFFFFFFFFF', keyType: 'A' },
            { sector: 2, blocks: [
                { index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
                { index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
                { index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
                clave: 'FFFFFFFFFFFF', keyType: 'A' },
            { sector: 3, blocks: [
                { index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
                clave: 'FFFFFFFFFFFF', keyType: 'A' },
        ], 1148002313)
    }

    constructor(props) {
        super(props);
        this.state = {
            animation: 1,
            progress: new Animated.Value(0),
        }

    }

    componentDidMount() {
        this.scan.play();
        DeviceEventEmitter.addListener('onTagError', function (e) {
            console.log('error', e)
            Alert.alert(JSON.stringify(e))
        })

        DeviceEventEmitter.addListener('onTagDetected', function (e) {
            Alert.alert(JSON.stringify(e))
        })

        DeviceEventEmitter.addListener('onTagRead', (e) => {
            console.log('reading', e)
            Alert.alert(JSON.stringify(e))
        })

        DeviceEventEmitter.addListener('onTagWrite', (e) => {
            console.log('writing', e)
            Alert.alert(JSON.stringify(e))
        })
    }


    animateSuccess = () => {
        this.setState({...this.state, animation: 2});
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
        }).start(() => {
            this.props.navigator.push({screen: 'bumpConfirmation'})
        })
    }




    render() {
        return (
            <View style={styles.container}>

                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Welcome to React Native!
                    </Text>
                    <Button
                        onPress={this.readTagId}
                        title="Get id of Tag"
                    />
                    <Button
                        onPress={this.readTagData}
                        title="Get sectors of a Tag"
                    />
                    <Button
                        onPress={this.writeTagData}
                        title="Write sectors of a Tag"
                    />
                </View>
                <TouchableOpacity style={styles.bumpButton} onPress={() => {
                    this.animateSuccess()

                }}>
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
                            loop={true}
                            source={require('../../Assets/lottie/lottieFile.json')}
                        /> : <Animation
                            ref={animation => {
                                this.bump = animation;
                            }}
                            style={{
                                position: 'absolute',
                                width: width * 0.75,
                                height: width * 0.75,
                            }}
                            progress={this.state.progress}
                            source={require('../../Assets/lottie/done.json')}/>}

                </TouchableOpacity>
                {
                    this.state.animation === 1 ?
                        <Text style={{marginTop: 20, color: 'white'}}>Waiting on Bump...</Text> :
                        <Text style={{marginTop: 20}}></Text>
                }
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