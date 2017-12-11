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
import agent from '../../helpers/agent';
import * as Animatable from 'react-native-animatable';
import Interactable from 'react-native-interactable';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';


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
            data: [{name: 'Clean Up the Oceans'}],
            region: {
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
                latitude: 37.78875,
                longitude: -122.4324,

            }
        }
        this._deltaY = new Animated.Value(height - 100);

    }


    render() {


        return (
            <View style={styles.cardContainer}>
                <View style={[{
                    marginHorizontal: 20,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }]}>
                    <Text style={styles.titleText}>
                        Jon Jones | Jimmy Junior </Text>
                </View>
                <View style={[{
                    marginHorizontal: 20,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }]}>
                    <Text style={styles.subText}>
                        {this.props.description}
                    </Text>
                </View>

                <View style={[{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }]}>


                    <View>
                        <MapView
                            style={{width: width, height: height * 0.25, borderRadius: 5}}
                            initialRegion={this.state.region}
                            region={this.state.region}
                            litemode={true}
                        >

                            <MapView.Marker
                                anchor={{x: 0.5, y: 0.5}}
                                coordinate={this.state.coordinate}>
                                <View style={{flexDirection: 'row',}}>
                                    <View
                                        style={[{
                                            alignItems: 'center',
                                        }, {transform: [{translateX: width * 0.08},]}]}
                                    >
                                        <Image style={styles.userPhoto}
                                               source={require('../../../../app/Assets/images/elon_musk.jpeg')}/>

                                    </View>
                                    <View
                                        style={[{
                                            alignItems: 'center'
                                        }, {transform: [{translateX: -width * 0.08}]}]}
                                    >
                                        <Image style={styles.userPhoto}
                                               source={require('../../../../app/Assets/images/whitney_wolf.jpg')}/>
                                    </View>
                                </View>
                            </MapView.Marker>
                        </MapView>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'stretch',
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        alignItems: 'center',
                                        backgroundColor: '#4D81C2',
                                        justifyContent: 'center',
                                    }}>
                                    <Icon name="ios-heart-outline" style={{color: 'white'}} size={25}/>

                                    <Text
                                        style={{
                                            color: 'white',
                                            marginVertical: 10,
                                            fontSize: 14,
                                            marginLeft: 10

                                        }}>

                                        31</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        backgroundColor: '#4D81C2',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Icon name="ios-chatbubbles-outline" style={{color: 'white'}} size={25}/>


                                    <Text
                                        style={{
                                            color: 'white',
                                            marginVertical: 10,
                                            fontSize: 14,
                                            marginLeft: 10
                                        }}>

                                        31</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    flex: 2,
                                    backgroundColor: '#4D81C2',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            marginHorizontal: 20,
                                            marginVertical: 10,
                                            fontSize: 14
                                        }}>
                                        Contribute</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: -50,
                                    backgroundColor: '#9A9CE0',
                                    borderRadius: 5,
                                    paddingVertical: 5,
                                    paddingHorizontal: 7,
                                    marginRight: 7,
                                    marginBottom: 7,
                                    alignSelf: 'flex-start',
                                    flex: 0
                                }}
                            >
                                <Text style={{
                                    color: 'white',
                                    flex: 0,
                                    fontWeight: 'bold'
                                }}>Some location</Text>
                            </View>

                            <View>
                                <Text>{this.props.substory ? this.props.substory : '../' + this.props.name}</Text>
                            </View>

                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
        },
        userPhoto: {
            height: width * 0.1,
            width: width * 0.1,
            borderRadius: width * 0.3,
            alignSelf: 'flex-start'
        },
        titleText: {
            color: '#4D81C2',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginHorizontal: 15,
            width: '100%'

        },
        subText: {
            color: '#4D81C2',
            fontSize: 13,

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
        },
        actionLinearGradient: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },

    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    BumpMainCard
)
;
//
