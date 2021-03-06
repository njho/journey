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
import {theme} from "../helpers/constants";


import MapView from 'react-native-maps';

import agent from '../helpers/agent.js';
import {daytimeMap, nighttimeMap} from "../helpers/constants";

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    duration: state.communityReducer.duration,
    isTimeInput: state.communityReducer.isTimeInput,
});

const mapDispatchToProps = dispatch => ({
    durationSelected: (value) => {
        dispatch({type: 'DURATION_SELECTED', duration: value});
    },
    timeToggle: (value) => {
        dispatch({type: 'TIME_TOGGLE', isTimeInput: value});
    }
});


class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);


        this.state = {
            selectedDate: '1H',
            opacity1: new Animated.Value(100),
            opacity2: new Animated.Value(0),
            opacity3: new Animated.Value(0),
            opacity4: new Animated.Value(0),
            opacity5: new Animated.Value(0),
            indicatorPosition: new Animated.Value(((width * 0.7 - 5 * 15) / 5) / 2 + 15 / 2),
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    dateSelected = (value) => {
        let x = (width * 0.7 - 5 * 15) / 5;

        if (value === this.state.selectedDate) {

        } else {
            let fadeInOpacity, fadeOutOpacity, indicatorPosition;

            switch (value) {
                case '1H':
                    fadeInOpacity = this.state.opacity1;
                    indicatorPosition = x / 2 + 15 / 2;
                    break;
                case '2H':
                    fadeInOpacity = this.state.opacity2;
                    indicatorPosition = x / 2 + x + 15 + 15 / 2;
                    break;
                case '3H':
                    fadeInOpacity = this.state.opacity3;
                    indicatorPosition = x / 2 + 2 * (x + 15) + 15 / 2;
                    break;
                case '8H':
                    fadeInOpacity = this.state.opacity4;
                    indicatorPosition = x / 2 + 3 * (x + 15) + 15 / 2;
                    break;
                case '1D':
                    fadeInOpacity = this.state.opacity5;
                    indicatorPosition = x / 2 + 4 * (x + 15) + 15 / 2;
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
                        duration: 600,
                    }
                )]).start(this.props.durationSelected(value));

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

    timeToggle = (isTimeInput) => {
        if (isTimeInput) {
            this.props.timeToggle(false);
        } else {
            this.props.timeToggle(true);
        }
    }

    render() {


        return (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{color: theme.colorMap.locationConfirmation.mapOutlines}}>Duration</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{flexDirection: 'row', marginRight: 10}} onPress={()=>this.timeToggle(this.props.isTimeInput)}>
                        <Icon name="ios-checkmark" size={40} color={theme.colorMap.locationConfirmation.mapOutlines}/>
                    </TouchableOpacity>
                    <View onLayout={(event) => this.measureView(event)} style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'space-around',
                        width: width * 0.7
                    }}>

                        <Animated.View
                            style={[{
                                position: 'absolute',
                                top: 0,
                                left: this.state.indicatorPosition,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }]}>
                            <View />
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
                    <Text style={{color: theme.colorMap.locationConfirmation.mapOutlines}}>  {this.props.duration} </Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: theme.colorMap.locationConfirmation.mapOutlines
    },
    indicator: {
        position: 'absolute',
        borderColor: theme.colorMap.locationConfirmation.mapOutlines,
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
        borderColor: theme.colorMap.locationConfirmation.mapOutlines,
        backgroundColor: theme.colorMap.locationConfirmation.mapOutlines,
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        borderRadius: 100,
        borderWidth: 2,
        zIndex: 11,
        height: 15,
        marginVertical: 20

    },
    button: {
        borderColor: theme.colorMap.locationConfirmation.mapOutlines,
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        borderRadius: 100,
        borderWidth: 2,
        zIndex: 11,
        height: 15,
        marginVertical: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
