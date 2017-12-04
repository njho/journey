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
import JourneyListItemTwo from '../Generic/JourneyListItemTwo';


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
            title: 'Never Stop Exploring',
            lead_image_url: null,
            url: null,
            excerpt: null,
            journeys:
                [{
                    "title": 'Emulate',
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
                }, {
                    "title": 'Emulate',
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
                }, {
                    "title": 'Emulate',
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
                }, {
                    "title": 'Emulate',
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
                }, {
                    "title": 'Emulate',
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
                },],
            translateTitleUp: new Animated.Value(0),
            translatePartTwo: new Animated.Value(0),
            translateImageUp: new Animated.Value(0)

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
                    lead_image_url: data.lead_image_url,
                    excerpt: data.excerpt,

                })
            });
        });
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
                    dropVisible: false
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
                    <Animated.View style={[
                        {height: height, alignItems: 'center', position: 'absolute', top: 0},
                        {transform: [{translateY: translateImageUp}]}]}>
                        <Image
                            style={{width: width, height: height * 0.4,}}
                            source={{uri: 'http://image.boomsbeat.com/data/images/full/759/1-jpg'}}/>
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
                                width: 30,
                                height: 30,
                                borderWidth: 1,
                                borderRadius: 40,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }]}>
                                <Icon name="ios-document-outline" size={20} color="white"/>
                            </View>
                            <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>November 27, 2017</Text>

                        </View>
                        <Text style={[styles.subText, {color: 'white'}]}>This is an excerpt from all of the stuff we're
                            talking about and looking at on the interwebs</Text>

                    </Animated.View>

                    <Animated.View
                        style={[{position: 'absolute', width: width, height: height, flexDirection: 'column'}, {
                            opacity: translatePartTwoOpacity,
                            transform: [{translateY: translatePartTwo}]
                        }]}>
                        <View style={[{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            borderColor: 'white',
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }]}>
                            <Icon name="ios-document-outline" size={20} color="white"/>
                        </View>
                        <View style={{height: height * 0.08}}/>

                        <Text style={[styles.mainTitle, {fontSize: 35, textAlign: 'center'}]}>{this.state.title}</Text>
                        <View style={[{
                            marginTop: 0,
                            marginBottom: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }]}>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>November 27, 2017</Text>

                        </View>
                        <Text style={[styles.subText, {color: 'white', textAlign: 'center', marginBottom: 50}]}>This is
                            an excerpt from all of the stuff we're
                            talking about and looking at on the interwebs</Text>

                        <View style={{backgroundColor: 'white', width: width, flex: 1}}>
                            <View style={{
                                position: 'absolute',
                                top: -28,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    backgroundColor: '#16171C',
                                    width: 40,
                                    height: 40,
                                    transform: [{rotate: '45deg'}]
                                }}></View>
                            </View>

                            <View style={{
                                width: width,
                                justifyContent: 'space-between',
                                elevation: 5,
                                backgroundColor: 'white'
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={styles.availableJourneys}>Choose a Journey</Text>
                                    <TouchableOpacity style={{marginHorizontal: 20,}}>
                                        <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                                        end={{x: 1, y: .50}}
                                                        style={{
                                                            marginVertical: 10,
                                                            borderRadius: 20,
                                                            alignSelf: 'flex-start',
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                            <Icon name="ios-add"
                                                  style={{color: 'white', marginLeft: 20, marginRight: 10}} size={20}/>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    marginVertical: 10,
                                                    marginRight: 20,
                                                    fontSize: 14
                                                }}>
                                                New Journey</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                </View>
                            </View>
                            <FlatList
                                style={{flex: 1, marginBottom: 30,}}
                                data={this.state.journeys}
                                renderItem={({item}) =>
                                    <JourneyListItemTwo
                                        key={item.title}
                                        name={item.title}
                                        description={item.description}
                                        meta={item.meta}
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
            margin: 10,
            fontSize: 18,
            marginVertical: 10,
            marginLeft: 10,
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


export default connect(mapStateToProps, mapDispatchToProps)(UrlShare);

/* <TouchableOpacity style={styles.cardContainer} onPress={() => {
                    this.props.navigator.showModal({screen: 'MyWeb', passProps: {url: this.state.url}})
                }}>
                    {this.state.lead_image_url === null ? null :
                        <Image
                            style={{width: '100%', height: 150,}}
                            source={{uri: this.state.lead_image_url}}/>

                    }
                    {this.state.title === null ? <Text></Text> :
                        <View style={{margin: 20}}>
                            <Text style={styles.mainTitle}>{this.state.title}</Text>
                        </View>
                    }
                    {this.state.excerpt === null && this.state.lead_image_url === null ?
                        <View style={{margin: 10}}>
                            <Text style={styles.subText}>{this.state.excerpt}</Text>
                        </View> : null
                    }

                    <Text style={[styles.subText, {fontSize: 8, position: 'absolute', right: 10, bottom: 10}]}>November
                        27, 108</Text>


                </TouchableOpacity>
                <Text style={[styles.mainTitle, {marginTop: 30}]}>Please Add this to a Journey</Text>
                <FlatList
                    style={{flex: 1, width: width}}
                    data={this.state.journeys}
                    renderItem={({item}) =>
                        <JourneyListItemTwo
                            key={item.title}
                            name={item.title}
                            description={item.description}
                            meta={item.meta}
                        />
                    }
                />*/