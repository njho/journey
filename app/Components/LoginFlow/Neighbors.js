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
    TouchableWithoutFeedback,
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';


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

        this.state = {
            closeNeighborSelected: false,
            farNeighborSelected: false,
            slide: 1,
            transform: new Animated.Value(-0.1),
            translate: new Animated.Value(0),
            closeNeighborGreeted: false,
            farNeighborGreeted: false
        }
    }

    next() {
        if (this.state.slide === 5) {
            this.props.navigator.push({
                screen: 'locationCommunity'
            })
        } else {
            this.setState({
                ...this.state,
                slide: this.state.slide + 1
            })
        }
    }

    neighborClicked(value) {
        switch (value) {
            case 1:
                this.scrollView.scrollTo({x: width, y: 0, animated: true});
                break;
            case 2:
                this.scrollView.scrollToEnd();
                break;
        }

    }

    handleScroll(event) {
        console.log(width);
        console.log(event.nativeEvent.contentOffset.x);
        if (event.nativeEvent.contentOffset.x < width * 0.75) {
            this.setState({...this.state, closeNeighborSelected: false, farNeighborSelected: false})
        } else if (event.nativeEvent.contentOffset.x > width * 0.75 && event.nativeEvent.contentOffset.x < width * 1.75) {
            //Second page
            this.setState({...this.state, closeNeighborSelected: true, farNeighborSelected: false});

        } else if (event.nativeEvent.contentOffset.x > width * 1.75) {
            this.setState({...this.state, closeNeighborSelected: false, farNeighborSelected: true});
        }
    }

    sayHello(neighbor) {
        // First set up animation

        Animated.parallel([
            Animated.sequence([
                Animated.timing(
                    this.state.transform,
                    {
                        toValue: -0.15,
                        duration: 250,
                    }
                ),
                Animated.timing(
                    this.state.transform,
                    {
                        toValue: 0.07,
                        duration: 300,
                    }
                ),
                Animated.timing(
                    this.state.transform,
                    {
                        toValue: -0.1,
                        duration: 300,
                    }
                ),
                Animated.timing(
                    this.state.transform,
                    {
                        toValue: 0.08,
                        duration: 300,
                    }
                ),
                Animated.timing(
                    this.state.transform,
                    {
                        toValue: -0.1,
                        duration: 400,
                    }
                ),
            ]),
            Animated.sequence([
                Animated.timing(
                    this.state.translate,
                    {
                        toValue: -3,
                        duration: 250,

                    }
                ),
                Animated.timing(
                    this.state.translate,
                    {
                        toValue: 3.8,
                        duration: 300,
                    }
                ),
                Animated.timing(
                    this.state.translate,
                    {
                        toValue: -3,
                        duration: 300,
                    }
                ),
                Animated.timing(
                    this.state.translate,
                    {
                        toValue: 4,
                        duration: 300,
                    }
                ),
                Animated.timing(
                    this.state.translate,
                    {
                        toValue: -2,
                        duration: 400,
                    }
                ),
            ])
        ]).start(() => {
            if (neighbor === 1) {
                this.refs.closeNeighbor.bounce(1500).then(this.setState({...this.state, closeNeighborGreeted: true}));
                this.closeNeighborHeart.play();
                ToastAndroid.show("You've received 50 Hearts!", ToastAndroid.SHORT);

            } else {
                this.refs.farNeighbor.bounce(1500).then(this.setState({...this.state, farNeighborGreeted: true}));
                this.farNeighborHeart.play();
                ToastAndroid.show("You've received 50 Hearts!", ToastAndroid.SHORT);

            }

        });

    }


    render() {
        let {slideAnim} = this.state;
        const spin = this.state.transform.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={styles.container}>
                <LinearGradient colors={['#f15d65', '#d379b9']} style={{flex: 1, alignItems: 'center', width: '100%'}}>
                    <View style={{
                        position: 'absolute',
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
                            direction="alternate"
                            useNativeDriver={true}>
                            <Animatable.View ref="closeNeighbor">

                                <TouchableOpacity style={[styles.closeNeighborOpacity,]}
                                                  onPress={() => this.neighborClicked(1)}>
                                    <Image
                                        style={styles.closeNeighborPhoto}
                                        source={require('../../../app/Assets/images/elon_musk.jpeg')}/>

                                </TouchableOpacity>
                            </Animatable.View>
                        </Animatable.View>
                        <View style={{flex: 1}}></View>
                        <Animatable.View
                            style={{position: 'absolute', left: width * 0.4, top: -5,}}
                            animation={SLIDE_IN_DOWN_KEYFRAMES_2}
                            iterationCount="infinite"
                            duration={1500}
                            delay={400}
                            direction="alternate"
                            useNativeDriver={true}>
                            <Animatable.View
                                ref="farNeighbor">
                                <TouchableOpacity
                                    style={[styles.farNeighborOpacity]}
                                    onPress={() => this.neighborClicked(2)}>
                                    <Image
                                        style={styles.farNeighborPhoto}
                                        source={require('../../../app/Assets/images/whitney_wolf.jpg')}/>
                                </TouchableOpacity>
                            </Animatable.View>
                        </Animatable.View>

                    </View>

                    <View style={{flex: 1, alignItems: 'center',}}>
                        <View style={{flex: 2}}></View>
                        <View style={{flex: 9}}>
                            <ScrollView
                                horizontal={true}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                overScrollMode='never'
                                ref={(scrollView) => {
                                    this.scrollView = scrollView;
                                }}
                                onScroll={(e) => this.handleScroll(e)}
                            >
                                <View style={{flex: 1, flexDirection: 'row',}}>
                                    <View
                                        style={{
                                            width: width,
                                            flex: 1,
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            justifyContent: 'space-around'
                                        }}>

                                        <Animatable.View
                                            duration={1500}
                                            style={{
                                                elevation: 15,
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
                                            direction="alternate"
                                            useNativeDriver={true}>

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
                                    </View>

                                    <View
                                        style={{
                                            width: width,
                                            flex: 1,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
                                        }}>


                                        <Animatable.View
                                            style={{
                                                width: width,
                                                alignItems: 'center',
                                            }}
                                            duration={1500}
                                            animation={SLIDE_IN_DOWN_KEYFRAMES}
                                            iterationCount="infinite"
                                            direction="alternate"
                                            useNativeDriver={true}>

                                        <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                width: width,
                                                alignItems: 'center',
                                            }}>
                                                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                                    <View
                                                        style={{
                                                            flex: 0,
                                                            zIndex: 1,
                                                            flexDirection: 'column',
                                                            width: width * 0.62,
                                                            elevation: 15,
                                                            alignItems: 'center',
                                                            shadowColor: "#000000",
                                                            shadowRadius: 3,
                                                            shadowOffset: {
                                                                height: 20,
                                                                width: 1
                                                            },
                                                            borderRadius: width * 0.48,
                                                            backgroundColor: '#acd4e5'
                                                        }}
                                                    >
                                                        <View style={{flex: 0, height: width * 0.5, marginBottom: 40}}>
                                                            <TouchableOpacity style={styles.neighborOpacity}>
                                                                <Animatable.Image
                                                                    style={styles.userPhoto}
                                                                    source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                                                            </TouchableOpacity>

                                                            <TouchableOpacity onPress={() => this.sayHello(1)}
                                                                              style={styles.hello}
                                                                              disabled={this.state.closeNeighborGreeted}>
                                                                <Animated.View style={{
                                                                    left: this.state.translate,
                                                                    transform: [{rotate: spin}]
                                                                }}>
                                                                    {this.state.closeNeighborGreeted ?
                                                                        <Text>+50</Text> :
                                                                        <Icon name="md-hand" size={20}/>}
                                                                </Animated.View>
                                                            </TouchableOpacity>
                                                            <Animation
                                                                ref={animation => {
                                                                    this.closeNeighborHeart = animation;
                                                                }}
                                                                style={{
                                                                    transform: [{rotate: '-21deg'}],
                                                                    position: 'absolute',
                                                                    top: width * 0.28,
                                                                    right: -27,
                                                                    width: 40,
                                                                    height: 40,
                                                                }}
                                                                source={require('../../Assets/lottie/like.json')}
                                                            />
                                                        </View>
                                                        <View style={[styles.titleView, {flex: 1}]}>
                                                            <Text style={styles.titleText}>Elon Musk</Text>
                                                            <Text style={styles.subText}>Revolutionizing Banking</Text>
                                                            <Text style={styles.subText}>San Francisco,
                                                                California</Text>
                                                            <Text style={styles.miniText}>Created: 10 minutes ago</Text>
                                                        </View>
                                                        <View style={{flex: 0, height: width * 0.27}}/>


                                                    </View>
                                                </View>
                                            </View>

                                        </Animatable.View>
                                    </View>
                                    <View
                                        style={{
                                            width: width,
                                            flex: 1,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
                                        }}>


                                        <Animatable.View
                                            style={{
                                                width: width,
                                                alignItems: 'center',
                                            }}
                                            duration={1500}
                                            animation={SLIDE_IN_DOWN_KEYFRAMES}
                                            iterationCount="infinite"
                                            direction="alternate"
                                            useNativeDriver={true}>

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                width: width,
                                                alignItems: 'center',
                                            }}>
                                                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                                    <View
                                                        style={{
                                                            flex: 0,
                                                            zIndex: 1,
                                                            flexDirection: 'column',
                                                            width: width * 0.62,
                                                            elevation: 15,
                                                            alignItems: 'center',
                                                            shadowColor: "#000000",
                                                            shadowRadius: 3,
                                                            shadowOffset: {
                                                                height: 20,
                                                                width: 1
                                                            },
                                                            borderRadius: width * 0.48,
                                                            backgroundColor: '#acd4e5'
                                                        }}
                                                    >
                                                        <View style={{flex: 0, height: width * 0.5, marginBottom: 40}}>
                                                            <TouchableOpacity style={styles.neighborOpacity}>
                                                                <Animatable.Image
                                                                    style={styles.userPhoto}
                                                                    source={require('../../../app/Assets/images/whitney_wolf.jpg')}/>
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => this.sayHello(2)}
                                                                style={styles.hello}
                                                                disabled={this.state.farNeighborGreeted}>

                                                                <Animated.View>
                                                                    <Animated.View
                                                                        style={{
                                                                            left: this.state.translate,
                                                                            transform: [{rotate: spin}]

                                                                        }}>
                                                                        {this.state.farNeighborGreeted ?
                                                                            <Text>+50</Text> :
                                                                            <Icon name="md-hand" size={20}/>}
                                                                    </Animated.View>
                                                                </Animated.View>
                                                            </TouchableOpacity>
                                                            <Animation
                                                                ref={animation => {
                                                                    this.farNeighborHeart = animation;
                                                                }}
                                                                style={{
                                                                    transform: [{rotate: '-21deg'}],
                                                                    position: 'absolute',
                                                                    top: width * 0.28,
                                                                    right: -27,
                                                                    width: 40,
                                                                    height: 40,
                                                                }}
                                                                source={require('../../Assets/lottie/like.json')}
                                                            />
                                                        </View>
                                                        <View style={[styles.titleView, {flex: 1}]}>
                                                            <Text style={styles.titleText}>Whitney Wolf</Text>
                                                            <Text style={styles.subText}>Marketing Guru</Text>
                                                            <Text style={styles.subText}>San Francisco,
                                                                California</Text>
                                                            <Text style={styles.miniText}>Created: 20 minutes ago</Text>
                                                        </View>
                                                        <View style={{flex: 0, height: width * 0.27}}/>


                                                    </View>
                                                </View>
                                            </View>

                                        </Animatable.View>
                                    </View>

                                </View>
                            </ScrollView>
                        </View>
                        <View style={{
                            flex: 3,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}>
                            <TouchableWithoutFeedback onPress={() => this.next()}>
                                <View style={{marginHorizontal: 10}}>
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
                                            <Text style={styles.titleText}>As time passes, your community will
                                                grow.</Text></FadeInView> : null}
                                    {this.state.slide === 4 ?
                                        <FadeInView animationDuration={20} animationDelay={0}>
                                            <Text style={styles.titleText}>For now, just make sure you say hi!</Text>
                                        </FadeInView> : null}
                                    {this.state.slide === 5 ?
                                        <FadeInView animationDuration={20} animationDelay={0}>
                                            <Text style={[styles.subText, {marginHorizontal: 40}]}>And that you come
                                                back some day to make
                                                something beautiful with them!</Text>
                                        </FadeInView> : null}

                                </View>
                            </TouchableWithoutFeedback>

                        </View>
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

/*<View
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
                    </View>*/