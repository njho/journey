import React from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import Interactable from 'react-native-interactable';
import * as Animatable from 'react-native-animatable';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    locationMeta: state.communityReducer
});

const mapDispatchToProps = dispatch => ({
    timeToggle: (value) => {
        dispatch({type: 'TIME_TOGGLE', isTimeInput: value});
    },
});


class LocationCommunityCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicatorPosition: new Animated.Value(0),
            damping: 1 - 0.6,
            tension: 300,
            sliderText: 'Pin this to your Journey',
            arrowAnim: new Animated.Value(0),
            sliderPosition: 'in',
            displayActions: 'false',
            communityName: props.name,
            time: props.time,
            host: props.host,
            distance: props.distance,

        };

    }

    onDrawerSnap(event) {
        const snapPointId = event.nativeEvent.id;
        console.log(event.nativeEvent.id);
    }

    sendToast(data) {
        ToastAndroid.show(data.name + ':  ' + data.journey, ToastAndroid.SHORT);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 20}}>
                    <Text style={styles.communityTitleText}>{this.state.communityName}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white'}}>Hosted by </Text><Text style={{
                        textDecorationLine: 'underline',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>{this.state.host}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Text style={styles.numberText}>30</Text><Text style={styles.neighborsText}> intersecting
                        Journeys</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        overScrollMode='never'

                    >
                        <View style={{height: width * 0.2, flexDirection: 'row',}}>
                            <TouchableOpacity
                                onPress={() => this.sendToast({name: 'Elon Musk', journey: 'Yoga at Zip2'})}>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.sendToast({
                                name: 'Whitney Wolf',
                                journey: 'Yoga Teacher Training'
                            })}>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/whitney_wolf.jpg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.sendToast({name: 'Jane Goodall', journey: 'My Health'})}>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/jane_goodall.jpg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.sendToast({
                                name: 'Sylvia Earle',
                                journey: 'Yoga Teacher Training'
                            })}>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/sylvia_earle.jpg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/charlie_lee.jpeg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/elon_musk.jpeg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/whitney_wolf.jpg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.communityMemberPhoto}
                                    source={require('../../../app/Assets/images/jane_goodall.jpg')}/>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={styles.information}>
                            <View style={[styles.sideContainer, {paddingRight: 7}]}>
                                <Icon name="ios-paper-plane-outline"
                                      style={{color: 'white', paddingRight: 7}}
                                      size={20}/>
                                <Text style={styles.infoText}>
                                    {this.state.time}
                                </Text>
                            </View>
                            <View style={[styles.sideContainer, {}]}>
                                <Icon name="md-locate" style={{color: 'white', paddingRight: 5, paddingLeft: 10}}
                                      size={20}/>
                                <Text style={styles.infoText}>
                                    {this.props.distance} m
                                </Text>
                            </View>
                        </View>
                    </View>


                    <Interactable.View
                        ref="instance"
                        horizontalOnly={true}
                        snapPoints={[
                            {x: -width * 0.65, damping: 1 - this.state.damping, tension: this.state.tension},
                        ]}
                        initialPosition={{x: -width * 0.65}}
                        style={{width: width * 2.5, marginTop: 30}}
                        onSnap={this.onDrawerSnap.bind(this)}
                        alertAreas={[
                            {id: 'enter', influenceArea: {right: -300}},
                            {id: 'back', influenceArea: {right: -200}},
                        ]}
                        onStop={(event) => this.onStopInteraction(event)}
                        onAlert={this.onAlert.bind(this)}
                        animatedValueX={this._deltaX}>
                        <View style={{left: 0, right: 0, height: 60}}>
                            <View style={{position: 'absolute', flex: 0, right: 0, flexDirection: 'row'}}>
                                <View style={styles.slideTab}>
                                    <View style={[styles.sideContainer, {paddingRight: 5}]}>
                                        <Animated.View style={
                                            [{height: 40, alignItems: 'center', flexDirection: 'row'}, {
                                                transform: [{
                                                    rotate: this.state.arrowAnim.interpolate({
                                                            inputRange: [-90, 0],
                                                            outputRange: ['-90deg', '0deg'],
                                                            extrapolate: 'clamp'
                                                        },
                                                    )
                                                }]
                                            }
                                            ]}>
                                            <Icon name="md-arrow-round-back"
                                                  style={{color: 'white',}}
                                                  size={20}/>
                                        </Animated.View>
                                        <Text style={[styles.infoText, {marginLeft: 15}]}>
                                            {this.state.sliderText}                                            </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Interactable.View>
                    {
                        this.state.displayActions === true ?

                            this.state.distance === 50 ?
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingBottom: 10
                                }}>
                                    <Animatable.View style={styles.actionButtonView} animation="zoomIn" iterationCount={1}
                                                     delay={30} useNativeDriver={true}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Icon name="ios-globe-outline"
                                                  style={{color: 'white'}}
                                                  size={40}/>

                                            <Text style={styles.actionText}>Pin to Journey</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Animatable.View style={styles.actionButtonView} animation="zoomIn" iterationCount={1}
                                                     delay={30} useNativeDriver={true}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Icon name="ios-nutrition"
                                                  style={{color: 'white'}}
                                                  size={40}/>

                                            <Text style={styles.actionText}>Buy Something Delicious!</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View> :

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingBottom: 10
                                }}>
                                    <Animatable.View style={styles.actionButtonView} animation="zoomIn"
                                                     iterationCount={1} delay={30} useNativeDriver={true}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Icon name="ios-globe-outline"
                                                  style={{color: 'white'}}
                                                  size={40}/>

                                            <Text style={styles.actionText}>Pin to Journey</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Animatable.View style={styles.actionButtonView} animation="zoomIn"
                                                     iterationCount={1} delay={40} useNativeDriver={true}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Icon name="ios-ribbon-outline"
                                                  style={{color: 'white'}}
                                                  size={40}/>
                                            <Text style={styles.actionText}>Yoga Teacher Training!</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Animatable.View style={styles.actionButtonView} animation="zoomIn"
                                                     iterationCount={1} delay={60} useNativeDriver={true}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Icon name="md-happy"
                                                  style={{color: 'white'}}
                                                  size={40}/>
                                            <Text style={styles.actionText}>Finding Inspiration!</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                            : null

                    }

                </View>
            </View>
        );
    }


    onStopInteraction(event) {
        const x = event.nativeEvent.x;
        const y = event.nativeEvent.y;

        console.log('this should technically work');
    }

    onAlert(event) {
        console.log('alert:', event.nativeEvent);
        if (JSON.stringify(event.nativeEvent).includes("\"enter\":\"enter\"")) {
            //this.refs['instance'].snapTo({index: 0});

            this.setState({
                ...this.state,
                sliderText: 'Actions Available!',
                sliderPosition: 'out',
                displayActions: true
            })
            this.animateArrow('down');
        } else if (JSON.stringify(event.nativeEvent).includes("\"back\":\"enter\"")) {
            this.setState({
                ...this.state,
                sliderText: 'Pin this to your Journey!',
                sliderPosition: 'out',
                displayActions: false,
            })
            this.animateArrow('normal');
        }
    }

    animateArrow(direction) {
        let degrees;
        if (direction === 'down') {
            degrees = -90;
        } else {
            degrees = 0;
        }
        Animated.timing(
            this.state.arrowAnim,
            {
                toValue: degrees,
                duration: 300,
                useNativeDriver: true,
            }
        ).start();
    }
}

