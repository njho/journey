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

const SLIDE_IN_DOWN_KEYFRAMES = {
    from: {translateY: -10},
    to: {translateY: 0}
};

const SLIDE_IN_DOWN_KEYFRAMES_2 = {
    from: {translateY: -5},
    to: {translateY: 0},
};

const SLIDE_IN_DOWN_KEYFRAMES_3 = {
    from: {translateY: -10},
    to: {translateY: 0},

};

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;


const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    quoteMeta: state.auth.quoteMeta
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () => {
        dispatch({type: 'REDIRECT'});
    },
    fetchQuote: () => {
        dispatch(agent.FirebaseQuery.fetchQuote());
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
            community: 'Yoga',
            description: "Yogi's come join us here to celebrate our wonderful body",
            region: {
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            isRadiusInput: false,
            isTimeInput: false,
            radius: 300,
            expiryTime: '1D'
        };

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    ...this.state,
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

    }

    updateSize = (height) => {
        this.setState({
            height
        });
    }
    radiusToggle = (isRadiusInput) => {
        if (isRadiusInput) {
            this.scrollView.scrollTo({x: 0, y: 0, animated: true});
            this.setState({
                ...this.state,
                isRadiusInput: false
            })
        } else {
            this.scrollView.scrollTo({x: width, y: 0, animated: true});
            this.setState({
                ...this.state,
                isRadiusInput: true
            })
        }
    }

    timeToggle = (isTimeInput) => {
        if (isTimeInput) {
            this.setState({
                ...this.state,
                isTimeInput: false
            })
        } else {
            this.setState({
                ...this.state,
                isTimeInput: true
            })
        }
    }


    render() {
        console.log(this.state.formStatus);


        return (
            <View style={styles.container}>
                <View style={styles.section1}>
                    <View style={styles.subsection1}>

                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity style={styles.photoOpacity}>
                                <Image
                                    style={styles.photo}
                                    source={require('../../../app/Assets/images/yoga-teal-on-lake.jpg')}/>
                            </TouchableOpacity>
                            <Text style={styles.communityText}>{this.state.community}</Text>
                            <Text style={styles.descriptionText}>{this.state.description}</Text>
                        </View>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
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
                                {!this.state.isTimeInput ?

                                    <TimePicker></TimePicker>
                                    :

                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        <TouchableOpacity style={{
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
                                            onPress={() => this.timeToggle(this.state.isTimeInput)}
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
                                            <Text>{this.state.expiryTime}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            </View>
                            <View style={{width: width, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <Text style={{color: '#F0FFFF'}}>20 m </Text>
                                <Slider
                                    style={{width: width * 0.6}}
                                    maximumValue={500}
                                    minimumValue={20}
                                    step={10}
                                    value={this.state.radius}
                                    onValueChange={(value) => this.setState({...this.state, radius: value})}
                                />
                                <Text style={{color: '#F0FFFF'}}>{this.state.radius} m </Text>
                            </View>
                        </ScrollView>
                    </View>

                </View>
                <View style={styles.section2}>
                    <MapView
                        style={{flex: 1, bottom: 0}}
                        initialRegion={this.state.region}
                        customMapStyle={nighttimeMap}>
                        <MapView.Circle
                            center={{
                                latitude: 37.78875,
                                longitude: -122.4324,
                            }}
                            radius={this.state.radius}
                            fillColor="rgba(255, 109, 105, 0.6)"
                            zIndex={2}
                        />
                    </MapView>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 15,
                            marginBottom: 15,
                            left: 0,
                            bottom: 0
                        }}
                        onPress={() => this.radiusToggle(this.state.isRadiusInput)
                        }>
                        <Icon name="ios-disc" size={30} color="#F0FFFF"/><Text
                        style={{color: "#F0FFFF"}}> {this.state.isRadiusInput ? 'Back' : 'Radius'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{position: 'absolute', marginHorizontal: 15, marginBottom: 15, right: 0, bottom: 0}}>
                        <Icon name="ios-locate-outline" size={30} color="#F0FFFF"/>
                    </TouchableOpacity>
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
        justifyContent: 'flex-end'
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
        justifyContent: 'space-around'
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
