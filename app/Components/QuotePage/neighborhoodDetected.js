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
    Easing,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';
import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';
import FadeInView from "../helpers/FadeInView";


import agent from '../helpers/agent.js';
import wrapWords from '../helpers/quoteParser';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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

class NeighborhoodDetected extends React.Component {
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
            welcomeAnim: new Animated.Value(0),
            toAnim: new Animated.Value(0),
            journeyAnim: new Animated.Value(0),
            buttonAnimationCompleted: false,
            quoteAnimationCompleted: false
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
            duration: 10,
        }).start(() => this.quoteAnimationCompleted());

        this.props.fetchQuote();
    }

    buttonAnimationCompleted() {
        this.setState({
            ...this.state,
            buttonAnimationCompleted: true
        })
    }

    quoteAnimationCompleted() {
        this.setState({
            ...this.state,
            quoteAnimationCompleted: true
        })
    }

    buttonInfo() {
        this.buttonAnimationCompleted();
        Animated.timing(this.state.buttonPositions, {
            toValue: 80,
            duration: 250,
            delay: 20,
            easing: Easing.inOut(Easing.quad)
        }).start();
    }

    //After Scrolling to the Very Bottom
    onStopInteraction() {
        console.log('did this work no');
        this.loginAnimation();

        this.setState({
            ...this.state,
            endPage: true
        })
    }

    loginAnimation() {
        Animated.sequence([
            Animated.timing(this.state.journeyAnim, {
                toValue: 1,
                duration: 2000
            })
        ]).start();
    }


    render() {
        let {fadeAnim, buttonPositions, welcomeAnim, toAnim, journeyAnim} = this.state;

        return (
            <View style={styles.container}>
                <LinearGradient colors={['#ca449d', '#d379b9']} style={{flex: 1, alignItems: 'center',}}>
                    <View style={{flex: 2, alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: -width*0.9,
                            borderWidth: 1,
                            borderColor: '#b0d9ea',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: (width * 1.5),
                            height: (width * 1.5),
                            backgroundColor: '#b0d9ea',
                            borderRadius: 1000,
                        }}>

                    </TouchableOpacity>
                    <Image style={styles.photo} source={require('../../../app/Assets/images/Untitled-1.png')}/>
                    </View>

                    <View style={{flex: 3, marginTop: 30, marginBottom: 50}}>
                        <Text style={styles.titleText}>Hey, I noticed there's a beautiful community nearby!</Text>
                        <Text style={styles.subText}>Recognize any neighbors?</Text>
                            <ScrollView style={{flex: 1, marginVertical: 10}} overScrollMode='never' contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                                <TouchableOpacity style={{marginVertical: 5}}>
                                        <View style={styles.locationBackground}>
                                        </View>
                                        <View style={styles.locationView}>
                                            <Text style={styles.locationText}><Icon name="md-locate" size={20} color="white"/>
                                                  &emsp;San Francisco Dev Con</Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginVertical: 5}}>
                                    <View style={styles.locationBackground}>
                                    </View>
                                    <View style={styles.locationView}>
                                        <Text style={styles.locationText}><Icon name="md-locate" size={20} color="white"/>
                                            &emsp;Roller Derby Love</Text>
                                    </View>
                                </TouchableOpacity>

                            </ScrollView>
                        </View>
                    <View style={styles.footer}>
                        <Text style={styles.miniText}>I'll do this later</Text>
                    </View>

                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4a4d61',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 50,
        flexWrap: 'wrap'
    },
    titleText: {
        marginHorizontal: 40,
        textAlign: 'center',
        color: '#f0ffff',
        fontSize: 24
    },
    subText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#f0ffff',
        fontSize: 16
    },
    miniText: {
        textAlign: 'center',
        color: '#f0ffff',
        fontSize: 12
    },
    scrollView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    screen: {
        padding: scaleVertical(16),
        flex: 1,
        justifyContent: 'space-between'
    },
    locationBackground: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#557ee6',
        marginHorizontal: 40,
        opacity: 0.2,
        borderRadius: 100,
    },
    locationView: {
        height: 40,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    locationText: {
        textAlign: 'center',
        width: '100%',
        color: '#f0ffff',
        fontSize: 20,
        opacity: 1
    },
    photo: {
        marginTop: (height*0.02),
        marginLeft: 20,
        width: (width - 120),
        resizeMode: 'contain',
        marginBottom: 20
    },
    footer: {
        position: 'absolute',
        bottom: 20
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NeighborhoodDetected);
