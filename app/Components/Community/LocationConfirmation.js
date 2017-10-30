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
    Picker
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import MapView from 'react-native-maps';

import agent from '../helpers/agent.js';
import {daytimeMap, nighttimeMap} from "../helpers/constants";
import TimePicker from './timePicker'

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const LATITUDE_DELTA = 0.0062;
const LONGITUDE_DELTA = 0.0021;


const mapStateToProps = state => ({
    locationMeta: state.communityReducer,
    isRadiusInput: state.communityReducer.isRadiusInput,
    duration: state.communityReducer.duration,
    radius: state.communityReducer.radius,
    communityName: state.communityReducer.communityName,
    description: state.communityReducer.description,
    region: state.communityReducer.region,
});

const mapDispatchToProps = dispatch => ({
    timeToggle: (value) => {
        dispatch({type: 'TIME_TOGGLE', isTimeInput: value});
    },
    radiusToggle: (value) => {
        dispatch({type: 'RADIUS_TOGGLE', isRadiusInput: value});
    },
    setRadius: (value) => {
        dispatch({type: 'SET_RADIUS', radius: value});
    },
    setRegion: (value) => {
        dispatch({type: 'SET_REGION', value: value})
    },
    setFormStatus: (value) => {
        dispatch({type: 'SET_FORM_STATUS', value: value})
    },
    confirmCommunity: (value) => {
        agent.locationService.addCommunity(value);
    }

});


