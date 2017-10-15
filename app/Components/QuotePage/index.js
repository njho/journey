import React from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    Easing
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';
import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';
import FadeInView from "../helpers/FadeInView";


import agent from '../helpers/agent.js';
import wrapWords from '../helpers/quoteParser';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;

const SLIDE_IN_DOWN_KEYFRAMES = {
    from: {translateY: -10},
    to: {translateY: 0},
};

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

class Login extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this._deltaX = new Animated.Value(0);
        this._deltaY = new Animated.Value(0);
        this._face1Scale = new Animated.Value(1);

        this.state = {
            fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
            progress: new Animated.Value(0),
            buttonPositions: new Animated.Value(0), //For the button positions
            animationCompleted: false
        }
    }


    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 2000,
                delay: 20,// Make it take a while
            }
        ).start();                        // Starts the animation
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();

        this.props.fetchQuote();
    }

    animationCompleted() {
        this.setState({
            ...this.state,
            animationCompleted: true
        })
    }

    buttonInfo() {
        this.animationCompleted();
        Animated.timing(this.state.buttonPositions, {
            toValue: 80,
            duration: 250,
            delay: 20,
            easing: Easing.inOut(Easing.quad)
        }).start();
    }


    render() {
        let {fadeAnim, buttonPositions} = this.state;

        return (
            <View style={styles.container}>
                <View style={{flex: 4, alignItems: 'center', justifyContent: 'center', marginTop: 80}}>
                    <View style={styles.infoBar}>
                        <FadeInView animationDuration={2000} animationDelay={5000}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.titleView}>
                                    <Text style={styles.titleText}>Cleaning the Oceans with Mission Blue</Text>
                                </TouchableOpacity>
                            </View>
                        </FadeInView>

                    </View>

                    <View
                        style={styles.quoteView}>{this.props.quoteMeta ? wrapWords(this.props.quoteMeta.quote, styles.quote) :
                        null}</View>
                    <FadeInView animationDuration={2000} animationDelay={3000}>
                        <Text
                            style={styles.author}>{this.props.quoteMeta ? '- ' + this.props.quoteMeta.quote_author : null} </Text>
                    </FadeInView>
                </View>


                <Animated.View style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'}}>

                    {this.state.animationCompleted ? <Animated.View
                        style={{
                            left: buttonPositions,
                            position: 'absolute', width: '100%', alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: '#26aabc',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                backgroundColor: '#26aabc',
                                borderRadius: 100,
                                zIndex: 11
                            }}
                        >
                            <Icon name="ios-bookmark" size={20} color="white"/>
                        </TouchableOpacity>
                    </Animated.View> : null}

                    {this.state.animationCompleted ? <Animated.View
                        style={{
                            right: buttonPositions,
                            position: 'absolute', width: '100%', alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableOpacity onPress={()=>{console.log('hit')}}
                            style={{
                                borderWidth: 1,
                                borderColor: '#26aabc',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                backgroundColor: '#26aabc',
                                borderRadius: 100,
                                zIndex: 10
                            }}
                        >
                            <Icon name="ios-add" size={20} color="white"/>
                        </TouchableOpacity>
                    </Animated.View> : null}


                    <FadeInView
                        style={{
                            position: 'absolute',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                        animationDuration={2000}
                        animationDelay={5000}>
                        <TouchableHighlight
                            onPress={() => this.buttonInfo()}
                            activeOpacity={80}
                            underlayColor="#1F909E"
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                backgroundColor: '#26aabc',
                                borderRadius: 100,
                                zIndex:13
                            }}
                        >
                            <Icon name="ios-flame" size={30} color="white"/>
                        </TouchableHighlight>
                    </FadeInView>
                </Animated.View>

                <FadeInView
                    style={{
                        bottom: 0
                    }}
                    animationDuration={2000}
                    animationDelay={5000}>

                    <Animatable.Text animation={SLIDE_IN_DOWN_KEYFRAMES} iterationCount="infinite"
                                     direction="alternate"><Icon name="ios-arrow-down" size={45}
                                                                 color="white"/>️</Animatable.Text>
                </FadeInView>

            </View>
        );
    }

    onStopInteraction(event, scaleValue) {
        const x = event.nativeEvent.x;
        const y = event.nativeEvent.y;
        if (x > -10 && x < 10 && y < 210 * heightFactor && y > 190 * heightFactor) {
            Animated.timing(scaleValue, {toValue: 0, duration: 300}).start();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4a4d61',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    previewImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 5,
        marginBottom: 20
    },
    infoBar: {
        marginBottom: 25,
        flexDirection: 'column',
    },
    icons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    titleView: {
        backgroundColor: "#26aabc",
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: '#f0ffff',
        fontSize: 15,
        marginVertical: 5,
        marginHorizontal: 10
    },
    quoteView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 40,
        flexWrap: 'wrap'
    },
    quote: {
        color: '#f0ffff',
        fontSize: 18
    },
    author: {
        textAlign: 'center',
        marginTop: 20,
        color: '#f0ffff',
        fontSize: 26
    },
    screen: {
        padding: scaleVertical(16),
        flex: 1,
        justifyContent: 'space-between'
    },
    image: {

        resizeMode: 'contain'
    },
    header: {
        paddingBottom: scaleVertical(10),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    content: {
        justifyContent: 'space-between'
    },
    save: {
        marginVertical: 20
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: scaleVertical(24),
        marginHorizontal: 24,
        justifyContent: 'space-around',
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footer: {},
    marker: {},
});

// You can then use your `FadeInView` in place of a `View` in your components:
export default connect(mapStateToProps, mapDispatchToProps)(Login);

/*          <Animation
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={require('../../Assets/lottieFile.json')}
                        progress={this.state.progress}
                    />




                      <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#8a35bf',
                                    borderRadius: 100,
                                }}
                            >
                                <Icon name="ios-trending-up" size={30} color="white"/>
                            </TouchableOpacity>

                                  <Image
                        source={require('../../../app/Assets/images/quoteOcean.png')}
                        style={styles.previewImage}
                        resizeMethod='resize'
                    >
                    </Image>*/

/*<View style={{position: 'absolute', flex: 0}}>
                    <Animated.Image
                        source={require('../../Assets/images/stars.png')}
                        style={[styles.marker, {top: heightFactor}, {
                            transform: [{
                                translateX: this._deltaX.interpolate({
                                    inputRange: [-140 * widthFactor, 140 * widthFactor],
                                    outputRange: [-100, 20]
                                })
                            },
                                {
                                    translateY: this._deltaY.interpolate({
                                        inputRange: [-30 * heightFactor, 50 * heightFactor, 270 * heightFactor],
                                        outputRange: [50 * heightFactor, -10, 10],
                                        extrapolateLeft: 'clamp'
                                    })
                                }]
                        }
                        ]}/>
                </View>
                <Animated.View style={{position: 'absolute', flex: 0, opacity: fadeAnim}}>
                    <Animated.Image
                        source={require('../../Assets/images/s7-stars.png')}
                        style={[styles.marker, {top: heightFactor}, {
                            transform: [{
                                translateX: this._deltaX.interpolate({
                                    inputRange: [-30 * widthFactor, 30 * widthFactor],
                                    outputRange: [20, -80]
                                })
                            },
                                {
                                    translateY: this._deltaY.interpolate({
                                        inputRange: [20 * heightFactor, 54 * heightFactor, 277 * heightFactor],
                                        outputRange: [50 * heightFactor, -10, 10],
                                        extrapolateLeft: 'clamp'
                                    })
                                }]
                        }
                        ]}/>

                </Animated.View>*/

/*<View style={{position: 'absolute', flex: 0}}>
                    <Animated.Image
                        source={require('../../Assets/images/stars.png')}
                        style={[styles.marker, {top: heightFactor}, {
                            transform: [{
                                translateX: this._deltaX.interpolate({
                                    inputRange: [-140 * widthFactor, 140 * widthFactor],
                                    outputRange: [-100, 20]
                                })
                            },
                                {
                                    translateY: this._deltaY.interpolate({
                                        inputRange: [-30 * heightFactor, 50 * heightFactor, 270 * heightFactor],
                                        outputRange: [50 * heightFactor, -10, 10],
                                        extrapolateLeft: 'clamp'
                                    })
                                }]
                        }
                        ]}/>
                </View>
                <Animated.View style={{position: 'absolute', flex: 0, opacity: fadeAnim}}>
                    <Animated.Image
                        source={require('../../Assets/images/s7-stars.png')}
                        style={[styles.marker, {top: heightFactor}, {
                            transform: [{
                                translateX: this._deltaX.interpolate({
                                    inputRange: [-30 * widthFactor, 30 * widthFactor],
                                    outputRange: [20, -80]
                                })
                            },
                                {
                                    translateY: this._deltaY.interpolate({
                                        inputRange: [20 * heightFactor, 54 * heightFactor, 277 * heightFactor],
                                        outputRange: [50 * heightFactor, -10, 10],
                                        extrapolateLeft: 'clamp'
                                    })
                                }]
                        }
                        ]}/>

                </Animated.View>*/