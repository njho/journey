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
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';
import update from 'immutability-helper';


import PriceMarker from '../helpers/PriceMarkers'
import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';
import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';
import FadeInView from "../helpers/FadeInView";


import agent from '../helpers/agent.js';
import {daytimeMap, nighttimeMap} from "../helpers/constants";
import wrapWords from '../helpers/quoteParser';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const LATITUDE_DELTA = 0.0062;
const LONGITUDE_DELTA = 0.0021;


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const SLIDE_IN_DOWN_KEYFRAMES = {
    from: {translateY: -10},
    to: {translateY: 0},
};


class LocationCommunity extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this._deltaY = new Animated.Value(0);


        this.state = {
            translate: new Animated.Value(0),
            scaleOne: new Animated.Value(0),
            scaleTwo: new Animated.Value(0),
            dropVisible: true,
            dummy: new Animated.Value(0),
            status: 0,
            journeyName: null,
            description: null,
            cardFront: true,
            tagInput: null,
            tags: []
        };
    }


    componentDidMount() {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(
                    this.state.translate,
                    {
                        toValue: 1,
                        duration: 1700,
                        delay: 100,
                        easing: Easing.exp
                    }
                ),
                Animated.timing(
                    this.state.translate, {
                        toValue: 0.85,
                        duration: 250,
                        easing: Easing.out(Easing.ease)
                    }
                )
            ]).start(() => this.setState({
                ...this.state,
                dropVisible: false
            })),
            Animated.timing(
                this.state.dummy,
                {
                    toValue: 1,
                    duration: 1500,
                    delay: 100
                }
            ).start(() => {
                this.scan.play()
            })


        ])
    }


    textHandler(value, text) {
        console.log(text);
        switch (value) {
            case 1:
                this.setState({
                    ...this.state,
                    journeyName: text
                });
                break;

            case 2:
                this.setState({
                    ...this.state,
                    description: text
                });
                break;
            case 3:
                let length = text.length;
                if (text.substring(length - 1) === ',') {
                    let tags = update(this.state.tags, {$push: [text.substring(0, length - 1)]});
                    this.setState({
                        ...this.state,
                        tagInput: null,
                        tags: tags
                    })
                } else {
                    this.setState({
                        ...this.state,
                        tagInput: text
                    })
                }

                break;
        }
    }

    tagsMap = () => {
        if (this.state.tags) {
            return this.state.tags.map((tag, index) => {

                return (
                    <View
                        style={{
                            backgroundColor: '#7dddd9',
                            borderRadius: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 7,
                            marginRight: 7,
                            marginBottom: 7,
                            alignSelf: 'flex-start',
                            flex: 0
                        }}
                        key={index}
                    >
                        <Text style={{color: '#210c2b', flex: 0}}>{tag}</Text>
                    </View>

                );
            })
        } else {
            return
        }


    }

    textInputFocus(value) {

        switch (value) {
            case 1:
                Animated.timing(
                    this.state.scaleOne,
                    {
                        toValue: 1,
                        duration: 300,
                    }
                ).start()
                break;
            case 2:
                Animated.timing(
                    this.state.scaleTwo,
                    {
                        toValue: 1,
                        duration: 300,
                    }
                ).start()
        }


    }


    render() {

        const translate = this.state.translate.interpolate({
            inputRange: [0, 1],
            outputRange: [-height / 2, height * 0.02]
        })
        const scaleOne = this.state.scaleOne.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.75]
        })
        const inversescaleOne = this.state.scaleOne.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.09]
        })
        const scaleTwo = this.state.scaleTwo.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.75]
        })
        const inversescaleTwo = this.state.scaleTwo.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.09]
        })

        return (
            <View style={styles.container}>
                <LinearGradient colors={['#16171C', '#16171C']}
                                style={{flex: 1, position: 'absolute', alignItems: 'center', width: '100%'}}>
                </LinearGradient>
                <View style={{
                    flex: 1,
                    width: width,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                    {this.state.dropVisible ?
                        <Animated.View
                            style={[{
                                position: 'absolute',
                                borderRadius
                                    : 10,
                                height: 10,
                                width: 10,
                                backgroundColor: 'white'
                            }, {transform: [{translateY: translate}]}]}
                        >
                        </Animated.View> : false


                    }
                    {this.state.status === 0 ?
                        <Animation
                            ref={animation => {
                                this.scan = animation;
                            }}
                            style={{
                                width: 200,
                                height: 200
                            }}
                            source={require('../../Assets/lottie/ripple2.json')}
                        /> : null}


                    {
                        this.state.status === 0 ?
                            <TouchableWithoutFeedback onPress={() => this.setState({...this.state, status: 1})}>
                                <View style={{position: 'absolute', width: '100%'}}>

                                    <FadeInView animationDuration={2000} animationDelay={3000}>

                                        <Text style={{
                                            color: 'white',
                                            fontSize: 38,
                                            fontWeight: '600',
                                            marginVertical: 15,
                                            marginHorizontal: 15,
                                            textAlign: 'center'
                                        }}>Fascinating,</Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 18,
                                                fontWeight: '300',
                                                textAlign: 'center',
                                                marginBottom: 40
                                            }}>That
                                            a story should start here.</Text>
                                    </FadeInView>

                                </View>
                            </TouchableWithoutFeedback> : null

                    }
                    {this.state.status === 1 ?

                        <View style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%'
                        }}>
                            <Animatable.View animation="slideInUp" direction="alternate" style={{
                                paddingBottom: 80,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <Animated.View
                                    style={{
                                        transform: [
                                            {scale: scaleOne},
                                            {perspective: 1000} // without this line this Animation will not render on Android while working fine on iOS
                                        ]
                                    }}
                                >
                                    <FadeInView animationDuration={350} animationDelay={0}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 38,
                                            fontWeight: '600',
                                            marginVertical: 15,
                                            marginHorizontal: 15,
                                            textAlign: 'center'
                                        }}>Tell me,</Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 18,
                                                fontWeight: '300',
                                                textAlign: 'center'
                                            }}>
                                            What is the name of this Journey?

                                        </Text>
                                    </FadeInView>
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        transform: [
                                            {scale: inversescaleOne},
                                            {perspective: 1000} // without this line this Animation will not render on Android while working fine on iOS
                                        ]
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            marginTop: 20,
                                            textAlign: 'center',
                                            width: width * 0.75,
                                            fontSize: 20,
                                            color: 'white',
                                        }}
                                        onChangeText={(text) => this.textHandler(1, text)}
                                        value={this.state.journeyName}
                                        underlineColorAndroid='white'
                                        autoFocus={false}
                                        onSubmitEditing={() => this.setState({...this.state, status: 2})}
                                        autoCapitalize="sentences"
                                        onFocus={() => this.textInputFocus(1)}

                                    />
                                </Animated.View>

                            </Animatable.View>
                        </View>
                        : null
                    }

                    {this.state.status === 2 ?

                        <View style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%'
                        }}>
                            <Animatable.View animation="slideInUp" direction="alternate" style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <Animated.View
                                    style={{
                                        transform: [
                                            {scale: scaleTwo},
                                            {perspective: 1000} // without this line this Animation will not render on Android while working fine on iOS
                                        ]
                                    }}
                                >
                                    <FadeInView animationDuration={350} animationDelay={0}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 38,
                                            fontWeight: '600',
                                            marginVertical: 15,
                                            marginHorizontal: 15,
                                            textAlign: 'center'
                                        }}>Amazing,</Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 18,
                                                fontWeight: '300',
                                                textAlign: 'center'
                                            }}>
                                            And what is this about?
                                        </Text>
                                    </FadeInView>
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        transform: [
                                            {scale: inversescaleTwo},
                                            {perspective: 1000} // without this line this Animation will not render on Android while working fine on iOS
                                        ]
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            marginTop: 20,
                                            textAlign: 'center',
                                            width: width * 0.75,
                                            fontSize: 20,
                                            color: 'white',
                                        }}
                                        onChangeText={(text) => this.textHandler(2, text)}
                                        value={this.state.description}
                                        underlineColorAndroid='white'
                                        autoFocus={false}
                                        onSubmitEditing={() => this.setState({...this.state, status: 3})}
                                        autoCapitalize="sentences"
                                        onFocus={() => this.textInputFocus(2)}

                                    />
                                </Animated.View>

                            </Animatable.View>


                            <FadeInView animationDuration={350} animationDelay={0}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 12,
                                        fontWeight: '300',
                                        textAlign: 'center',
                                        marginTop: 15,
                                        marginHorizontal: 30
                                    }}>
                                    No explanation needed?
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 12,
                                        fontWeight: '300',
                                        textAlign: 'center',
                                        marginHorizontal: 30,
                                        paddingBottom: 70
                                    }}>
                                    Skip this. </Text>

                            </FadeInView>

                        </View>
                        : null
                    }

                    {this.state.status === 3 ?
                        <Interactable.View
                            verticalOnly={true}
                            snapPoints={[{y: height / 2}, {y: -(height * 0.5 )}]}
                            dragEnabled={this.state.quoteAnimationCompleted}
                            animatedValueY={this._deltaY}
                            style={{height: height * 2}}
                            initialPosition={{x: 0, y: height / 2}}
                        >

                            <View style={{
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: height,
                                width: width,
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Animatable.View animation="slideInUp" direction="alternate" style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                }}>


                                    <FadeInView animationDuration={350} animationDelay={0}
                                                style={{
                                                    width: width,
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    paddingHorizontal: 15
                                                }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 30,
                                            fontWeight: '600',
                                            marginVertical: 15,
                                        }}>Excellent,</Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                fontWeight: '300',
                                            }}>
                                            Your Journey has been committed!
                                        </Text>
                                    </FadeInView>
                                    <TouchableOpacity style={{width: width}} onPress={() => this.setState({
                                        ...this.state,
                                        cardFront: !this.state.cardFront
                                    })}>
                                        <View style={{
                                            marginHorizontal: 60,
                                            paddingVertical: 20,
                                            paddingHorizontal: 30,
                                            marginVertical: 40,
                                            backgroundColor: 'white',
                                            flexDirection: 'column',
                                            borderRadius: 5,
                                            alignSelf: 'stretch',
                                            alignItems: 'center'
                                        }}>
                                            {this.state.cardFront === true ?
                                                <View style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    marginVertical: 60,
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 40,
                                                        color: '#88aee3',
                                                        textAlign: 'center',
                                                        marginBottom: 20
                                                    }}>
                                                        {this.state.journeyName} </Text>
                                                    <Text style={{fontSize: 12, textAlign: 'center'}}>
                                                        Started </Text>
                                                    <Text style={{fontSize: 12, marginBottom: 10, textAlign: 'center'}}>
                                                        November 18, 2017</Text>
                                                </View>
                                                :
                                                <View style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    marginVertical: 60,
                                                }}>
                                                    <Text style={{fontSize: 12, marginBottom: 10, textAlign: 'center'}}>
                                                        {this.state.description}</Text>
                                                </View>

                                            }


                                            <Image style={[styles.cardUserPhoto]}
                                                   source={require('../../../app/Assets/images/elon_musk.jpeg')}/>

                                        </View>
                                    </TouchableOpacity>


                                </Animatable.View>
                                <View style={{paddingBottom: 30}}>
                                    <Animatable.Text animation={SLIDE_IN_DOWN_KEYFRAMES} iterationCount="infinite"
                                                     direction="alternate"><Icon name="ios-arrow-down" size={45}
                                                                                 color="white"/>️</Animatable.Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                height: height,
                                width: width,
                                alignItems: 'center',
                                flex: 1,
                            }}>
                                <Animatable.View animation="slideInUp" direction="alternate" style={{
                                    alignItems: 'center',
                                    height: height,
                                    flex: 1,
                                    marginTop: 50,

                                }}>

                                    <FadeInView animationDuration={350} animationDelay={0}
                                                style={{
                                                    width: width,
                                                    flexDirection: 'column',
                                                    paddingHorizontal: 15,
                                                    height: height,
                                                }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 30,
                                            fontWeight: '600',
                                            marginVertical: 15,
                                        }}>Help others find and <Text style={{color: '#7dddd9'}}>contribute</Text> to
                                            your
                                            Journey with <Text style={{color: '#7dddd9'}}>Tags</Text></Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                fontWeight: '300',
                                            }}>
                                            Separate <Text style={{color: '#7dddd9'}}>Tags</Text> with a comma
                                        </Text>
                                        <TextInput
                                            style={{
                                                marginTop: 20,
                                                width: width * 0.75,
                                                fontSize: 20,
                                                color: 'white',
                                            }}
                                            onChangeText={(text) => this.textHandler(3, text)}
                                            value={this.state.tagInput}
                                            underlineColorAndroid='white'
                                            autoFocus={false}
                                            onSubmitEditing={() => this.setState({...this.state, status: 2})}
                                            autoCapitalize="sentences"
                                            onFocus={() => this.textInputFocus(1)}

                                        />


                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            {this.tagsMap()}
                                        </View>
                                        <View style={{
                                            marginHorizontal: 15,
                                            flexDirection: 'column',
                                            width: '100%',
                                            position: 'absolute',
                                            bottom: 70
                                        }}>
                                            <TouchableWithoutFeedback>
                                                <View>
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: 15,
                                                            fontWeight: '300',
                                                            textAlign: 'center',
                                                            alignSelf: 'stretch',
                                                            marginBottom: 20,
                                                            marginRight: 20
                                                        }}>
                                                        Finish
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 15,
                                                    fontWeight: '300',
                                                    marginBottom: 15
                                                }}>
                                                See how others have <Text
                                                style={{color: '#7dddd9', flex: 0}}>Tagged </Text>
                                                similar Journeys
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    backgroundColor: 'white',
                                                    borderRadius: 5,
                                                    paddingHorizontal: 15,
                                                    alignSelf: 'stretch'

                                                }}>


                                                <ScrollView
                                                    horizontal={true}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                        <Image style={[styles.userPhoto, {marginVertical: 15}]}
                                                               source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                                                        <View
                                                            style={{flexDirection: 'column', justifyContent: 'center'}}>
                                                            <Text style={{
                                                                color: '#210c2b',
                                                                fontWeight: 'bold',
                                                                fontSize: 14
                                                            }}>
                                                                An Example </Text>
                                                            <Text style={{color: '#210c2b', fontSize: 12}}>
                                                                Elon Musk </Text>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingLeft: 15,
                                                        }}>
                                                            {this.tagsMap()}
                                                        </View>

                                                    </View>

                                                </ScrollView>
                                            </View>


                                        </View>

                                    </FadeInView>
                                </Animatable.View>

                            </View>
                        </Interactable.View>
                        : null
                    }

                    {this.state.status >= 1 && this.state.status < 3 ?
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: width,
                            position: 'absolute',
                            bottom: 0
                        }}>
                            <FadeInView animationDuration={350} animationDelay={0}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width,
                                            position: 'absolute',
                                            bottom: 0
                                        }}>
                                <Image style={styles.userPhoto}
                                       source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                                        An Example </Text>
                                    <Text style={{color: 'white', fontSize: 12}}>
                                        Elon Musk </Text>
                                </View>
                            </FadeInView>

                        </View>
                        :
                        null}


                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210c2b',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },

    placeholderText: {
        color: '#ff7b74',
        opacity: 0.8,
        textAlign: 'center',
        width: '100%',
        justifyContent: 'space-around',
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
        borderWidth: 2,
        borderColor: 'white',
        height: width * 0.13,
        width: width * 0.13,
        borderRadius: width * 0.3,
        paddingHorizontal: 20,
        marginRight: 10,
        marginVertical: 40,
    },
    cardUserPhoto: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: 'white',
        height: width * 0.1,
        width: width * 0.1,
        borderRadius: width * 0.1,
        marginRight: 10,
        marginBottom: 10

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationCommunity);


/*
*                      <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Tell me, what is the name of
                            this Journey?</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>And why is this
                            important?</Text>

                        <Text style={{color: 'white', fontSize: 20, fontWeight: '300'}}>Or maybe, it's just for fun?</Text>


                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Please tag yours to help others contribute.</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Interesting, it seems like
                            similar Journey's have led individuals to:</Text>


                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Would you like to include anyone in this genesis?</Text>

                        <Text style={{color: 'white', fontSize: 24, fontWeight: '300'}}>Excellent. Remember, Journey is a tool to help others find you. Moments captured in Journey can be reconstructed throughout time. Your Journey starts now.</Text>



*
* */


/*
*/