class LocationCommunity extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,

            region: {
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            isRadiusInput: false,
            isTimeInput: false,
            radius: 70,
            expiryTime: '1D',
            indicatorPosition:  new Animated.Value(0)

    };

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

    }

    radiusToggle = (isRadiusInput) => {
        console.log(isRadiusInput);
        if (isRadiusInput) {
            this.scrollView.scrollTo({x: 0, y: 0, animated: true});
            this.props.radiusToggle(false);
            this.props.timeToggle(false);
        } else {
            this.scrollView.scrollTo({x: width, y: 0, animated: true});
            this.props.radiusToggle(true);
            this.props.timeToggle(false);
        }
    }

    timeToggle = (isTimeInput) => {
        if (isTimeInput) {
            this.props.timeToggle(false);
        } else {
            this.props.timeToggle(true);
        }
    }

    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    editInformation = (value) => {
        this.props.setFormStatus(value);
        this.props.navigator.resetTo({
            screen: 'locationCommunity'
        })
    }

    confirmCommunity = () => {

        Animated.timing(
            this.state.indicatorPosition,
            {
                toValue: 100,
                duration: 250,
            }
        ).start();
        // this.props.confirmCommunity(this.props.locationMeta);
        // this.props.navigator.resetTo({
        //     screen: 'neighborhoodDetected'
        // })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section1}>
                    <View style={styles.subsection1}>
                        <Animated.View style={[{alignItems: 'center'},{transform: [
                            {
                                translateX: this.state.indicatorPosition
                            }
                        ]}]}>
                            <TouchableOpacity style={styles.photoOpacity}>
                                <Image
                                    style={[styles.photo, ]}
                                    source={require('../../../app/Assets/images/yoga-teal-on-lake.jpg')}/>
                            </TouchableOpacity>
                            <TouchableWithoutFeedback onPress={() => this.editInformation(2)}>
                                <View>
                                    <Text style={styles.communityText}>{this.props.communityName}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.editInformation(4)}>
                                <View>
                                    <Text style={styles.descriptionText}>{this.props.description}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>

                    <View style={{display: 'flex', position: 'absolute', bottom: 0, flexDirection: 'row'}}>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            overScrollMode='never'
                            ref={(scrollView) => {
                                this.scrollView = scrollView;
                            }}
                            disabled={true}
                            scrollEnabled={false}
                        >

                            <View style={{width: width, justifyContent: 'center', flexDirection: 'row'}}>
                                {this.props.locationMeta.isTimeInput ?
                                    <TimePicker></TimePicker>
                                    :

                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        <TouchableOpacity
                                            onPress={() => this.confirmCommunity()}
                                            style={{
                                                borderColor: '#F0FFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 100,

                                                borderBottomLeftRadius: 100,
                                                borderTopLeftRadius: 100,
                                                borderWidth: 2,
                                                zIndex: 11,
                                                marginVertical: 30
                                            }}>
                                            <Text style={{color: '#F0FFFF'}}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.timeToggle(this.props.isTimeInput)}
                                            style={{
                                                borderColor: '#F0FFFF',
                                                backgroundColor: '#f0FFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 30,
                                                borderBottomRightRadius: 100,
                                                borderTopRightRadius: 100,
                                                borderWidth: 2,
                                                zIndex: 11,
                                                marginVertical: 30
                                            }}>
                                            <Text>{this.props.duration}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={{color: '#F0FFFF'}}> Set Activation Radius</Text>
                                <View style={{
                                    width: width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={{flexDirection: 'row', marginRight: 10}}
                                                      onPress={() => this.radiusToggle(this.props.isRadiusInput)}>
                                        <Icon name="ios-checkmark" size={40} color="#F0FFFF"/>
                                    </TouchableOpacity>
                                    <Slider
                                        style={{width: width * 0.6}}
                                        maximumValue={500}
                                        minimumValue={20}
                                        step={10}
                                        value={this.props.radius}
                                        onValueChange={(value) => this.props.setRadius(value)}
                                    />
                                    <Text style={{color: '#F0FFFF'}}>{this.state.radius} m </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                </View>
                <View style={styles.section2}>
                    <MapView
                        style={{flex: 1, bottom: 0}}
                        initialRegion={this.props.region}
                        region={this.props.region}
                        customMapStyle={nighttimeMap}
                    >
                        <MapView.Circle
                            center={{
                                latitude: this.props.region.latitude,
                                longitude: this.props.region.longitude
                            }}
                            radius={this.props.radius}
                            fillColor="rgba(255, 109, 105, 0.6)"
                            zIndex={2}
                        />
                    </MapView>
                    <View style={{position: 'absolute', flexDirection: 'column', bottom: 0, right: 0}}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 15,
                                marginBottom: 15,
                                left: 0,
                                bottom: 0
                            }}
                            onPress={() => this.radiusToggle(this.props.isRadiusInput)
                            }>
                            <Text
                                style={{color: "#F0FFFF"}}> {this.props.isRadiusInput ? 'Back ' : 'Radius'} </Text>

                            <Icon name="ios-disc" size={30} color="#F0FFFF"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{alignSelf: 'flex-end', marginHorizontal: 15, marginBottom: 15}}
                            onPress={() => this.getCurrentPosition()}

                        >
                            <Icon name="ios-locate-outline" size={30} color="#F0FFFF"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212C39',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    section1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 4,
        justifyContent: 'flex-start'
    },
    section2: {
        display: 'flex',
        width: '100%',
        flex: 2
    },
    subsection1: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    textInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionPrompt: {
        color: 'white',
        fontSize: 20,

    },
    placeholderText: {
        color: '#ff7b74',
        opacity: 0.8,
        textAlign: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    communityView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        width: width,
    },
    communityText: {
        textAlign: 'center',
        marginHorizontal: 30,
        marginTop: 10,
        color: '#F0FFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 40,
    },
    descriptionText: {
        marginVertical: 20,
        textAlign: 'center',
        marginHorizontal: 60,
        color: '#F0FFFF',
        fontFamily: 'Roboto',
        fontSize: 15,
        justifyContent: 'center'
    },
    titleView: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    titleText: {
        marginHorizontal: 40,
        color: 'white',
        textAlign: 'center',
        fontSize: 24
    },
    subText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    miniText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12
    },
    photoOpacity: {
        marginTop: 20,
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: width * 0.27,
        width: width * 0.27,
        borderRadius: width * 0.5,
        backgroundColor: '#F0FFFF',
    },
    photo: {

        height: width * 0.25,
        width: width * 0.25,
        borderRadius: width * 0.3,
    },
    farNeighborOpacity: {
        marginHorizontal: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: width * 0.18,
        width: width * 0.18,
        borderRadius: width * 0.18,
        backgroundColor: '#b6e0f1'

    },
    farNeighborPhoto: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.15,
    },
    hello: {
        top: width * 0.3,
        right: -15,
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationCommunity);
