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
KeyboardAvoidingView,
    Slider,
    Picker,
    Platform,
    StatusBar
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';
import * as Animatable from 'react-native-animatable';
import FadeInView from "../helpers/FadeInView";
import Interactable from 'react-native-interactable';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';


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


class CaptionCard extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.Value(0),
            translate: new Animated.Value(0),
            status: 0,
            personalJourney: null,
            data: [{name: 'Clean Up the Oceans'}]
        }
        this._deltaY = new Animated.Value(height - 100);

    }

    componentDidMount() {

    }


    render() {

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.cardContainer}>

                <View style={{height: height * 0.3}}>
                    <Text style={styles.titleText}>Write a Caption</Text>
                    <TextInput
                        style={{
                            flex: 1,
                            paddingHorizontal: 16,
                            color: '#9A9CE0',
                            height: '100%',
                        }}
                        textAlignVertical="top"
                        multiline={true}
                        numberOfLines={3}
                        autoCapitalize="sentences"
                        underlineColorAndroid='transparent'
                        onSubmitEditing={() => this.setFormStatus(3, this.state.farthestBeen)}
                    />
                </View>

                <Text style={styles.titleText}>Share</Text>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                    borderBottomColor: '#9A9CE0',
                    borderTopColor: '#9A9CE0',
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                    <View styl={{borderBottomColor: '#9A9CE0'}}>
                        <Text style={styles.subText}>Facebook </Text>
                    </View>
                    <View>
                        <Switch/>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: 5,

                }}>
                    <View styl={{borderBottomColor: '#9A9CE0'}}>
                        <Text style={styles.subText}>Twitter </Text>
                    </View>
                    <View>
                        <Switch/>
                    </View>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            backgroundColor: 'white',
            elevation: 10,
            paddingHorizontal: 15,
            alignSelf: 'stretch',
            marginHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 30,
            justifyContent: 'center',
            flexDirection: 'column',
        },
        titleText: {
            color: '#9A9CE0',
            fontWeight: 'bold',
            fontSize: 17,
            paddingVertical: 5,
            marginHorizontal: 15,
        },
        subText: {
            color: '#9A9CE0',
            marginTop: 4,
            marginLeft: 15,
            fontSize: 15,
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
    CaptionCard
)
;
//
