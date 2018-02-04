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
    findNodeHandle,
    Slider,
    Picker,
    Platform,
    StatusBar
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';
import * as Animatable from 'react-native-animatable';
import Interactable from 'react-native-interactable';
import ImageResizer from 'react-native-image-resizer';
import {geoPath, geoMercator} from 'd3-geo';
import Svg, {
    Circle,
    Ellipse,
    G,
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
import LinearGradient from 'react-native-linear-gradient';

import {BlurView} from 'react-native-blur'

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';
import HorizontalAvatar from '../Generic/HorizontalAvatar';


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


class LiveStoryViewCard extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

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
            viewRef: null,
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

    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)});
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

    }

    componentDidMount() {

        Image.getSize('http://www.cocokelley.com/wp-content/uploads/2017/06/the-candy-colored-streets-in-Tallin-Estonia-visual-travel-diary-on-coco-kelley.4.jpg', (returnWidth, returnHeight) => {
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
        console.log('svgHeight: ' + this.state.svgHeight);
        const projection = geoMercator().fitExtent([[0, 0], [60, this.state.svgHeight]], this.state.geojson);
        const pathGenerator = geoPath().projection(projection)


        return (

            <View style={styles.container}>


                {this.props.url === 'liveStoryView1' ?
                    <Image
                        ref={(img) => {
                            this.backgroundImage = img;
                        }}

                        style={{width: width, height: height, position: 'absolute',}}
                        source={require('../../Assets/images/StreetView1.png')}
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />
                    : <Image
                        ref={(img) => {
                            this.backgroundImage = img;
                        }}

                        style={{width: width, height: height, position: 'absolute',}}
                        source={require('../../Assets/images/StreetView2.png')}
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />}
                <BlurView
                    style={{height: height, width: width, position: 'absolute'}}
                    viewRef={this.state.viewRef}
                    blurType="light"
                    blurAmount={2}
                />

                {this.props.url === 'liveStoryView1' ? <Image

                    style={{width: width, height: this.state.imgHeight}}
                    source={require('../../Assets/images/StreetView1.png')}
                    onLoadEnd={this.imageLoaded.bind(this)}
                /> : <Image

                    style={{width: width, height: this.state.imgHeight}}
                    source={require('../../Assets/images/StreetView2.png')}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />}


                <View
                    style={{flexDirection: 'column', position: 'absolute', right: 30, top: 50}}>
                    <Svg
                        style={{marginVertical: 10}}
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

                </View>

                <View style={{
                    position: 'absolute',
                    width: width,
                    bottom: 0,
                    paddingHorizontal: 10,
                    paddingRight: 30
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                            <View style={{flexDirection: 'row',}}>
                                <Icon name="ios-pin-outline" size={20}
                                      color="white"/>
                                <Text style={{color: 'white', fontWeight: 'bold'}}> Nagasaki, Tokyo</Text>
                            </View>

                            <Text style={{color: 'white',}}>4:00 AM</Text>

                            <Text style={{color: 'white',}}>December 20, 2018</Text>

                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>

                            <Text style={{color: 'white', fontSize: 20,}}>2300</Text>
                            <Text style={{color: 'white', fontWeight: 'bold', marginBottom: 10}}>FEET</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Text style={{color: 'white', fontSize: 20,}}>16</Text>
                            <Text style={{color: 'white', fontWeight: 'bold', marginBottom: 10}}>KMS</Text>
                        </View>

                    </View>
                    <View style={{marginBottom: 5, marginTop: 15, flexDirection: 'row', alignItems: 'center',}}>
                        <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                        end={{x: 1, y: .50}}
                                        style={{
                                            marginVertical: 10,
                                            paddingHorizontal: 20,
                                            paddingVertical: 5,
                                            borderRadius: 20,
                                            alignSelf: 'flex-start',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                            <Text style={{color: 'white'}}>Contribute</Text>
                        </LinearGradient>
                        <View style={{flexDirection: 'column', paddingHorizontal: 10,}}>
                            <View>

                                <Text style={{color: 'white', fontWeight: 'bold'}}> We need a Pick Axe!</Text>
                            </View>

                            <View style={{flexDirection: 'row', paddingRight: 20, width: '100%'}}>
                                <View style={{width: '20%', backgroundColor: '#4D81C2', height: 2}}></View>
                                <View style={{width: '70%', backgroundColor: 'white', height: 2}}></View>
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

        container: {
            elevation: 5,
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'red',
            alignItems: 'center'
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
            fontSize: 28,

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
    LiveStoryViewCard
)
;
//

/*    <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    bottom: 20,
                    left: 20
                }}>
                    <View style={{
                        backgroundColor: '#FF6D69',
                        borderRadius: 15,

                    }}>
                        <Text style={{color: 'white', marginHorizontal: 25, marginVertical: 5}}>Live</Text>
                    </View>
                    <Text style={{color: 'white', marginLeft: 10,}}>2 minutes ago</Text>

                </View>*/
