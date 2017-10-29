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
    ScrollView,
    TouchableWithoutFeedback,
    ToastAndroid,
    Slider,
    Picker
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import MapView from 'react-native-maps';

import agent from '../helpers/agent.js';
import {daytimeMap, nighttimeMap} from "../helpers/constants";

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    quoteMeta: state.auth.quoteMeta
});

const mapDispatchToProps = dispatch => ({});


class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: '1H',
            opacity1: new Animated.Value(100),
            opacity2: new Animated.Value(0),
            opacity3: new Animated.Value(0),
            opacity4: new Animated.Value(0),
            opacity5: new Animated.Value(0),
            indicatorPosition: new Animated.Value(((width * 0.5 - 5 * 15) / 5) / 2 + 15 / 2),
        };
    }

    dateSelected = (value) => {
        let x = (width * 0.5 - 5 * 15) / 5;
        console.log(x);
        console.log(width * 0.8);
        console.log(x * 6 + 5 * 15)

        if (value === this.state.selectedDate) {

        } else {
            let fadeInOpacity, fadeOutOpacity, indicatorPosition;

            switch (value) {
                case '1H':
                    fadeInOpacity = this.state.opacity1;
                    indicatorPosition = x / 2 + 15 / 2 ;
                    break;
                case '2H':
                    fadeInOpacity = this.state.opacity2;
                    indicatorPosition = x / 2 + x + 15 + 15 / 2 ;
                    break;
                case '3H':
                    fadeInOpacity = this.state.opacity3;
                    indicatorPosition = x / 2 + 2 * (x + 15) + 15 / 2;
                    break;
                case '8H':
                    fadeInOpacity = this.state.opacity4;
                    indicatorPosition = x / 2 + 3 * (x + 15) + 15 / 2 ;
                    break;
                case '1D':
                    fadeInOpacity = this.state.opacity5;
                    indicatorPosition = x / 2 + 4 * (x + 15) + 15 / 2 ;
                    break;

            }

            switch (this.state.selectedDate) {
                case '1H':
                    fadeOutOpacity = this.state.opacity1;
                    break;
                case '2H':
                    fadeOutOpacity = this.state.opacity2;
                    break;
                case '3H':
                    fadeOutOpacity = this.state.opacity3;
                    break;
                case '8H':
                    fadeOutOpacity = this.state.opacity4;
                    break;
                case '1D':
                    fadeOutOpacity = this.state.opacity5;
                    break;
            }


            Animated.parallel([
                Animated.timing(
                    fadeInOpacity,
                    {
                        toValue: 1,
                        duration: 250,
                    }),
                Animated.timing(
                    fadeOutOpacity,
                    {
                        toValue: 0,
                        duration: 250,
                    }
                ),
                Animated.timing(
                    this.state.indicatorPosition,
                    {
                        toValue: indicatorPosition,
                        duration: 250,
                    }
                )]).start();

            this.setState({
                ...this.state,
                selectedDate: value,
            });
        }
    }

    measureView(event) {
        console.log('event peroperties: ', event.nativeEvent.layout.width);
        this.setState({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height
        })
    }

    render() {


        return (

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#F0FFFF'}}>1 H  </Text>

                <View onLayout={(event) => this.measureView(event)} style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-around',
                width: width * 0.5
            }}>

                <Animated.View
                    style={[{position: 'absolute', top: 0, left: this.state.indicatorPosition, bottom: 0, justifyContent: 'center', alignItems: 'center'}]}>
                    <View style={styles.indicator}/>
                </Animated.View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.dateSelected('1H')}>
                    <Animated.View style={[styles.animatedView, {opacity: this.state.opacity1}]}/>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.dateSelected('2H')}>
                    <Animated.View style={[styles.animatedView, {opacity: this.state.opacity2}]}/>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.dateSelected('3H')}>
                    <Animated.View style={[styles.animatedView, {opacity: this.state.opacity3}]}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.dateSelected('8H')}>
                    <Animated.View style={[styles.animatedView, {opacity: this.state.opacity4}]}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.dateSelected('1D')}>
                    <Animated.View style={[styles.animatedView, {opacity: this.state.opacity5}]}/>
                </TouchableOpacity>
            </View>
                <Text style={{color: '#F0FFFF'}}>  {this.state.selectedDate} </Text>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#F0FFFF'
    },
    indicator: {
        position: 'absolute',
        borderColor: '#F0FFFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        marginVertical: 20,
        borderRadius: 100,
        borderWidth: 2,
        zIndex: 11,
    },
    animatedView: {
        borderColor: '#F0FFFF',
        backgroundColor: '#F0FFFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        borderRadius: 100,
        borderWidth: 2,
        zIndex: 11,
        height: 15,
        marginVertical: 30

    },
    button: {
        borderColor: '#F0FFFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        borderRadius: 100,
        borderWidth: 2,
        zIndex: 11,
        height: 15,
        marginVertical: 30
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
