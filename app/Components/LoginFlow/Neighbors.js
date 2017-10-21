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
    ScrollView,
    TouchableWithoutFeedback
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
    to: {translateY: 0}
};

const SLIDE_IN_DOWN_KEYFRAMES_2 = {
    from: {translateY: -5},
    to: {translateY: 0},
};

const SLIDE_IN_DOWN_KEYFRAMES_3 = {
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
            slideAnim: new Animated.Value(0),
            slide: 1
        }
    }

    next() {
        if (this.state.slide === 5) {
        } else {
            this.setState({
                ...this.state,
                slide: this.state.slide + 1
            })
        }
    }

    neighborClicked() {

        Animated.sequence([
            Animated.timing(                  // Animate over time
                this.state.slideAnim,            // The animated value to drive
                {
                    toValue: width,                   // Animate to opacity: 1 (opaque)
                    duration: 300,
                }),
            Animated.timing(                  // Animate over time
                this.state.slideAnim,            // The animated value to drive
                {
                    toValue: -width,                   // Animate to opacity: 1 (opaque)
                    duration: 0,
                }),
            Animated.timing(                  // Animate over time
                this.state.slideAnim,            // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: 300,
                })
        ]).start();

    }


    render() {
        let {slideAnim} = this.state;

        return (
            <View style={styles.container}>
                <LinearGradient colors={['#f15d65', '#d379b9']} style={{flex: 1, alignItems: 'center', width: '100%'}}>
                    <View style={{
                        position: 'absolute',
                        flex: 1,
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Animatable.View
                            style={{marginRight: width * 0.4, marginBottom: 20}}
                            animation={SLIDE_IN_DOWN_KEYFRAMES_3}
                            iterationCount="infinite"
                            duration={1500}
                            delay={200}
                            direction="alternate">
                            <TouchableOpacity style={styles.closeNeighborOpacity}
                                              onPress={() => this.neighborClicked(1)}>
                                <Image
                                    style={styles.closeNeighborPhoto}
                                    source={require('../../../app/Assets/images/elon_musk.jpeg')}/>

                            </TouchableOpacity>
                        </Animatable.View>
                        <View style={{flex: 1}}></View>
                        <Animatable.View
                            style={{position: 'absolute', left: width * 0.4, top: -5}}
                            animation={SLIDE_IN_DOWN_KEYFRAMES_2}
                            iterationCount="infinite"
                            duration={1500}
                            delay={400}
                            direction="alternate">
                            <TouchableOpacity style={styles.farNeighborOpacity}>
                                <Image
                                    style={styles.farNeighborPhoto}
                                    source={require('../../../app/Assets/images/whitney_wolf.jpg')}/>
                            </TouchableOpacity>
                        </Animatable.View>

                    </View>
                    <View style={{flex: 2}}>
                    </View>


                    <View
                        style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start'}}>
                        <Animated.View style={{transform: [{translateX: this.state.slideAnim}]}}>
                            <Animatable.View
                                duration={1500}
                                style={{
                                    elevation: 20,
                                    alignItems: 'center',
                                    shadowColor: "#000000",
                                    shadowRadius: 3,
                                    shadowOffset: {
                                        height: 20,
                                        width: 1
                                    },
                                    borderRadius: width * 0.5,
                                    backgroundColor: '#b0d9ea'
                                }}
                                animation={SLIDE_IN_DOWN_KEYFRAMES}
                                iterationCount="infinite"
                                direction="alternate">
                                <TouchableOpacity style={styles.userOpacity}>
                                    <Animatable.Image
                                        style={styles.userPhoto}
                                        source={require('../../../app/Assets/images/jane_goodall.jpg')}/>
                                </TouchableOpacity>

                                <View style={styles.titleView}>
                                    <Text style={styles.titleText}>Jane Goodall</Text>
                                    <Text style={styles.subText}>Saving wildlife for the world</Text>
                                    <Text style={styles.subText}>Tanzania, Africa</Text>
                                    <Text style={styles.miniText}>Created: Just now</Text>
                                </View>
                                <View style={{height: width * 0.15}}></View>
                            </Animatable.View>
                        </Animated.View>
                    </View>

                    <View style={{
                        flex: 4,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableWithoutFeedback onPress={() => this.next()}>

                            <View style={{marginHorizontal: 30}}>
                                {this.state.slide === 1 ?
                                    <FadeInView animationDuration={20} animationDelay={0}><Text
                                        style={styles.titleText}>Say Hello to your neighbors!</Text>
                                    </FadeInView> : null}
                                {this.state.slide === 2 ?
                                    <FadeInView animationDuration={20} animationDelay={0}><Text
                                        style={styles.titleText}>Their Journey's started around
                                        the same time as yours!</Text></FadeInView> : null}
                                {this.state.slide === 3 ?
                                    <FadeInView animationDuration={20} animationDelay={0}>
                                        <Text style={styles.titleText}>As time passes, your community will grow.</Text></FadeInView> : null}
                                {this.state.slide === 4 ?
                                    <FadeInView animationDuration={20} animationDelay={0}>
                                        <Text style={styles.titleText}>For now, just make sure you say hi!</Text>
                                    </FadeInView> : null}
                                {this.state.slide === 5 ?
                                    <FadeInView animationDuration={20} animationDelay={0}>
                                        <Text style={styles.subText}>And that you come back to make
                                            something beautiful with them some day</Text>
                                    </FadeInView> : null}

                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0ffff',
        flex: 1,
        alignItems: 'center',
    },
    titleView: {
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: width * 0.5,
        width: width * 0.5,
        borderRadius: width * 0.5,
        backgroundColor: '#b0d9ea',
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
        backgroundColor: '#b6e0f1',
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
        backgroundColor: '#c3eeff',
    },
    farNeighborPhoto: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.15,
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(NeighborhoodDetected);

/*            <View style={{flex: 4}}>
                    <TouchableOpacity style={styles.farNeighborOpacity}>
                        <Animatable.Image animation={SLIDE_IN_DOWN_KEYFRAMES}
                                          iterationCount="infinite"
                                          direction="alternate"
                                          style={styles.farNeighborPhoto}
                                          source={require('../../../app/Assets/images/Untitled-1.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeNeighborOpacity}>
                        <Animatable.Image animation={SLIDE_IN_DOWN_KEYFRAMES}
                                          iterationCount="infinite"
                                          direction="alternate"
                                          style={styles.closeNeighborPhoto}
                                          source={require('../../../app/Assets/images/Untitled-1.png')}/>
                    </TouchableOpacity>
                </View>*/