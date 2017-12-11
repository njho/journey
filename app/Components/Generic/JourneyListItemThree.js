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


class JourneyListItem extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            animate: new Animated.Value(0),
            isVisible: false
        }
    }

    descriptionToggle(isVisible) {
        if (isVisible) {
            Animated.timing(
                this.state.animate,
                {
                    toValue: 0,
                    duration: 350,
                    delay: 100 * this.props.index,
                }
            ).start(
                this.setState({
                    ...this.state,
                    isVisible: false
                })
            );
        } else {
            Animated.timing(
                this.state.animate,
                {
                    toValue: 1,
                    duration: 350,
                    delay: 100 * this.props.index,
                }
            ).start(
                this.setState({
                    ...this.state,
                    isVisible: true
                })
            );
        }

    }

    toggle() {
        this.setState({
            ...this.state,
            selected: !this.state.selected
        })

    }

    _keyExtractor = (item, index) => item.id;


    render() {

        const translateUp = this.state.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [height * 0.33, 0]
        });
        const translateOpacity = this.state.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        var image = this.props.index % 2 === 0 ? require('../../../app/Assets/images/asset3.jpg') : require('../../../app/Assets/images/asset2.jpg')
        return (
            <View>
                {this.props.animate ?
                    <FadeInView
                        animationDuration={2000} animationDelay={this.props.index * 200}
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flex: 1,
                            height: height * 0.33,
                            backgroundColor: this.props.index % 2 === 0 ? '#f9f9f9' : 'white'
                        }}>
                        <TouchableOpacity
                            style={{position: 'absolute'}}>
                            <Image
                                style={{width: width, height: height * 0.33,}}
                                source={image}/>
                        </TouchableOpacity>
                        <Animated.View
                            style={[{
                                position: 'absolute',
                                width: width,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                height: height * 0.33,
                                padding: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, {transform: [{translateY: translateUp}]}]}>
                            <Text style={{color: 'white', marginBottom: 50}}>{this.props.description}</Text>
                        </Animated.View>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            bottom: 0,
                            flexDirection: 'row',
                            width: width,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                                          onPress={() => this.descriptionToggle(this.state.isVisible)}

                        >
                            <Text style={styles.titleText}>{this.props.name}</Text>
                        </TouchableOpacity>
                    </FadeInView> : null}
            </View>
        )
            ;
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            elevation: 10,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: 40,
        },
        titleText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
        },
        subText: {
            color: '#5690d8',
            fontSize: 12,

        },
        button: {
            backgroundColor: '#86E5C6',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginTop: 5,
            marginBottom: 5,
            paddingVertical: 7,
            marginRight: 5,
        },
        buttonText: {
            color: 'white',
            fontSize: 12,
            marginHorizontal: 15,
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)(JourneyListItem);
//
