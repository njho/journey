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
    FlatList,
    Picker,
    Platform,
    WebView,
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
import MyWeb from '../helpers/MyWeb';
import JourneyListItemThree from '../Generic/JourneyListItemThree';


import Chat from '../Chat/Chat';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


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

class JourneyView extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            title: 'Helping Little Niggas in Africa',
            lead_image_url: null,
            url: null,
            excerpt: null,
            animateList: false,
            journeys:
                [{
                    "title": 'Our Volunteers',
                    "substory": 'Helping our Volunteers Succeed',
                    "description":
                        'Discussion surrounding micropolitcs and why we need social goodnesss',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset2.jpg'
                    }
                }, {
                    "title": 'Water Education',
                    "substory": 'Edumacation',

                    "description":
                        'We have one service chapter focused on ensuring individuals are educated in maintaining water resources and bettering educational facilities. Take a look here.',
                    "meta": {
                        "last_action": "photo",
                        'last_action_meta': 'Cindy Grouper',
                        "last_entry_date": "4 days ago",
                        "num_followers": 23,
                        "num_entries": 30,
                        "num_contributors": 8,
                        "image_uri": '../../../app/Assets/images/asset3.jpg'

                    }
                }, {
                    "title": 'Emulate',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset4.jpg'
                    },
                    "title": 'Emulate',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset2.jpg'
                    }
                }, {
                    "title": 'React Native',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "photo",
                        'last_action_meta': 'Cindy Grouper',
                        "last_entry_date": "4 days ago",
                        "num_followers": 23,
                        "num_entries": 30,
                        "num_contributors": 8,
                        "image_uri": '../../../app/Assets/images/asset3.jpg'

                    }
                }, {
                    "title": 'Emulate',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset4.jpg'
                    }
                },],
            translateTitleUp: new Animated.Value(0),
            translatePartTwo: new Animated.Value(0),
            translateImageUp: new Animated.Value(0)

        }
    }


    onSwipe(direction, state) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (direction) {
            case SWIPE_UP:
                Animated.parallel([
                    Animated.timing(
                        this.state.translateImageUp,
                        {
                            toValue: 1,
                            duration: 350,
                            delay: 0,
                        }
                    ),
                    Animated.timing(
                        this.state.translateTitleUp,
                        {
                            toValue: 1,
                            duration: 400,
                            delay: 50,
                        }
                    ),
                    Animated.timing(
                        this.state.translatePartTwo, {
                            toValue: 1,
                            duration: 400,
                            delay: 100
                        }
                    )
                ]).start(() => this.setState({
                    ...this.state,
                    dropVisible: false,
                    animateList: true,
                }));
                break;
            case SWIPE_DOWN:
                Animated.parallel([
                    Animated.timing(
                        this.state.translateImageUp,
                        {
                            toValue: 0,
                            duration: 350,
                            delay: 0,
                        }
                    ),
                    Animated.timing(
                        this.state.translateTitleUp,
                        {
                            toValue: 0,
                            duration: 400,
                            delay: 75,
                        }
                    ),
                    Animated.timing(
                        this.state.translatePartTwo, {
                            toValue: 0,
                            duration: 400,
                            delay: 100
                        }
                    )
                ]).start(() => this.setState({
                    ...this.state,

                }));
                break;


        }


    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        const translateTitleUp = this.state.translateTitleUp.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -height * 0.3]
        })
        const translateTitleOpacity = this.state.translateTitleUp.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })
        const translatePartTwo = this.state.translatePartTwo.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        })
        const translatePartTwoOpacity = this.state.translatePartTwo.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        const translateImageUp = this.state.translateImageUp.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -height * 0.2]
        })

        return (
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: "#16171C"
                }}
            >

                <View style={styles.container}>
                    <Animated.View
                        style={[
                            {height: height, alignItems: 'center', position: 'absolute', top: 0},
                            {transform: [{translateY: translateImageUp}]}]}>
                        <Image
                            style={{width: width, height: height * 0.4,}}
                            source={require('../../../app/Assets/images/asset3.jpg')}/>
                        <LinearGradient colors={["transparent", "#16171C", "#16171C"]} locations={[0.5, 0.9, 1.0]}
                                        style={styles.linearGradient}>
                        </LinearGradient>
                        <View style={{backgroundColor: '#16171C', width: width, flex: 1,}}>
                        </View>
                    </Animated.View>
                    <Animated.View style={[{width: width, flex: 1, flexDirection: 'column'}, {
                        opacity: translateTitleOpacity,
                        transform: [{translateY: translateTitleUp}]
                    }]}>
                        <View style={{height: height * 0.3}}/>
                        <Text style={[styles.mainTitle]}>{this.state.title}</Text>
                        <View style={[{
                            marginLeft: 20,
                            marginTop: 0,
                            marginBottom: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }]}>
                            <View style={[{
                                borderColor: 'white',
                                width: 35,
                                height: 35,
                                borderWidth: 2,
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }]}>
                                <Image style={styles.userPhoto}
                                       source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                            </View>
                            <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>The Nigga Organization</Text>

                        </View>
                        <Text style={[styles.subText, {color: 'white'}]}>We are trying to help young people in Africa do
                            things and to free themselves with a lot of help. I'm not sure what we're talking about...
                            but Africa</Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            position: 'absolute',
                            bottom: 5,
                            paddingHorizontal: 10
                        }}>
                            <TouchableOpacity
                                style={{flexDirection: 'row', flex: 1, alignItems: 'stretch', marginHorizontal: 10}}
                                onPress={() => this.onSwipe('SWIPE_UP', this.state)}>
                                <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                                end={{x: 1, y: .50}}
                                                style={
                                                    styles.actionLinearGradient
                                                }>

                                    <Text
                                        style={{
                                            marginHorizontal: 20,
                                            color: 'white',
                                            marginVertical: 10,
                                            fontSize: 14
                                        }}>
                                        Explore</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', flex: 1, marginHorizontal: 10,}}>
                                <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                                end={{x: 1, y: .50}}
                                                style={styles.actionLinearGradient}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            marginHorizontal: 20,
                                            marginVertical: 10,
                                            fontSize: 14
                                        }}>
                                        Contribute</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={[{position: 'absolute', width: width, height: height, flexDirection: 'column'}, {
                            opacity: translatePartTwoOpacity,
                            transform: [{translateY: translatePartTwo}]
                        }]}>

                        <View style={{width: width, flex: 1}}>

                            <FlatList
                                style={{flex: 1, height: height, marginBottom: 10}}
                                data={this.state.journeys}
                                renderItem={({item, index}) =>
                                    <JourneyListItemThree
                                        key={index}
                                        animate={this.state.animateList}

                                        index={index}
                                        name={item.title}
                                        description={item.description}
                                        meta={item.meta}
                                        image_uri={item.image_uri}

                                    />
                                }
                            />


                        </View>
                    </Animated.View>

                </View>
            </GestureRecognizer>
        )
            ;
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        titleText: {
            color: 'white',
            fontSize: 18
        },
        actionLinearGradient: {
            marginVertical: 10,
            borderRadius: 3,
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        userPhoto: {
            height: 32,
            width: 32,
            borderRadius: 40,
        },
        cardContainer: {
            backgroundColor: 'white',
            elevation: 10,
            width: width * 0.9,
            flex: 0,
            borderRadius: 5,
            alignItems: 'center',
        },
        mainTitle:
            {
                color: 'white',
                fontWeight: 'bold',
                margin: 10,
                fontSize: 40,
                marginVertical: 5,
                marginHorizontal: 15,
            }
        ,
        availableJourneys: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 10,
            marginLeft: 15,
            color: '#4D81C2'
        }
        ,
        linearGradient: {
            backgroundColor: "transparent",
            flex: 1,
            position: "absolute",
            width: width,
            height: height * 0.42,

        },

        subText: {
            marginHorizontal: 20,
            fontSize: 14
        }

    })
;


export default connect(mapStateToProps, mapDispatchToProps)(JourneyView);

