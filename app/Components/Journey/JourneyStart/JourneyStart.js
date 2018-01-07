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
import ImageResizer from 'react-native-image-resizer';
import {geoPath, geoMercator} from 'd3-geo';
import Svg, {
    Circle,
    Ellipse,
    G,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import OpenTok from 'react-native-opentok';
import MapView, {MAP_TYPES} from 'react-native-maps';
import Animation from 'lottie-react-native';

import BackgroundGeolocation from "react-native-background-geolocation";
import DeviceInfo from 'react-native-device-info';
import HeaderTitle from '../../Generic/ListComponents/HeaderTitle';
import ListItem from '../../Generic/ListComponents/ListItem';
import JourneyPicker from '../../Generic/ListComponents/JourneyPicker';


const TRACKER_HOST = 'http://tracker.transistorsoft.com/locations/';


const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.1;

const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;

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


class JourneyStart extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.eventId = 1;

        this.state = {
            enabled: false,
            isMoving: false,
            username: 'njho28',
            events: []
        };
    }

    componentDidMount() {
        // Step 1:  Listen to events:
        BackgroundGeolocation.on('location', this.onLocation.bind(this));
        BackgroundGeolocation.on('motionchange', this.onMotionChange.bind(this));
        BackgroundGeolocation.on('activitychange', this.onActivityChange.bind(this));
        BackgroundGeolocation.on('providerchange', this.onProviderChange.bind(this));
        BackgroundGeolocation.on('powersavechange', this.onPowerSaveChange.bind(this));
        BackgroundGeolocation.on('http', this.onHttp.bind(this));
        BackgroundGeolocation.on('heartbeat', this.onHeartbeat.bind(this));

        // Step 2:  #configure:
        BackgroundGeolocation.configure({
            distanceFilter: 10,
            stopOnTerminate: false,
            startOnBoot: true,
            foregroundService: true,
            url: TRACKER_HOST + this.state.username,
            params: {
                // Required for tracker.transistorsoft.com
                device: {
                    uuid: DeviceInfo.getUniqueID(),
                    model: DeviceInfo.getModel(),
                    platform: DeviceInfo.getSystemName(),
                    manufacturer: DeviceInfo.getManufacturer(),
                    version: DeviceInfo.getSystemVersion(),
                    framework: 'ReactNative'
                }
            },
            autoSync: true,
            debug: true,
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE
        }, (state) => {
            console.log('- Configure success: ', state);
            this.setState({
                enabled: state.enabled,
                isMoving: state.isMoving
            });
        });
    }

    /**
     * @event location
     */
    onLocation(location) {
        console.log('[event] location: ', location);
        this.addEvent('location', new Date(location.timestamp), location);
    }

    /**
     * @event motionchange
     */
    onMotionChange(event) {
        console.log('[event] motionchange: ', event.isMovign, event.location);
        this.setState({
            isMoving: event.isMoving
        });
        this.addEvent('motionchange', new Date(event.location.timestamp), event.location);
    }

    /**
     * @event activitychange
     */
    onActivityChange(event) {
        console.log('[event] activitychange: ', event);
        this.addEvent('activitychange', new Date(), event);
    }

    /**
     * @event providerchange
     */
    onProviderChange(event) {
        console.log('[event] providerchange', event);
        this.addEvent('providerchange', new Date(), event);
    }

    /**
     * @event powersavechange
     */
    onPowerSaveChange(isPowerSaveMode) {
        console.log('[event] powersavechange', isPowerSaveMode);
        this.addEvent('powersavechange', new Date(), {isPowerSaveMode: isPowerSaveMode});
    }

    /**
     * @event heartbeat
     */
    onHttp(response) {
        console.log('[event] http: ', response);
        this.addEvent('http', new Date(), response);
    }

    /**
     * @event heartbeat
     */
    onHeartbeat(event) {
        console.log('[event] heartbeat: ', event);
        this.addEvent('heartbeat', new Date(), event);
    }

    onToggleEnabled(value) {
        let enabled = !this.state.enabled;
        this.setState({
            enabled: enabled,
            isMoving: false
        });
        if (enabled) {
            BackgroundGeolocation.start();
        } else {
            BackgroundGeolocation.stop();
        }
    }

    onClickGetCurrentPosition() {
        BackgroundGeolocation.getCurrentPosition((location) => {
            console.log('- getCurrentPosition success: ', location);
        }, (error) => {
            console.warn('- getCurrentPosition error: ', error);
        }, {
            persist: true,
            samples: 1,
            maximumAge: 5000
        });
    }

    onClickChangePace() {
        console.log('- onClickChangePace');
        let isMoving = !this.state.isMoving;
        this.setState({isMoving: isMoving});
        BackgroundGeolocation.changePace(isMoving);
    }

    onClickClear() {
        this.setState({events: []});
    }

    switchToggled(item, value) {
        switch (item) {
            case 'locationOnly':
                this.setState({
                    ...this.state,
                    locationOnly: value
                });
                console.log('I am in here!');
                break;
            case 'distance':
                this.setState({
                    ...this.state,
                    distance: value
                });
                break;
            case 'altitude':
                this.setState({
                    ...this.state,
                    altitude: value
                });
                break;
        }
    }

    pickerToggled(item, value) {
        switch (item) {
            case 'locationOnly':
                this.setState({
                    ...this.state,
                    locationOnly: value
                });
                console.log('I am in here!');
                break;
            case 'distance':
                this.setState({
                    ...this.state,
                    distance: value
                });
                break;
            case 'altitude':
                this.setState({
                    ...this.state,
                    altitude: value
                });
                break;
        }
    }


    /**
     * Add an event to list
     */
    addEvent(name, date, object) {
        let event = {
            key: this.eventId++,
            name: name,
            timestamp: date.toLocaleTimeString(),
            json: JSON.stringify(object, null, 2)
        };
        let rs = this.state.events;
        rs.unshift(event);
        this.setState({
            events: rs
        });
    }

    renderEvents() {
        return this.state.events.map((event) => (
            <View key={event.key} style={styles.listItem}>
                <View style={styles.itemHeader}>
                    <View style={{flex: 1}}><Text style={styles.eventName}>[event] {event.name}</Text></View>
                    <View><Text style={styles.eventTimestamp}>{event.timestamp}</Text></View>
                </View>
                <View><Text style={styles.eventJson}>{event.json}</Text></View>
            </View>
        ));
    }

    render() {
        return (
            <LinearGradient colors={['#5ab7ff', '#863fe8']} style={{flex: 1}}>
                <ScrollView style={{flex: 1,}}
                            contentContainerStyle={{flexGrow: 1,}}>

                    <HeaderTitle title={'BROADCAST SETTINGS'} fontSize={11}/>
                    <ListItem title={'Capture Interval'} fontSize={14} style={{marginVertical: 1}}
                              picker
                              pickerValues={['1 min', '3 min', '5 min', '10 min', '30 min', '1 hr', ]}
                              callback={(value) => {
                                  return this.pickerToggled('captureInterval', value)
                              }}/>
                    <ListItem title={'Location Only'} fontSize={14} style={{marginVertical: 1}} switch
                              callback={(value) => {
                                  return this.switchToggled('locationOnly', value)
                              }}/>
                    <ListItem title={'Broadcast Type'} fontSize={14} style={{marginVertical: 1}} picker
                              default={'live'}
                              pickerValues={['Live', 'Cached']}
                              callback={(value) => {
                                  return this.pickerToggled('broadcastType', value)
                              }}/>
                    <ListItem title={'Privacy Setting'}
                              fontSize={14}
                              style={{marginVertical: 1}}
                              picker
                              default={'public'}
                              pickerValues={['Public', 'Private']}
                              callback={(value) => {
                                  return this.pickerToggled('privacy', value)
                              }}
                    />

                    <HeaderTitle title={'INFORMATION CAPTURE'} fontSize={11} style={{marginVertical: 2}}/>
                    <ListItem title={'Distance'} fontSize={14} style={{marginVertical: 1}} switch callback={(value) => {
                        return this.switchToggled('distance', value)
                    }}/>
                    <ListItem title={'Altitude'} fontSize={14} style={{marginVertical: 1}} switch callback={(value) => {
                        return this.switchToggled('altitude', value)
                    }}/>
                    <Text
                        style={{
                            marginVertical: 10,
                            marginTop: 20,
                            marginHorizontal: 20,
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'white',
                        }}>CHOOSE A JOURNEY</Text>
                    <View style={{
                        width: width,
                        justifyContent: 'space-between',
                        marginVertical: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: 20
                        }}>

                            <TouchableOpacity style={{alignSelf: 'center', paddingBottom: 20}}>
                                <View style={{
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    width: width / 2 - 30,
                                    borderRadius: 40
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        color: 'white',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        textAlign: 'center'
                                    }}>Existing journey</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignSelf: 'center', paddingBottom: 20}}>
                                <View style={{
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    width: width / 2 - 30,
                                    borderRadius: 40
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        color: 'white',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        textAlign: 'center'
                                    }}>New Journey</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={{marginVertical: 20, width: '80%', alignSelf: 'center'}}>
                        <Text style={{width: '100%', color: 'white', textAlign: 'center', fontSize: 15}}>Not Quite the
                            Right
                            Experience?</Text>
                        <Text style={{width: '100%', color: 'white', textAlign: 'center', fontSize: 12}}>Let us know
                            what
                            would make your Journey
                            more valuable!</Text>
                    </View>


                    <TouchableOpacity style={{alignSelf: 'center', paddingBottom: 20}}>
                        <View style={{borderColor: 'white', borderWidth: 1, borderRadius: 40}}>
                            <Text style={{fontSize: 16, color: 'white', paddingHorizontal: 30, paddingVertical: 10}}>START
                                JOURNEY</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </LinearGradient>


        );
    }

    /**
     * Navigate back to home-screen app-switcher
     */
    onClickHome() {
        App.goHome(this.props.navigation);
    }
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: '#fedd1e'
    },
    title: {
        color: '#000'
    },
    listItem: {
        marginBottom: 10
    },
    itemHeader: {
        backgroundColor: '#D5B601',
        padding: 5
    },
    eventName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    eventTimestamp: {
        fontSize: 12
    },
    eventJson: {
        fontFamily: 'Courier New',
        fontSize: 12,
        color: '#e6db74'
    },
    footer: {
        backgroundColor: '#fedd1e',
        paddingLeft: 10,
        paddingRight: 10
    },
    footerBody: {
        justifyContent: 'center'
    },
    icon: {
        color: '#fff'
    },
    availableJourneys: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 15,
        color: '#4D81C2'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)

(
    JourneyStart
)
;
// //
//
//
// <View style={styles.container}>
//     <View style={styles.header}>
//         <Button small transparent title="backarrow" onPress={this.onClickHome.bind(this)}>
//         </Button>
//         <Text style={styles.title}>Hello World</Text>
//         <Switch onValueChange={() => this.onToggleEnabled()} value={this.state.enabled}/>
//     </View>
//
//     <View style={styles.list}>
//         {this.renderEvents()}
//     </View>
//
//     <View style={styles.footer}>
//         <Button small info title="navigate button"/>
//
//         <Button small danger bordered onPress={this.onClickClear.bind(this)} title="trash"/>
//
//         <Button small title="pause/play" danger={this.state.isMoving} success={!this.state.isMoving}
//                 onPress={this.onClickChangePace.bind(this)}/>
//
//
//     </View>
// </View>