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

    Slider, Linking,

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

    linkPress = ()=> {
        Linking.openURL(this.props.url)
    }


    render() {


        return (
            <View style={styles.cardContainer}>

                <TouchableOpacity style={[{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    elevation: 5
                }]}>
                    <View style={{
                        height: width * 0.16,
                        width: width * 0.16,
                        borderRadius: width * 0.3,
                        marginRight: 10,
                        backgroundColor: '#FF6D69',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image style={styles.userPhoto}
                               source={require('../../../../app/Assets/images/whitney_wolf.jpg')}/>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.titleText}>WHITNEY</Text>
                        <View style={{
                            backgroundColor: '#FF6D69',
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 4
                        }}>
                            <Text style={{color: 'white'}}>.exploring developmental genetics</Text>
                        </View>
                    </View>

                </TouchableOpacity>


                <View style={[{
                    flexDirection: 'column',
                    width: '100%',
                    elevation: 20,
                    marginVertical: 15
                }]}>
                    <View
                        style={{flexDirection: 'row', marginHorizontal: 20, elevation: 20}}>
                        <Image style={{width: 20, height: 20, marginTop: 10, borderRadius: 20}}
                               source={{uri: 'http://s2.googleusercontent.com/s2/favicons?domain_url=http://udemy.com'}}
                        />
                        <TouchableWithoutFeedback
                            onPress={() => this.linkPress()}>
                            <View style={{marginHorizontal: 15}}>
                                <Text style={{fontSize: 24, fontWeight: 'bold'}}>Salt & Pepper - The Art of Illustrating
                                    Texture</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <CommentBar/>

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
            height: width * 0.15,
            width: width * 0.15,
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
            fontSize: 20,
            width: '100%'

        },
        subText: {
            color: '#FF6D69',
            fontSize: 13,
            marginVertical: 5

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
