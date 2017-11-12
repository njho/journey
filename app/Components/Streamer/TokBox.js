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
    locationMeta: state.communityReducer
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

const connectToSession = async () => {
    try {
        await OpenTok.connect(sessionId, token);
    } catch (e) {
        console.log(e)
        console.log('wtf');
    }
}

class Locations extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            visible: 1,
            messages: [
                {
                    _id: 1,
                    text: 'She is so hot',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        };
    }

    async componentWillMount() {
        /*        await OpenTok.connect(sessionId, token);
                OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
                OpenTok.on(OpenTok.events.ON_SESSION_DID_CONNECT, e=> console.log('did connect'));*/
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            ...this.state,
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderView(visible) {
        switch (visible) {
            case 1:
                return (
                    <MapView
                        style={{flex: 1, bottom: 0}}
                        initialRegion={this.state.region}
                        region={this.state.region}
                        customMapStyle={theme.map}>
                        <MapView.Circle
                            center={{
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude
                            }}
                            radius={20}
                            fillColor="rgba(255, 109, 105, 0.6)"
                            zIndex={2}
                        />
                    </MapView>)
                break;

            case 2:
                return (
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        loadEarlier={true}
                        renderAvatar={null}
                        keyboardShouldPersistTaps={'handled'}
                    />
                )
                break;

            case 3:
                return (
                    <View style={{flex: 1}}>
                        <Text>Blanks</Text>
                    </View>
                )
            break;

        }

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section1}>
                    <Image style={styles.subscriberView}
                           source={require('../../../app/Assets/images/backstage.jpg')}
                           resizeMode="stretch"
                    />

                </View>

                <View style={styles.section2}>
                    <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={styles.block}
                                          onPress={() => this.setState({...this.state, visible: 2})}>
                            <Icon name="ios-chatboxes-outline" size={25}
                                  color={theme.colorMap.locationConfirmation.mapOutlines}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.block}
                                          onPress={() => this.setState({...this.state, visible: 1})}>
                            <Icon name="ios-map-outline" size={25}
                                  color={theme.colorMap.locationConfirmation.mapOutlines}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.block}>
                            <Icon name="ios-walk-outline" size={25}
                                  onPress={() => this.setState({...this.state, visible: 3})}
                                  color={theme.colorMap.locationConfirmation.mapOutlines}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.block}
                            onPress={() => agent.Streamer.createSession()}
                        >
                            <Icon name="ios-analytics-outline" size={25}
                                  color={theme.colorMap.locationConfirmation.mapOutlines}/>

                        </TouchableOpacity>

                    </View>
                    <View style={{flex: 3}}>
                        {this.renderView(this.state.visible)}
                    </View>


                </View>
            </View>
        );
    }
}

//<Text style={styles.infoText}>30:01</Text>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        backgroundColor: '#3E474F',
    },
    section1: {
        flex: 1,

    },
    section2: {
        flex: 1,
        flexDirection: 'row',
        height: height / 2
    },
    block: {
        width: height / 2 / 7,
        height: height / 2 / 4,
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subscriberView: {
        width: width,
        height: (height - StatusBar.currentHeight) / 2

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Locations);
/*<OpenTok.SubscriberView
    style={{width: 100, height:100}}
    sessionId={sessionId}
    onSubscribeStop={() => { console.log('stopped')}}
/>
<OpenTok.PublisherView
style={{width: 100, height:100}}
sessionId={sessionId}
onPublishStart={() => { console.log('started')}}
/>*/

/*    <MapView
                        style={{flex: 1, bottom: 0}}
                        initialRegion={this.state.region}
                        region={this.state.region}
                        customMapStyle={theme.map}
                    >
                        <MapView.Circle
                            center={{
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude
                            }}
                            radius={20}
                            fillColor="rgba(255, 109, 105, 0.6)"
                            zIndex={2}
                        />
                    </MapView>*/

/*       <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={styles.block}>
                            <Icon name="ios-chatboxes-outline" size={25} color={theme.colorMap.locationConfirmation.mapOutlines}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.block}>
                            <Icon name="ios-map-outline" size={25} color={theme.colorMap.locationConfirmation.mapOutlines}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.block}>
                            <Icon name="ios-walk-outline" size={25} color={theme.colorMap.locationConfirmation.mapOutlines}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.block}>
                            <Icon name="ios-analytics-outline" size={25} color={theme.colorMap.locationConfirmation.mapOutlines}/>

                        </TouchableOpacity>

                    </View>
*/