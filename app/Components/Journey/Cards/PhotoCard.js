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
import ImageResizer from 'react-native-image-resizer';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';
import CommentBar from "./CommentBar";
import CommentBarV2 from "./CommentBarV2";


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
            imgWidth: 0,
            imgHeight: 0,
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
        }
        this._deltaY = new Animated.Value(height - 100);

    }


    componentDidMount() {

        Image.getSize('https://d26p6gt0m19hor.cloudfront.net/assets/donations/home/grid/give-monthly-ac4abafab17cd6b74196227a89e29ecc1f9a6d53c4690dff13556c0352e79112.jpg', (returnWidth, returnHeight) => {
            // calculate image width and height
            console.log(returnWidth);
            console.log(returnHeight)
            console.log(height);
            console.log(width);
            const screenWidth = width;
            const scaleFactor = returnWidth / screenWidth
            const imageHeight = returnHeight / scaleFactor
            this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
        })
    }


    render() {
        const {imgWidth, imgHeight} = this.state


        return (
            <View style={styles.cardContainer}>
                <View style={[{
                    marginHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: 8,
                    flexDirection: 'row',
                    elevation: 5
                }]}>

                    <View style={{
                        height: width * 0.14,
                        width: width * 0.14,
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

                </View>
                <View style={{
                    borderWidth: 0.2,
                    width: '100%',
                    elevation: 2,
                    borderColor: '#cecece',
                    backgroundColor: 'white'
                }}>
                    <Image
                        style={{width: width, height: imgHeight}}
                        source={{uri: 'https://d26p6gt0m19hor.cloudfront.net/assets/donations/home/grid/give-monthly-ac4abafab17cd6b74196227a89e29ecc1f9a6d53c4690dff13556c0352e79112.jpg'}}
                    />

                    <Text style={{
                        fontSize: 12,
                        paddingHorizontal: 10,
                        paddingVertical: 10
                    }}>{this.props.description}</Text>
                </View>
                <CommentBar style={{paddingHorizontal: 7}}/>


            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            alignItems: 'center',
            flex: 1,
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
        },
        userPhoto: {
            height: width * 0.13,
            width: width * 0.13,
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
            width: '100%'

        },

    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    BumpMainCard
)
;
//
