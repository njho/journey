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
    KeyboardAvoidingView,
    Slider,
    Picker,
    Platform,
    StatusBar
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';
import * as Animatable from 'react-native-animatable';
import FadeInView from "../helpers/FadeInView";
import Interactable from 'react-native-interactable';
import JourneyListItem from '../Generic/JourneyListItem';


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


class JourneyCard extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.Value(0),
            translate: new Animated.Value(0),
            status: 0,
            personalJourney: null,
            data: [{name: 'Clean Up the Oceans'}],
            facebook: false,
            journeys:
                [{
                    "title": 'Journey1',
                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53
                    }
                }, {
                    "title": 'React Native',
                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "photo",
                        'last_action_meta': 'Cindy Grouper',
                        "last_entry_date": "4 days ago",
                        "num_followers": 23,
                        "num_entries": 30,
                        "num_contributors": 8,

                    }
                },
                ],

        }
        this._deltaY = new Animated.Value(height - 100);

    }

    valueChange(socialPlatform) {
        switch (socialPlatform) {
            case 'twitter':
                this.setState({
                    ...this.state,
                    twitter: !this.state.twitter
                })
                return
            case 'facebook':
                this.setState({
                    ...this.state,
                    facebook: !this.state.facebook

                })
                return
        }

    }

    renderJourneys() {


    }

    render() {

        return (
            <View style={styles.cardContainer}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: '#9A9CE0',
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                }}>
                    <Text style={styles.titleText}>Choose a Journey</Text>
                </View>

                <FlatList
                    stle={{flex: 1}}
                    data={this.state.journeys}
                    renderItem={({item}) =>
                        <JourneyListItem name={item.title} description={item.description}
                                         meta={item.meta}></JourneyListItem>}
                />


            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            backgroundColor: 'white',
            elevation: 10,
            paddingHorizontal: 15,
            alignSelf: 'stretch',
            marginHorizontal: 20,
            flex: 1,
            borderRadius: 10,
            marginBottom: 20,
            paddingVertical: 20,
            flexDirection: 'column',
        },
        titleText: {
            color: '#9A9CE0',
            fontWeight: 'bold',
            fontSize: 17,
            paddingVertical: 5,
            marginHorizontal: 15,
        },
        subText: {
            color: '#9A9CE0',
            marginTop: 4,
            marginLeft: 15,
            fontSize: 15,
        },
        inverseSubText: {
            color: 'white',
            textAlign: 'center',
            marginHorizontal: 20,
            fontSize: 15,
        },
        panelContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        button: {
            backgroundColor: '#9A9CE0',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 15,
            marginBottom: 5,
            paddingVertical: 7,
            marginHorizontal: 5,
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    JourneyCard
)
;
//
