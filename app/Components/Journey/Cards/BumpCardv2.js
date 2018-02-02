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
import SlideAndRotate from '../../Generic/SlideAndRotate';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';
import CommentBar from "./CommentBar";
import Dash from 'react-native-dash';

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


class BumpCardv2 extends React.Component {

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
                <Dash dashColor='#FF6D69' style={{
                    top: 20,
                    marginLeft: 0.08 * width,
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    flexDirection: 'column'
                }}/>



                <View style={[{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>

                    <View style={{
                        borderWidth: 0.2,
                        width: '100%',
                        elevation: 2,
                        borderColor: '#cecece',
                        backgroundColor: 'white'
                    }}>

                        <Icon name="ios-quote"
                              style={{
                                  color: '#FF6D69',
                                  position: 'absolute',
                                  opacity: 0.3,
                                  top: -40,
                                  right: 10
                              }} size={100}/>

                        <View style={[{
                            paddingTop: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingHorizontal: 20,
                        }]}>
                            <View style={{
                                height: width * 0.09,
                                width: width * 0.09,
                                borderRadius: width * 0.3,
                                marginRight: 10,
                                backgroundColor: '#FF6D69',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image style={styles.userPhoto}
                                       source={require('../../../../app/Assets/images/whitney_wolf.jpg')}/>
                            </View>
                            <View>
                                <Text style={styles.titleText}>WHITNEY</Text>
                                <View style={{
                                    backgroundColor: '#FF6D69',
                                    paddingHorizontal: 10,
                                    borderRadius: 20,
                                    paddingVertical: 4,
                                    marginBottom: 5
                                }}>
                                    <Text style={{color: 'white', fontSize: 8}}>.exploring developmental genetics</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
                            <Text style={styles.subText}>
                                {this.props.description}
                            </Text>
                        </View>
                        <FlatList
                            style={{width: '100%'}}
                            data={[{
                                user: 'Bob Dylan',
                                photo: 'uri',
                                'description': 'cat dog man'
                            }, {user: 'Bob Dylan', photo: 'uri', 'description': 'cat dog man'}]}

                            renderItem={({item, index}) =>
                                <View style={{
                                    paddingHorizontal: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                                    paddingVertical: 10,
                                }}>

                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <View style={{
                                            height: width * 0.11,
                                            width: width * 0.11,
                                            borderRadius: width * 0.3,
                                            marginRight: 15,
                                            backgroundColor: '#4D81C2',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                            <Image style={styles.userPhotoSmall}
                                                   source={require('../../../../app/Assets/images/elon_musk.jpeg')}/>
                                        </View>

                                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                            <Text style={{fontSize: 11, color: '#4D81C2', fontWeight: 'bold'}}>HELMA
                                                SCHMIDT</Text>
                                            <Text style={{fontSize: 11, fontWeight: 'bold', color: '#00BDF2'}}>.programming
                                                development</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                                        end={{x: 1, y: .50}}
                                                        style={{
                                                            marginVertical: 5,
                                                            borderRadius: 20,
                                                            alignSelf: 'flex-start',
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>

                                            <Text
                                                style={{
                                                    color: 'white',
                                                    marginVertical: 7,
                                                    marginHorizontal: 20,
                                                    fontSize: 10
                                                }}>Explore</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <View style={{width: width}}>

                            <MapView
                                style={{width: '100%', height: height * 0.2, borderRadius: 5, elevation: 4}}
                                initialRegion={this.state.region}
                                region={this.state.region}
                                litemode={true}
                            >


                                <MapView.Marker
                                    anchor={{x: 0.5, y: 0.5}}
                                    coordinate={this.state.coordinate}>

                                </MapView.Marker>
                            </MapView>

                            <SlideAndRotate style={{position: 'absolute', elevation: 5, right: 20, top: 10}} height={25}
                                            width={25} backgroundColor={'#FF6D69'} icon={'ios-add'}/>

                        </View>
                    </View>
                    <CommentBar/>


                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            alignSelf: 'stretch',
            justifyContent: 'center',
            elevation: 5
        },
        userPhoto: {
            height: width * 0.08,
            width: width * 0.08,
            borderRadius: width * 0.3,
        },
        userPhotoSmall: {
            height: width * 0.1,
            width: width * 0.1,
            borderRadius: width * 0.3,
        },
        titleText: {
            color: '#FF6D69',
            fontWeight: 'bold',
            fontSize: 14,

        },
        subText: {
            color: '#4D81C2',
            fontWeight: 'bold',
            fontSize: 16,

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
    BumpCardv2
)
;
// <View style={{flexDirection: 'row',}}>
/*
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
</View>*/


