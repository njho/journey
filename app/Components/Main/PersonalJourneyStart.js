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
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';
import MapView from 'react-native-maps';


import PriceMarker from '../helpers/PriceMarkers'
import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';
import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';
import FadeInView from "../helpers/FadeInView";


import agent from '../helpers/agent.js';
import {daytimeMap, nighttimeMap} from "../helpers/constants";
import wrapWords from '../helpers/quoteParser';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const LATITUDE_DELTA = 0.0062;
const LONGITUDE_DELTA = 0.0021;


const mapStateToProps = state => ({
    communityName: state.communityReducer.communityName,
    description: state.communityReducer.description,
    farthestBeen: state.communityReducer.farthestBeen,
    formStatus: state.communityReducer.formStatus

});

const mapDispatchToProps = dispatch => ({
    setCommunityName: (value) => {
        dispatch({type: 'SET_COMMUNITY_NAME', value: value});
    },
    setDescription: (value) => {
        dispatch({type: 'SET_DESCRIPTION', value: value});
    },
    setFarthestBeen: (value) => {
        dispatch({type: 'SET_FARTHEST_BEEN', value: value})
    },
    setFormStatus: (value) => {
        dispatch({type: 'SET_FORM_STATUS', value: value})
    },
    setRegion: (value) => {
        dispatch({type: 'SET_REGION', value: value})
    }
});


