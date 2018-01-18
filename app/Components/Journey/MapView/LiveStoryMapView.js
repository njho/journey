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
import update from 'immutability-helper';

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
import MapView, {MAP_TYPES} from 'react-native-maps';
import Animation from 'lottie-react-native';
import HorizontalAvatarJourney from '../../Generic/HorizontalAvatarJourney';
import CommentBarV2 from "../Cards/CommentBarV2";
import MapDocumentCard from './MapDocumentCard';

import MapBumpCard from "./MapBumpCard";
import MapJourneyCard from './MapJourneyCard';

import BackgroundGeolocation from "react-native-background-geolocation";

const TRACKER_HOST = 'http://tracker.transistorsoft.com/locations/';


const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.1;

const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;

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


class LiveJourneyView extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };


    constructor(props) {
        super(props);
        const _deltaY = new Animated.Value(0);
        this.state = {
            imgWidth: 0,
            imgHeight: 0,
            rotate: new Animated.Value(0),
            translate: new Animated.Value(0),
            status: 0,
            personalJourney: null,
            cardData: [{
                type: 'bump',
                name: 'Clean Up the Oceans',
                coordinate: {
                    latitude: 37.78875,
                    longitude: -122.4324,
                },
            }, {
                type: 'journey',
                name: 'three', coordinate: {
                    latitude: 37.789752,
                    longitude: -122.388521,

                },

            },
                {
                    type: 'photo',
                    name: 'three', coordinate: {
                    latitude: 37.826669,
                    longitude: -122.479980,
                }
                },
                {
                    type: 'document',
                    name: 'four', coordinate: {
                    latitude: 37.703780,
                    longitude: -122.471763,
                }
                }
            ],
            inFocus: 0,
            region: new MapView.AnimatedRegion({
                latitude: 37.78875,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }),
            coordinate: {
                latitude: 37.78875,
                longitude: -122.4324,
            },
            markers: {
                entryOne: {
                    type: 'bump',
                    coordinate: {
                        latitude: 37.78875,
                        longitude: -122.4324,
                    },
                    stats: {
                        likes: 20,
                        comments: 10
                    }
                },
                entryTwo: {
                    type: 'journey',
                    coordinate: {
                        latitude: 37.789752,
                        longitude: -122.388521,
                    },
                    stats: {
                        likes: 20,
                        comments: 40
                    }

                },
                entryThree: {
                    type: 'photo',
                    coordinate: {
                        latitude: 37.826669,
                        longitude: -122.479980,
                    },
                    stats: {
                        likes: 35,
                        comments: 12
                    }
                },
                entryFour: {
                    type: 'document',
                    coordinate: {
                        latitude: 37.703780,
                        longitude: -122.471763,
                    },
                    stats: {
                        likes: 18,
                        comments: 15
                    }
                }
            },
            opacityAnim: new Animated.Value(1),
            _deltaY
        }

        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)


    }

    componentDidMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);

        const {region, coordinate, _deltaY} = this.state;

        region.stopAnimation();


        region.timing({
            latitude: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [
                    coordinate.latitude - (LATITUDE_DELTA * 0.5 ),
                    coordinate.latitude,
                ],
                extrapolate: 'clamp',
            }),
            longitude: -122.4324,
            latitudeDelta: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 15],
                extrapolate: 'clamp',
            }),
            longitudeDelta: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [LONGITUDE_DELTA * 0.5, LONGITUDE_DELTA * 1.15],
                extrapolate: 'clamp',
            }),

            duration: 0,
        }).start();
    }


    markerClick = (e, key, index) => {
        const {region, coordinate, _deltaY} = this.state;
        console.log('marker click');
        console.log(e.nativeEvent);
        console.log('a Marker has been clicked!');
        console.log(key);
        console.log(_deltaY);

        this.interactable.snapTo({index: 0});

        this.setState({
            ...this.state,
            inFocus: index
        })
        region.stopAnimation();
        region.timing({
            latitude: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [
                    e.nativeEvent.coordinate.latitude - (LATITUDE_DELTA * 0.5 ),
                    e.nativeEvent.coordinate.latitude,
                ],
                extrapolate: 'clamp',
            }),
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 15],
                extrapolate: 'clamp',
            }),
            longitudeDelta: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [LONGITUDE_DELTA * 0.5, LONGITUDE_DELTA * 1.15],
                extrapolate: 'clamp',
            }),
            duration: 0,
        }).start();

        this.scrollView.scrollToIndex({animated: false, index: index});

        // this.scrollViewSwiped({
        //     viewableItems: [{
        //         item: {
        //             coordinate: this.state.markers[key].coordinate
        //         }
        //     }], changed: []
        // })


    }

    onDragEvent = (e, info) => {
        console.log(e.nativeEvent);
    }

    onSnapEvent = (event) => {
        console.log('in onSnap');
        console.log(this.state._deltaY)
        const {region, coordinate} = this.state;
        const snapPointId = event.nativeEvent.id;
        console.log(`drawer state is ${snapPointId}`);
        if (event.nativeEvent.id === 'close') {
            this.setState({
                ...this.state,
                inFocus: null
            })
        }

    }

    handleViewableItemsChanged = ({viewableItems, changed}) => {

        const {region, coordinate, _deltaY} = this.state;
        console.log('scrollViewSwiped');
        console.log(viewableItems);
        console.log(viewableItems[0].index);
        console.log(changed);
        console.log('this is deltaY:' + _deltaY);
        console.log(_deltaY);


        this.setState({
            ...this.state,
            inFocus: viewableItems[0].index
        })

        region.stopAnimation();
        region.timing({
            latitude: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [
                    viewableItems[0].item.coordinate.latitude - (LATITUDE_DELTA * 0.5 ),
                    viewableItems[0].item.coordinate.latitude,
                ],
                extrapolate: 'clamp',
            }),
            longitude: viewableItems[0].item.coordinate.longitude,
            latitudeDelta: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 15],
                extrapolate: 'clamp',
            }),
            longitudeDelta: _deltaY.interpolate({
                inputRange: [0, 592],
                outputRange: [LONGITUDE_DELTA * 0.5, LONGITUDE_DELTA * 1.15],
                extrapolate: 'clamp',
            }),
            duration: 0,
        }).start();
        this.interactable.snapTo({index: 0})

        // console.log('Visible items are', viewableItems);
        // console.log('Changed in this iteration', changed);
    }

    renderMarker(key, index) {

        switch (this.state.markers[key].type) {
            case 'document':
                return <MapView.Marker
                    onPress={(e) => this.markerClick(e, key, index)}
                    key={index}
                    coordinate={this.state.markers[key].coordinate}>
                    <View
                        style={[{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: 0.11 * width,
                            height: 0.11 * width,
                            borderRadius: 0.11 * width,
                            borderColor: '#538FB7',
                            borderWidth: 1,
                        }]}
                    >
                        <View
                            style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#538FB7',
                                width: 0.1 * width,
                                height: 0.1 * width,
                                borderRadius: 0.1 * width
                            }]}
                        >
                            <Icon name="ios-document-outline"
                                  style={{
                                      color: 'white',
                                      margin: 10
                                  }} size={20}/>
                        </View>
                    </View>
                </MapView.Marker>

                break;

            case 'bump':
                return <MapView.Marker
                    onPress={(e) => this.markerClick(e, key, index)}
                    key={index}
                    coordinate={this.state.markers[key].coordinate}>
                    <View
                        style={[{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: 0.11 * width,
                            height: 0.11 * width,
                            borderRadius: 0.11 * width,
                            borderColor: '#ca449d',
                            borderWidth: 1,
                        }]}
                    >
                        <View
                            style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#CA449D',
                                width: 0.1 * width,
                                height: 0.1 * width,
                                borderRadius: 0.1 * width
                            }]}
                        >
                            <Icon name="ios-wifi-outline"
                                  style={{
                                      color: 'white',
                                  }} size={25}/>
                        </View>
                    </View>
                </MapView.Marker>

                break;
            default:
                return <MapView.Marker
                    onPress={(e) => this.markerClick(e, key, index)}
                    key={index}
                    anchor={{x: 0.5, y: 1}}
                    coordinate={this.state.markers[key].coordinate}>
                    <View
                        style={[{
                            alignItems: 'center',
                            justifyContent: 'center',

                        }]}
                    >
                        <View>
                            <Image
                                style={{
                                    flex: 1,
                                    width: 0.1 * width,
                                    height: 0.1 * width / 0.816,
                                }}
                                source={require('../../../Assets/images/MarkerBlue.png')}/>

                        </View>
                    </View>
                </MapView.Marker>
                break;

        }
    }

    renderFlatList(item) {

        switch (item.type) {
            case 'bump':
                return <MapBumpCard/>
            case 'journey':
                return <MapJourneyCard substory={"catDog"} name={"This is the name"}/>
            case 'document':
                return <MapDocumentCard/>
            default:
                return <MapBumpCard/>
        }

    }

    render() {
        const {region, _deltaY} = this.state;
        console.log('is this re-rendered');

        let opacityAnim = this.state.opacityAnim;


        return (
            <View style={styles.cardContainer}>

                <MapView.Animated
                    style={{alignSelf: 'stretch', bottom: 0, borderRadius: 5, height: height * 0.9,}}
                    ref={ref => {
                        this.map = ref;
                    }}
                    mapType={MAP_TYPES.TERRAIN}
                    region={region}
                >

                    {Object.keys(this.state.markers).map((key, index) => (

                        (this.state.inFocus === index) ?

                            <MapView.Marker
                                onPress={(e) => this.markerClick(e, key, index)}
                                key={index}
                                anchor={{x: 0.5, y: 1}}
                                coordinate={this.state.markers[key].coordinate}>
                                <Animated.View
                                    style={[{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: opacityAnim

                                    }]}
                                >
                                    <View>
                                        <Image
                                            style={{
                                                flex: 1,
                                                width: 0.4 * width,
                                                height: 0.4 * width / 0.816,
                                            }}
                                            source={require('../../../Assets/images/MarkerRose.png')}/>
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            alignItems: 'center'
                                        }}>
                                            <Image style={styles.userPhoto}
                                                   source={{uri: "https://i.imgur.com/sNam9iJ.jpg"}}/>
                                        </View>

                                    </View>
                                </Animated.View>
                            </MapView.Marker> :
                            this.renderMarker(key, index)
                    ))}

                </MapView.Animated>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'absolute',
                    width: width,
                    height: height * 0.9,
                    top: 0,

                }}>

                </View>
                <Animated.View style={{
                    width: width, height: height * 0.1, alignItems: 'center',

                }}>
                    <Button title="test" onPress={() => {
                        this.handleViewableItemsChanged();
                        this.setState({
                            ...this.state,
                            coordinate: {
                                latitude: 40.826669,
                                longitude: -100.479980,
                            },
                        })
                    }}/>
                </Animated.View>


                <View
                    style={{position: 'absolute', bottom: height * 0.1}}>

                    <Interactable.View
                        ref={ref => {
                            this.interactable = ref;
                        }}
                        verticalOnly={true}
                        snapPoints={[{y: 0, damping: 0.6, tension: 400, id: 'open'}, {
                            y: height,
                            damping: 0.6,
                            tension: 400,
                            id: 'close'
                        }]}
                        boundaries={{top: -300}}

                        initialPosition={{y: height}}
                        animatedValueY={_deltaY}
                        onDrag={this.onDragEvent}
                        onSnap={this.onSnapEvent.bind(this)}>
                        <FlatList
                            data={this.state.cardData}
                            ref={(scrollView) => {
                                this.scrollView = scrollView;
                            }}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={
                                this.handleViewableItemsChanged
                            }
                            renderItem={({item}) =>
                                <View key={item.name} style={{
                                    width: width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 5
                                }}>
                                    {this.renderFlatList(item)}
                                </View>
                            }
                        />


                    </Interactable.View>
                </View>

            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        userPhoto: {
            marginTop: 0.015 * width,
            height: 0.37 * width,
            width: 0.37 * width,
            borderRadius: width * 0.3,
        },
        titleText: {
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#F96D69'
        },
        cardTitle: {
            color: 'white',
            textAlign: 'center',
        },
    });


export default connect(mapStateToProps, mapDispatchToProps)

(
    LiveJourneyView
)
;
// //