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


class JourneyListItem extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
        this._deltaY = new Animated.Value(height - 100);
    }

    componentDidMount() {

    }

    iconPicker(value) {
        switch (value) {
            case 'bump':
                return 'md-wifi'
            case 'photo':
                return 'md-square-outline'
        }
    }

    toggle() {
        this.props.callback(!this.props.selected);


    }

    _keyExtractor = (item, index) => item.id;


    render() {


        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                backgroundColor: this.props.index % 2 === 0 ? '#f9f9f9' : 'white'
            }}>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1, alignItems: 'center'}} onPress={() => this.toggle()}>
                    <View style={{flex: 1, alignItems: 'center', marginLeft: 20, justifyContent: 'center'}}>


                        <View style={{
                            width: '100%',
                            height: width * 0.2,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image
                                style={{width: width * 0.15, height: width * 0.15, borderRadius: width * 0.15}}
                                source={{uri: 'http://image.boomsbeat.com/data/images/full/759/1-jpg'}}/>
                        </View>


                    </View>
                    <View style={{
                        flex: 4,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        marginLeft: 20
                    }}>
                        <Text style={styles.titleText}>{this.props.name}</Text>
                        <Text style={styles.subText}>{this.props.meta.last_entry_date}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    {this.props.selected ?
                            <Icon name="ios-checkmark-circle-outline" size={40} style={{marginRight: 30}} color="#00BBF5"/>
                        : <View>
                            <Text
                                style={{
                                    color: '#00BBF5',
                                    marginRight: 30,
                                    fontSize: 14
                                }}>
                               Add</Text>
                        </View>
                    }
                    </View>
    </TouchableOpacity>
    </View>
    )
        ;
    }
}

const
    styles = StyleSheet.create({

        cardContainer: {
            elevation: 10,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: 40,
        },
        titleText: {
            color: '#4D81C2',
            fontWeight: 'bold',
            fontSize: 18,
        },
        subText: {
            color: '#5690d8',
            fontSize: 12,

        },
        button: {
            backgroundColor: '#86E5C6',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginTop: 5,
            marginBottom: 5,
            paddingVertical: 7,
            marginRight: 5,
        },
        buttonText: {
            color: 'white',
            fontSize: 12,
            marginHorizontal: 15,
        }

    });


export default connect(mapStateToProps, mapDispatchToProps)(JourneyListItem);
//
