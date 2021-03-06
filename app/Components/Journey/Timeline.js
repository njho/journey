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
    Modal,
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
import {BlurView} from 'react-native-blur'


import {NativeModules} from 'react-native';


import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import Animation from 'lottie-react-native';
import MyWeb from '../helpers/MyWeb';
import JourneyListItemTimeline from './JourneyListItemTimeline';


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

class TimeLine extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true,


    };

    constructor(props) {
        super(props);
        this.state = {
            title: 'Helping Little Niggas in Africa',
            lead_image_url: null,
            url: null,
            excerpt: null,
            animateList: false,
            modalVisible: false,
            viewRef: null,
            journeys:
                [{
                    "title": 'Our Volunteers', "substory": 'this is a long example',
                    "description":
                        'A discussion surrounding micro social consciousness and how we can use it to influence the world',
                    "meta": {
                        "type": "bump",
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset2.jpg',
                        "members": [{
                            user: 'Bob Dylan',
                            photo: 'uri',
                            'description': 'cat dog man'
                        }, {user: 'Bob Dylan', photo: 'uri', 'description': 'cat dog man'}]
                    }
                }, {
                    "title": 'Water Education',
                    "substory": 'this is a long example',
                    "description":
                        'We have one service chapter focused on ensuring individuals are educated in maintaining water resources and bettering educational facilities. Take a look here.',
                    "meta": {
                        "type": "photo",
                        "last_action": "photo",
                        'last_action_meta': 'Cindy Grouper',
                        "last_entry_date": "4 days ago",
                        "num_followers": 23,
                        "num_entries": 30,
                        "num_contributors": 8,
                        "image_uri": '../../../app/Assets/images/asset3.jpg'

                    }
                },
                    {
                        "title": 'Our Spain Experience!',
                        "substory": 'Gifty Product Development',
                        "description":
                            'We have one service chapter focused on ensuring individuals are educated in maintaining water resources and bettering educational facilities. Take a look here.',
                        "meta": {
                            "type": "live",
                            "last_action": "photo",
                            'last_action_meta': 'Cindy Grouper',
                            "last_entry_date": "4 days ago",
                            "num_followers": 23,
                            "num_entries": 30,
                            "num_contributors": 8,
                            "image_uri": '../../../app/Assets/images/asset3.jpg'

                        }
                    },
                    {
                        "title": 'Our Spain Experience!',
                        "substory": 'Gifty Product Development',
                        "description":
                            'We have one service chapter focused on ensuring individuals are educated in maintaining water resources and bettering educational facilities. Take a look here.',
                        "meta": {
                            "type": "article",
                            "last_action": "photo",
                            'last_action_meta': 'Cindy Grouper',
                            "last_entry_date": "4 days ago",
                            "num_followers": 23,
                            "num_entries": 30,
                            "num_contributors": 8,
                            "image_uri": '../../../app/Assets/images/asset3.jpg'

                        }
                    },


                ],
            translateTitleUp: new Animated.Value(0),
            translatePartTwo: new Animated.Value(0),
            translateImageUp: new Animated.Value(0)

        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }


    onNavigatorEvent(event) {
        // handle a deep link
        if (event.type == 'DeepLink') {
            console.log('we are handlingt he deep link');
            console.log(event.link);

            switch (event.link) {
                case 'login':
                    this.props.navigator.resetTo({screen: 'login'})

            }
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

    launchModal(bool) {
        this.setState({modalVisible: bool})
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
            <View style={styles.container}>
                <View style={{
                    elevation: 5,
                    width: width,
                    justifyContent: 'space-around',
                    backgroundColor: '#4D81C2',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    flexDirection: 'row',

                }}>
                    <TouchableOpacity>
                        <View style={{
                            borderRadius: 5,
                            backgroundColor: '#4D81C2',
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 7
                        }}>
                            <Icon name="ios-add-outline" size={40}
                                  color="white"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{
                            borderRadius: 5,
                            backgroundColor: '#4D81C2',
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 7
                        }}>
                            <Icon name="ios-search" size={25}
                                  color="white"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigator.showLightBox({
                        screen: 'SideDrawer', // unique ID registered with Navigation.registerScreen
                        passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
                        style: {
                            backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                            backgroundColor: '#00000080', // tint color for the background, you can specify alpha here (optional)
                            tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
                        }
                    })}>
                        <View style={{
                            borderRadius: 5,
                            backgroundColor: '#4D81C2',
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 7
                        }}>
                            <Icon name="ios-person-outline" size={35}
                                  color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{flex: 1, height: height, width: width, marginBottom: 10}}
                    data={this.state.journeys}
                    renderItem={({item, index}) =>
                        <JourneyListItemTimeline
                            substory={item.substory}
                            key={index}
                            index={index}
                            name={item.title}
                            description={item.description}
                            members={item.members ? item.members : null}
                            meta={item.meta}
                            image_uri={item.image_uri}
                            navigator={this.props.navigator}
                        />
                    }
                />

            </View>

        )
            ;
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            width: width,
            height: height,
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
                fontWeight:
                    'bold',
                margin: 10,
                fontSize:
                    40,
                marginVertical:
                    5,
                marginHorizontal:
                    15,
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
        },
        contentWrap: {
            flex: 1,
            position: 'absolute',
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
        }

    })
;


export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);


//
