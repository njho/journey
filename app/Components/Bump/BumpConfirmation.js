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
    ViewPagerAndroid,
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
import ConfirmCard from './ConfirmCard';
import BumpMainCard from './BumpMainCard';
import LocationCard from './LocationCard';
import CaptionCard from './CaptionCard';
import JourneyCard from './JourneyCard';

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


class BumpConfirmation extends React.Component {
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
            scrollEnabled: false,
            animate: false
        }
        this._deltaY = new Animated.Value(height - 100);

    }

    componentDidMount() {

    }


    next(value) {
        console.log('entered next value: ' + value);

        switch (value) {
            case 1 :

                this.viewPager.setPage(2);
                this.setState({
                    ...this.state,
                    animate: true
                });

                break;
            case 2:
                this.scrollView.scrollTo({x: width, y: 0, animated: true});
                this.setState({
                    ...this.state,
                    status: 2,
                    animate: true
                });
                return;
            case 3:
                this.scrollView.scrollTo({x: width*2, y: 0, animated: true});
                this.setState({
                    ...this.state,
                    status: 2,
                    animate: true
                });
                return;

        }
    }


    render() {
        const spinOne = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['30deg', '0deg']
        })
        const spinTwo = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['-30deg', '0deg']
        })
        const translate = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, width / 6]
        })
        const translateNegative = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -width / 6]
        })

        const moveUp = this.state.translate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -height * 0.3]
        })

        return (
            <KeyboardAvoidingView behavior='position' style={styles.container}>
                <Image style={{
                    backgroundColor: '#ccc',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }} source={require('../../../app/Assets/images/background.png')}/>
                <ViewPagerAndroid
                    ref={(comp) => {
                        this.viewPager = comp
                    }}
                    scrollEnabled={this.state.scrollEnabled}
                    smoothScroll={true}

                    style={{
                        flex: 1,
                        width: width,
                        height: height,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    {this.state.status === 0 ?
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ConfirmCard
                                viewPagerRef={() => {
                                    return this.viewPager
                                }}
                                next={(value) => {
                                    return this.next(1)
                                }}
                            />
                        </View>
                        : null

                    }

                    <View style={{flex: 1, paddingTop: 20, alignItems: 'center', justifyContent: 'center'}}>

                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            overScrollMode='never'
                            ref={(scrollView) => {
                                this.scrollView = scrollView;
                            }}
                        >

                            <View style={{flexDirection: 'row'}}>
                                <View style={{width: width, flex: 1}}>
                                    <BumpMainCard {...this.state}/>

                                    <LocationCard
                                        viewPagerRef={() => {
                                            return this.viewPager
                                        }}
                                        next={(value) => {
                                            return this.next(2)
                                        }}
                                    />
                                </View>
                                <View style={{width: width, flex: 1}}>
                                    <JourneyCard
                                        next={(value) => {
                                        return this.next(3)
                                    }}/>
                                </View>
                                <View style={{width: width, flex: 1}}>
                                    <BumpMainCard {...this.state}/>

                                    <CaptionCard/>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ViewPagerAndroid>

                {this.state.status === 3 ? <View style={styles.panelContainer} pointerEvents={'box-none'}>
                        <Animated.View
                            pointerEvents={'box-none'}
                            style={[styles.panelContainer, {
                                backgroundColor: 'black',
                                opacity: this._deltaY.interpolate({
                                    inputRange: [0, height - 100],
                                    outputRange: [0.5, 0],
                                    extrapolateRight: 'clamp'
                                })
                            }]}/>
                        <Interactable.View
                            verticalOnly={true}
                            snapPoints={[{y: 20}, {y: height - 300}, {y: height - 80}]}
                            boundaries={{top: -300}}
                            initialPosition={{y: height - 80}}
                            animatedValueY={this._deltaY}>
                            <View style={styles.panel}>


                                <Text style={styles.panelTitle}>Location Check In Available</Text>
                            </View>
                        </Interactable.View>
                    </View>

                    : null}

            </KeyboardAvoidingView>
        );
    }
}

