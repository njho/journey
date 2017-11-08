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
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import Animation from 'lottie-react-native';

import {theme} from "../helpers/constants";

import LocationCommunityCard from './LocationCommunityCard';


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


class Locations extends React.Component {
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
            indicatorPosition: new Animated.Value(0),
            damping: 1 - 0.6,
            tension: 300

        };
        this._deltaX = new Animated.Value(0);

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // this.props.setRegion({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     latitudeDelta: LATITUDE_DELTA,
                //     longitudeDelta: LONGITUDE_DELTA
                // })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        this.whale.play();


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

        this.props.confirmCommunity(this.props.locationMeta);
        this.props.navigator.resetTo({
            screen: 'neighborhoodDetected'
        })
    }



    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#FB704B', '#FE4C64']} style={{flex: 1, width: '100%'}}>
                    <ScrollView>
                        <View style={{height: height * 0.17}}/>

                        <LocationCommunityCard name={"Calgary Annual Yoga Workshop"} host={"Yoga Calgary"} time={"30:01"} distance={30}/>
                        <LocationCommunityCard name={"Phil & Sebastians"} host={"Phil & Sebastian"} time={"4D:03H"} distance={50}/>
                        <View style={{height: 130}}>
                            <Animation
                                ref={animation => {
                                    this.whale = animation;
                                }}
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                                loop={true}
                                source={require('../../Assets/lottie/empty_status.json')}
                            />
                            <View style={{width: 30}}></View>
                        </View>

                    </ScrollView>
                    <ActionButton
                        buttonColor="rgba(253,120,70,1)"
                        onPress={() => {
                            console.log("hi")
                        }}
                        icon={<Icon name="ios-locate-outline" size={30} style={{color: 'white'}}/>}
                        offsetY={60}
                        fixNativeFeedbackRadius={true}
                    >
                        <Text>dfa</Text>
                    </ActionButton>
                    <View style={styles.littleExtra}/>


                </LinearGradient>
            </View>

        );
    }
}

//<Text style={styles.infoText}>30:01</Text>
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorMap.locations.backgroundColor,
        flex: 1,
        width: '100%',
    },
    littleExtra: {
        position: 'absolute',
        bottom: 30,
        right: 30+56/2-10,
        borderRadius: 20,
        width: 15,
        height: 15,
        backgroundColor: '#FD7846',
        elevation: 5
     }

});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
