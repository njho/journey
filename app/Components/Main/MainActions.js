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
    Picker,
    Platform,
    ViewPagerAndroid,
    StatusBar
} from 'react-native';
import agent from '../helpers/agent';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionCards from '../Generic/ActionCards'

import Chat from '../Chat/Chat';


import {theme} from "../helpers/constants";


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

class MainActions extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.mainTitle}>Journey</Text>
                <Text style={styles.subtitle}>Applicable Actions</Text>

                <ViewPagerAndroid
                    peekEnabled={true}
                    style={{ height: width / 2}}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    ref={(scrollView) => {
                        this.actionScrollView = scrollView;
                    }}

                >
                    <ActionCards
                        color="#D0A75D"
                        actionTitle="Commit a Moment"
                        actionSubText="Commit a moment in time on your Journey!"
                        icon="ios-analytics"
                    />
                    <ActionCards
                        color1="#D0A75D"
                        actionTitle="Bump a Friend"
                        actionSubText="Commit a moment in time with someone else!"
                        icon="ios-body"
                    />
                    <ActionCards
                        color="#991A2F"
                        actionTitle="Create a Meeting Point"
                        actionSubText="An easy way for people other people to find and contribute to your Journey!"
                        icon="md-locate"/>
                    <ActionCards
                        color="#991A2F"
                        actionTitle="Create a new Journey"
                        actionSubText="The world is yours."
                        icon="ios-leaf-outline"/>




                </ViewPagerAndroid>


            </View>
        );
    }
}


//<Text style={styles.infoText}>30:01</Text>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: width,
        flexDirection: 'column',
        backgroundColor: '#3E474F',
    },
    mainTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 5,
    },
    subtitle: {
        color: '#f0ffff',
        fontSize: 24,
        marginVertical: 5,

    },
    section1: {
        flex: 1,

    },
    section2: {
        flex: 1,
        flexDirection: 'row',
        height: height / 2
    },
    block: {
        width: height / 2 / 7,
        height: height / 2 / 4,
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subscriberView: {
        width: width,
        height: (height - StatusBar.currentHeight) / 2

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(MainActions);