class LocationCommunity extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        let indicatorPositionCalc = () => {
            let textEntryWidth = 0;
            let textEntryHeight = 0;
            let textEntryRadius = 0;
            switch (props.formStatus) {
                case 2:
                    textEntryWidth = width * 0.75;
                    textEntryHeight = 40;
                    textEntryRadius = 10;

                    break;
                case 4:
                    textEntryWidth = width * 0.8;
                    textEntryHeight = 80;
                    textEntryRadius = 10;

                    break;
                default:
                    textEntryWidth = 30;
                    textEntryHeight = 30;
                    textEntryRadius = 30;
            }
            return {textEntryHeight, textEntryWidth, textEntryRadius};

        }

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            community: '',
            description: '',
            playing: false,
            loop: props.formStatus === 0,
            textEntryWidth: new Animated.Value(indicatorPositionCalc().textEntryWidth),
            textEntryHeight: new Animated.Value(indicatorPositionCalc().textEntryHeight),
            textEntryRadius: new Animated.Value(indicatorPositionCalc().textEntryRadius),
            region: {
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            formStatus: props.formStatus,
            farthestBeen: 0,
            radius: 300

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
        if (this.props.formStatus === 0) {
        } else {
        }


    }

    click() {
        this.setState({
            ...this.state,
            loop: false
        })
    }

    setFormStatus(value, farthestSlide) {
        var farthestBeen;
        if (farthestSlide > 4) {
            farthestBeen = farthestSlide;
        } else {
            farthestBeen = value;
        }

        switch (value) {
            case 1: {

                //Changes to Create a Connection Prompt
                this.setState({
                    ...this.state,
                    loop: false,
                    formStatus: 1,
                    farthestBeen: farthestBeen
                })
                Animated.parallel([Animated.timing(
                    this.state.textEntryWidth,
                    {
                        toValue: width * 0.7,
                        duration: 250,
                    }),
                    Animated.timing(
                        this.state.textEntryHeight,
                        {
                            toValue: 40,
                            duration: 250,
                        }
                    )]).start()
                break;
            }
            case 2: {
                //Changes to Zone Identifier Entry

                this.setState({
                    ...this.state,
                    formStatus: value,
                    farthestBeen: farthestBeen
                })
                Animated.parallel([
                    Animated.timing(
                        this.state.textEntryWidth,
                        {
                            toValue: width * 0.75,
                            duration: 250,
                        }),
                    Animated.timing(
                        this.state.textEntryHeight,
                        {
                            toValue: 40,
                            duration: 250,
                        }
                    ),
                    Animated.timing(
                        this.state.textEntryRadius,
                        {
                            toValue: 10,
                            duration: 250,
                        }
                    )]).start()

                break;
            }
            case 3: {
                //Changes to Description Button or go Back to the end of the form Submission
                console.log('I am in here');

                this.setState({
                    ...this.state,
                    formStatus: farthestBeen > value ? farthestBeen : value,
                    farthestBeen: farthestBeen
                })
                if (farthestBeen > value) {
                    Animated.parallel([Animated.timing(
                        this.state.textEntryWidth,
                        {
                            toValue: 0,
                            duration: 250,
                        }),
                        Animated.timing(
                            this.state.textEntryHeight,
                            {
                                toValue: 0,
                                duration: 250,
                            }
                        )]).start()
                } else {
                    Animated.parallel([Animated.timing(
                        this.state.textEntryWidth,
                        {
                            toValue: width * 0.5,
                            duration: 250,
                        }),
                        Animated.timing(
                            this.state.textEntryRadius,
                            {
                                toValue: 30,
                                duration: 250,
                            }
                        )]).start()
                }

                break;
            }
            case 4: {
                //This is the Description Entry
                this.setState({
                    ...this.state,
                    formStatus: value,
                    farthestBeen: farthestBeen
                })
                Animated.parallel([Animated.timing(
                    this.state.textEntryWidth,
                    {
                        toValue: width * 0.8,
                        duration: 250,
                    }),
                    Animated.timing(
                        this.state.textEntryHeight,
                        {
                            toValue: 90,
                            duration: 250,
                        }
                    ), Animated.timing(
                        this.state.textEntryRadius,
                        {
                            toValue: 10,
                            duration: 250,
                        }
                    )]).start()
                break;
            }
            case 5:
                //This is the disappearing of everything

                this.setState({
                    ...this.state,
                    formStatus: value,
                    farthestBeen: farthestBeen
                })
                Animated.parallel([Animated.timing(
                    this.state.textEntryWidth,
                    {
                        toValue: 0,
                        duration: 250,
                    }),
                    Animated.timing(
                        this.state.textEntryHeight,
                        {
                            toValue: 0,
                            duration: 250,
                        }
                    )]).start(
                    () => {
                        this.props.navigator.resetTo({
                            screen: 'locationConfirmation'
                        })
                    })
        }
    }

    textHandler(value, text) {
        switch (value) {
            case 2:
                this.props.setCommunityName(text);
                break;

            case 4:
                this.props.setDescription(text);
                break;
        }
    }

    updateSize = (height) => {
        this.setState({
            height
        });
    }


    render() {
        console.log(this.state.formStatus);


        return (
            <View style={styles.container}>
                <LinearGradient colors={['#210c2b', '#210c2b']} style={{flex: 1, alignItems: 'center', width: '100%'}}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Interesting,
                            that this Journey should start here</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Tell me, what is the name of
                            this Journey?</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>And why is this
                            important?</Text>

                        <Text style={{color: 'white', fontSize: 20, fontWeight: '300'}}>Or maybe, it's just for fun?</Text>


                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Please tag yours to help others contribute.</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Interesting, it seems like
                            similar Journey's have led individuals to:</Text>


                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Would you like to include anyone in this genesis?</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Excellent. Remember, Journey is a tool to help others find you. Moments captured in Journey can be reconstructed throughout time. Your Journey starts now.</Text>



                    </View>


                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210c2b',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    section1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end'

    },
    section2: {
        display: 'flex',
        width: '100%',
        flex: 1
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
        marginHorizontal: 30,
        marginTop: 50,
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 40,
    },
    descriptionText: {
        textAlign: 'center',
        marginHorizontal: 30,
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 20,
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
    userOpacity: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: width * 0.5,
        width: width * 0.5,
        borderRadius: width * 0.5,
        backgroundColor: '#b0d9ea',
    },
    neighborOpacity: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: width * 0.5,
        width: width * 0.5,
        borderRadius: width * 0.5,
        backgroundColor: '#acd4e5',
    },
    userPhoto: {
        height: width * 0.4,
        width: width * 0.4,
        borderRadius: width * 0.4
    },
    closeNeighborOpacity: {
        marginTop: 30,
        marginLeft: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: width * 0.3,
        width: width * 0.3,
        borderRadius: width * 0.3,
        backgroundColor: '#b6e0f1'
    },
    closeNeighborPhoto: {
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
