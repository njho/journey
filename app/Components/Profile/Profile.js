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
    ViewPagerAndroid,
    Share,
    FlatList,
    Picker,
    Platform,
    WebView,
    StatusBar
} from 'react-native';
import {BlurView} from 'react-native-blur'

import ContactsList from './ContactsList';
import {NativeModules} from 'react-native';



import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import Animation from 'lottie-react-native';
import MyWeb from '../helpers/MyWeb';

import {TabViewAnimated, TabBar,  TabViewPagerExperimental} from 'react-native-tab-view'; // 0.0.74


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

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const HEADER_HEIGHT = 240;
const COLLAPSED_HEIGHT = 52;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - COLLAPSED_HEIGHT;

class Profile extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true,


    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: '1',},
                {key: '2',},
                {key: '3',},
            ],
            scroll: new Animated.Value(0),
        };

    }

    _handleIndexChange = index => {
        this.setState({index});
    };

    _renderIcon = ({route}: any) => {
        return <Icon name={'ios-add'} size={24} color={'white'}/>;
    };

    _renderHeader = props => {
        const translateY = this.state.scroll.interpolate({
            inputRange: [0, SCROLLABLE_HEIGHT],
            outputRange: [0, -SCROLLABLE_HEIGHT],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
                <View style={{flex: 1, backgroundColor: 'white', height: (240 - 52), alignItems: 'center'}}>
                    <Image
                        style={{position: 'absolute', width: width, height: height * 0.4,}}
                        source={{uri: 'http://image.boomsbeat.com/data/images/full/759/1-jpg'}}/>
                    <LinearGradient colors={["transparent", "#16171C", "#16171C"]} locations={[0.5, 0.9, 1.0]}
                                    style={styles.linearGradient}>
                    </LinearGradient>
                    <Image style={styles.userPhoto} source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        bottom: 30,
                        width: width,
                        paddingHorizontal: 35
                    }}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text>
                                3
                            </Text>
                            <Text>
                                Journeys
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text>
                                18
                            </Text>
                            <Text>
                                Contributions
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text>
                                3
                            </Text>
                            <Text>
                                Journeys
                            </Text>
                        </View>
                    </View>
                </View>
                <TabBar
                    {...props}
                    style={styles.tabbar}
                    renderIcon={this._renderIcon}


                />
            </Animated.View>
        );
    };

    _renderScene = () => {
        return (
            <ContactsList
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],

                )}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
            />

            );
    };



    render() {

        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
                useNativeDriver
            />

        )
            ;
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        overlay: {
            flex: 1,
            backgroundColor: 'black',
        },
        cover: {
            height: HEADER_HEIGHT,
        },
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
        },
        tabbar: {
            backgroundColor: 'black',
            elevation: 0,
            shadowOpacity: 0,
        },

        userPhoto: {
            width: width * 0.2,
            height: width * 0.2,
            borderRadius: width * 0.2,
        },
        linearGradient: {
            backgroundColor: "transparent",
            flex: 1,
            position: "absolute",
            width: width,
            height: height * 0.42,

        }

    })
;


export default connect(mapStateToProps, mapDispatchToProps)(Profile);


//
