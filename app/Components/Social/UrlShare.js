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
    StatusBar
} from 'react-native';

import {NativeModules} from 'react-native';


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

class UrlShare extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            lead_image_url: null,
            url: null
        }
    }

    // async componentDidMount() {
    //     await fetch('https://mercury.postlight.com/parser?url=https://stackoverflow.com/questions/47524180/highchart-coloring-area-based-on-plotline-xaxis-and-yaxis', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'x-api-key': 'oBv5iYSdB2eY1wUwMBvWbmDjEQLrHmYCz83uJJ34'
    //         }),
    //     }).then((response) => {
    //         response.json().then((data) => {
    //             console.log(data.title);
    //             console.log(data.url)
    //         });
    //     })
    // }

    componentDidMount() {
        NativeModules.WebUrl.getUrl((url) => {
            console.log(url);

            if (url === null) {

            } else {
                this.setState({...this.state, url: url});
                console.log(url);
                this.fetchWebInfo(url)
                ;

            }

        })


    }

    fetchWebInfo(url) {
        console.log(url);
        fetch('https://mercury.postlight.com/parser?url=' + url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-api-key': 'oBv5iYSdB2eY1wUwMBvWbmDjEQLrHmYCz83uJJ34'
            }),
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(response)
                this.setState({
                    ...this.state,
                    title: data.title,
                    url: data.url,
                    lead_image_url: data.lead_image_url
                })
            });
        });

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    {this.state.lead_image_url === null ? null :
                        <Image
                            style={{flex: 1, width: null, height: null,}}
                            source={{uri: this.state.lead_image_url}}/>
                    }
                    {this.state.title === null ? <Text></Text> :
                        <View style={{margin: 5}}>
                        <Text style={styles.mainTitle}>{this.state.title}</Text>
                        </View>
                    }

                </View>
                <Text style={[styles.mainTitle, {marginTop: 30}]}>Please Add this to a Journey</Text>

            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        width: width,
        flexDirection: 'column',
    },
    cardContainer: {
        backgroundColor: 'white',
        elevation: 10,
        width: width * 0.8,
        height: height * 0.4,
        borderRadius: 5,

    },
    mainTitle: {
        color: '#4b4b4b',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 15,
    },

    subText: {
        marginHorizontal: 10,
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 14
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(UrlShare);