//<Text style={styles.infoText}>30:01</Text>
const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        marginBottom: 30,
    },
    information: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3C5068',
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    subText: {
        fontSize: 11
    },
    communityTitleText: {
        color: 'white',
        fontSize: 30,

    },
    neighborsText: {
        color: 'white',
    },
    numberText: {
        fontSize: 25,
        color: 'white',
    },
    communityMemberPhoto: {
        marginTop: 10,
        marginRight: 10,
        borderRadius: width * 0.2,
        height: width * 0.13,
        width: width * 0.13,
    },
    infoText: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white',
        marginVertical: 10,
        fontSize: 14
    },
    sideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slideTab: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FD7846',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        alignSelf: 'flex-end',
        elevation: 5,
        width: width * 1.5
    },
    actionButtonView: {
        paddingVertical: 10,
        elevation: 5,
        backgroundColor: '#FD7846',
        borderRadius: 5,

    },
    actionButton: {
        width: (width - 70) / 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    actionText: {
        color: 'white',
        textAlign: 'center',


    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationCommunityCard);


// This was some beautiful coding!
/*
<Animated.View style={
    [{height: 40, alignItems: 'center', flexDirection: 'row'}, {
        transform: [{
            rotate: this._deltaX.interpolate({
                    inputRange: [-width * 0.8, -width * 0.65, 0],
                    outputRange: ['-90deg', '0deg', '0deg',],
                    extrapolate: 'clamp'
                },
            )
        }]
    }
    ]}>*/
