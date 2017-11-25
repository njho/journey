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


class BumpMainCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.Value(0),
            translate: new Animated.Value(0),
            status: 0,
            personalJourney: null,
            data: [{name: 'Clean Up the Oceans'}]
        }
        this._deltaY = new Animated.Value(height - 100);

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log('received props');
        if (nextProps.animate === true) {
            Animated.sequence([
                Animated.timing(
                    this.state.rotate,
                    {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.elastic(),
                        delay: 500,
                    }),
                Animated.timing(
                    this.state.translate, {
                        toValue: 1,
                        duration: 750,
                        easing: Easing.elastic()
                    })
            ]).start(() => this.setState({...this.state, status: 1}));
        }
    }


    render() {
        console.log(this.props);
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
            outputRange: [0, width * 0.07]
        })
        const translateNegative = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -width * 0.07]
        })

        const moveLeft = this.state.translate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0]
        })


        return (
            <View style={styles.cardContainer}>

                <Animatable.View style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: width * 0.2,
                    width: '100%',
                }, {transform: [{translateX: moveLeft}]}]}>

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
                </Animatable.View>

                <Text style={styles.titleText}>November 17, 2017</Text>
                <Text style={styles.subText}>-110.14123, 112.51238</Text>


            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            alignSelf: 'stretch',
            backgroundColor: 'white',
            paddingVertical: 30,
            elevation: 10,
            paddingHorizontal: 15,
            marginBottom: 20,
            marginHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        userPhoto: {
            height: width * 0.15,
            width: width * 0.15,
            borderRadius: width * 0.3,
            alignSelf: 'flex-start'
        },
        titleText: {
            color: '#9A9CE0',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginHorizontal: 15,
            width: '100%'

        },
        subText: {
            textAlign: 'center',
            color: '#9A9CE0',
            marginTop: 4,
            marginHorizontal: 35,
            fontSize: 13,

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
    BumpMainCard
)
;
//
