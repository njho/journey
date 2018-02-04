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
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionCards from '../Generic/ActionCards'

import Chat from '../Chat/Chat';


import {theme} from "../helpers/constants";
import Banner from './MainActionsBanner'

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
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainTitle}>Journey</Text>

                <ViewPagerAndroid
                    style={{flex: 1}}>
                    <View><Banner></Banner></View>
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        borderRadius: 5,
                        backgroundColor: '#FF7B74',
                        paddingHorizontal: 20
                    }}>
                        <TouchableOpacity style={{flex: 1}}>
                            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 20}}>
                                <Text style={[styles.mainTitle, {fontSize: 22},]}><Icon name="ios-pin-outline"
                                                                                        style={{
                                                                                            color: 'white',
                                                                                            marginRight: 20
                                                                                        }}
                                                                                        size={40}/> Community Explorer.</Text>
                                <Text style={[styles.mainTitle, {fontSize: 15, fontWeight: 'normal'},]}>13 active
                                    communities in your area.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        width: width,
                        borderRadius: 5,
                    }}>
                        <TouchableOpacity style={{flex: 1, borderRadius: 5}}>

                        </TouchableOpacity>
                        <View style={{flex: 1, position: 'absolute'}}>
                            <Text>This is a test</Text>
                        </View>

                    </View>
                </ViewPagerAndroid>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}><Text
                    style={styles.subtitle}>Choose
                    an Action</Text>
                    <Text style={[styles.subtitle, {fontSize: 14, fontWeight: 'normal', marginRight: 5}]}>NEW
                        JOURNEY</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    ref={(scrollView) => {
                        this.actionScrollView = scrollView;
                    }}

                >
                    <TouchableOpacity>
                        <ActionCards
                            color="#D0A75D"
                            actionTitle="Commit a Moment"
                            actionSubtext="Commit this moment to a Journey!"
                            icon="ios-analytics"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigator.push({screen: 'bump'})}>
                        <ActionCards
                            color="#00542D"
                            actionTitle="Bump a Friend"
                            actionSubtext="Commit a moment in time with a neighbor!"
                            icon="ios-body"
                            screen="bump"
                        />
                    </TouchableOpacity>
                    <ActionCards
                        color="#991A2F"
                        actionTitle="Connection Point"
                        actionSubtext="Help others easily find your Journey!"
                        icon="md-locate"/>
                    <ActionCards
                        color="#00BBE7"
                        actionTitle="Create a new Journey"
                        actionSubtext="The world is yours."
                        icon="ios-leaf-outline"/>


                </ScrollView>


            </View>
        );
    }
}


//<Text style={styles.infoText}>30:01</Text>
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111024',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: width,
        flexDirection: 'column',
    },
    mainTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 5,
    },
    subtitle: {
        color: '#edeefe',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
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
