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
import {geoPath, geoMercator} from 'd3-geo';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';
import CommentBarV2 from "../Cards/CommentBarV2";
import HorizontalAvatar from '../../Generic/HorizontalAvatar';


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


class LiveStoryCard extends React.Component {

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
            geojson: {
                "type": "LineString",
                "coordinates": [
                    [
                        -101.744384765625,
                        39.32155002466662
                    ],
                    [
                        -101.5521240234375,
                        39.330048552942415
                    ],
                    [
                        -101.40380859375,
                        39.330048552942415
                    ],
                    [
                        -101.33239746093749,
                        39.364032338047984
                    ],
                    [
                        -101.041259765625,
                        39.36827914916011
                    ],
                    [
                        -100.975341796875,
                        39.30454987014581
                    ],
                    [
                        -100.9149169921875,
                        39.24501680713314
                    ],
                    [
                        -100.843505859375,
                        39.16414104768742
                    ],
                    [
                        -100.8050537109375,
                        39.104488809440475
                    ],
                    [
                        -100.491943359375,
                        39.10022600175347
                    ],
                    [
                        -100.43701171875,
                        39.095962936305476
                    ],
                    [
                        -100.338134765625,
                        39.095962936305476
                    ],
                    [
                        -100.1953125,
                        39.027718840211605
                    ],
                    [
                        -100.008544921875,
                        39.01064750994083
                    ],
                    [
                        -99.86572265625,
                        39.00211029922512
                    ],
                    [
                        -99.6844482421875,
                        38.97222194853654
                    ],
                    [
                        -99.51416015625,
                        38.929502416386605
                    ],
                    [
                        -99.38232421875,
                        38.92095542046727
                    ],
                    [
                        -99.3218994140625,
                        38.89530825492018
                    ],
                    [
                        -99.1131591796875,
                        38.86965182408357
                    ],
                    [
                        -99.0802001953125,
                        38.85682013474361
                    ],
                    [
                        -98.82202148437499,
                        38.85682013474361
                    ],
                    [
                        -98.44848632812499,
                        38.84826438869913
                    ],
                    [
                        -98.20678710937499,
                        38.84826438869913
                    ],
                    [
                        -98.02001953125,
                        38.8782049970615
                    ],
                    [
                        -97.635498046875,
                        38.87392853923629
                    ]
                ]
            },
            svgHeight: 60
        }
        this._deltaY = new Animated.Value(height - 100);

    }


    componentWillMount() {
        const projection = geoMercator();
        const pathGenerator = geoPath().projection(projection)

        var dimensionsArray = pathGenerator.bounds(this.state.geojson);
        var xAspect = Math.abs(dimensionsArray[0][0] - dimensionsArray[1][0]);
        var yAspect = Math.abs(dimensionsArray[0][1] - dimensionsArray[1][1]);
        var aspectRatio = xAspect / yAspect;
        console.log('aspect ratio' + aspectRatio);

        var height = 60 / aspectRatio * 1.2;


        this.setState({
            ...this.state,
            svgHeight: height

        })


        console.log(pathGenerator(this.state.geojson));
        console.log(pathGenerator.bounds(this.state.geojson))


    }

    componentDidMount() {

        Image.getSize('http://www.cocokelley.com/wp-content/uploads/2017/06/the-candy-colored-streets-in-Tallin-Estonia-visual-travel-diary-on-coco-kelley.4.jpg', (returnWidth, returnHeight) => {
            // calculate image width and height
            console.log(returnWidth);
            console.log(returnHeight)
            console.log(height);
            console.log(width);
            const screenWidth = width * 0.85;
            const scaleFactor = returnWidth / screenWidth
            const imageHeight = returnHeight / scaleFactor
            this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
        })
    }


    render() {
        console.log('svgHeight: ' + this.state.svgHeight);
        const projection = geoMercator().fitExtent([[0, 0], [60, this.state.svgHeight]], this.state.geojson);
        const pathGenerator = geoPath().projection(projection)


        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.cardContainer}>
                    <View style={styles.cardContainer}>

                        <Image
                            style={{width: width, height: this.state.imgHeight}}
                            source={{uri: 'http://www.cocokelley.com/wp-content/uploads/2017/06/the-candy-colored-streets-in-Tallin-Estonia-visual-travel-diary-on-coco-kelley.4.jpg'}}/>
                        <View style={{
                            width: width,
                            height: this.state.imgHeight,
                            position: 'absolute',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>

                        </View>
                        <View style={{
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            width: width,
                            justifyContent: 'flex-start',
                            position: 'absolute',
                            top: 40,
                            left: 20
                        }}>
                            <Text style={styles.subStoryText}>
                                /{this.props.substory.toUpperCase()}
                            </Text>
                            <View>
                                <Text style={styles.titleText}>
                                    {this.props.name.toUpperCase()}
                                </Text>
                            </View>

                        </View>

                        <View style={{
                            position: 'absolute',
                            alignItems: 'center',
                            flexDirection: 'column',
                            bottom: 0,
                            width: '100%',

                        }}>
                            <View style={{
                                flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.4)',width: '100%', alignItems: 'center'
                            }}>
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <Icon name="ios-photos-outline" style={{color: 'white', marginTop: 10}} size={25}/>
                                    <Text
                                        style={{color: 'white', marginHorizontal: 25, marginBottom: 5}}>25</Text>
                                </View>
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <Svg
                                        style={{marginTop: 10, }}
                                        height={this.state.svgHeight}
                                        width={60}
                                    >
                                        <Path
                                            d={pathGenerator(this.state.geojson)}
                                            fill="none"
                                            stroke="white"
                                            strokeWidth={2}
                                        />
                                    </Svg>
                                    <Text style={{color: 'white', marginVertical: 5,}}>Madrid, Spain</Text>
                                </View>
                            </View>
                            <CommentBarV2 color={'white'} likes={10} comments={20} style={{marginHorizontal: 15}}/>


                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            position: 'absolute',
            width: width * 0.85,
            height: height * 0.5,
            elevation: 5,
            bottom: 5
        },
        userPhoto: {
            height: width * 0.1,
            width: width * 0.1,
            alignSelf: 'flex-start'
        },
        titleText: {
            flexWrap: 'wrap',
            marginRight: 20,
            color: 'white',
            fontWeight: "900",
            fontSize: 22,
            marginTop: -4

        },
        subStoryText: {
            color: 'white',
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
    LiveStoryCard
)
;
//