const
    styles = StyleSheet.create({

        container: {
            backgroundColor: 'white',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            flexDirection: 'column',
        },
        backgroundImage: {},

        userPhoto: {
            height: width * 0.25,
            width: width * 0.25,
            borderRadius: width * 0.3,
            alignSelf: 'flex-start'
        },
        mainTitle: {
            color: '#B2B2B6',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            padding: 15,
            marginHorizontal: 15,
        },
        actionTitle: {
            textAlign: 'center',
            marginHorizontal: 30,
            fontWeight: 'bold',
            fontSize: 15,
        },

        subText: {
            marginHorizontal: 10,
            textAlign: 'center',
            marginVertical: 5,
            fontSize: 14
        },
        panelContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        panel: {
            height: height + 200,
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f7f5eee8',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 5,
            shadowOpacity: 0.4,
            zIndex: 4
        },
        panelHeader: {
            alignItems: 'center'
        },
        panelHandle: {
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00000040',
            marginBottom: 10
        },
        panelTitle: {
            fontSize: 15,
        },
        panelSubtitle: {
            fontSize: 14,
            color: 'gray',
            height: 30,
            marginBottom: 10
        },
        panelButton: {
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#318bfb',
            alignItems: 'center',
            marginVertical: 10
        },
        panelButtonTitle: {
            fontSize: 17,
            fontWeight: 'bold',
            color: 'white'
        },
        photo: {
            width: width - 40,
            height: 225,
            marginTop: 30
        },
        map: {
            height: height,
            width: width
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    BumpConfirmation
)
;
//
/*
<Animatable.View style={[{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.35,
    width: '100%',
    position: 'absolute',
}, {transform: [{translateY: moveUp}]}]}>

    <Animatable.View
        fadeDuration={0}
        style={[{
            position: 'absolute',
            alignItems: 'center',
        }, {transform: [{rotate: spinTwo}, {translateX: translate},]}]}
    >
        <Image style={styles.userPhoto} source={require('../../../app/Assets/images/elon_musk.jpeg')}/>


    </Animatable.View>
    <Animatable.View
        fadeDuration={0}
        style={[{
            position: 'absolute',
            alignItems: 'center'
        }, {transform: [{translateX: translateNegative}]}]}
    >
        <Image style={styles.userPhoto}
               source={require('../../../app/Assets/images/whitney_wolf.jpg')}/>

    </Animatable.View>
    <Switch></Switch>
</Animatable.View>


<View style={{
    flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        flex: 1,
}}>
{this.state.status === 1 ?

    <View style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: width * 0.35,
        width: '80%'
    }}>
        <Text style={styles.mainTitle}>Add this interaction to your Journey?</Text>

        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: 50,
        }}>
            <TouchableOpacity style={{
                marginLeft: 30,
                marginRight: 10,
                flex: 1,
                backgroundColor: this.state.personalJourney === false ? '#DDDDE1' : '#5D6CA1',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}
                              onPress={() => this.setState({
                                  ...this.state,
                                  personalJourney: true,
                                  status: 2
                              })}>
                <Text style={{
                    marginVertical: 15,
                    color: this.state.personalJourney === false ? '#676C98' : 'white'
                }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                marginRight: 30,
                marginLeft: 10,
                flex: 1,
                backgroundColor: this.state.personalJourney === true ? '#DDDDE1' : '#5D6CA1',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}
                              onPress={() => this.setState({
                                  ...this.state,
                                  personalJourney: false,
                                  status: 2
                              })}


            >
                <Text style={{
                    marginVertical: 15,
                    color: this.state.personalJourney === true ? '#676C98' : 'white'
                }}>No</Text>
            </TouchableOpacity>
        </View>


    </View>
    : null}

{this.state.status === 2 ?
    <ScrollView>
        <View style={{flex: 1}}>
            <Text style={styles.mainTitle}>Available Journeys</Text>

            <FlatList
                data={this.state.data}
                renderItem={({item}) =>
                    <TouchableOpacity onPress={()=>this.setState({...this.state, status: 3})} style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        marginHorizontal: 50
                    }}>

                        <Image style={{width: 50, height: 50, borderRadius: 5, marginRight: 30}}   source={require('../../../app/Assets/images/quoteOcean.png')}/>
                        <Text style={styles.actionText}>{item.name}</Text>
                    </TouchableOpacity>}
            />

        </View>

    </ScrollView>


    : null}


</View>


{this.state.status === 3 ? <View style={styles.panelContainer} pointerEvents={'box-none'}>
        <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
                backgroundColor: 'black',
                opacity: this._deltaY.interpolate({
                    inputRange: [0, height - 100],
                    outputRange: [0.5, 0],
                    extrapolateRight: 'clamp'
                })
            }]}/>
        <Interactable.View
            verticalOnly={true}
            snapPoints={[{y: 20}, {y: height - 300}, {y: height - 80}]}
            boundaries={{top: -300}}
            initialPosition={{y: height - 80}}
            animatedValueY={this._deltaY}>
            <View style={styles.panel}>



                <Text style={styles.panelTitle}>Location Check In Available</Text>
            </View>
        </Interactable.View>
    </View>

    : null}

<ConfirmCard
    viewPagerRef={() => {
        return this.viewPager
    }}
    next={(value) => {
        return this.next(1)
    }}
/>*/