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
    ListView,
    FlatList,
    Slider,
    Picker,
    Platform,
    StatusBar
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import agent from '../helpers/agent';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';

import Chat from '../Chat/Chat';


import {theme} from "../helpers/constants";


const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LATITUDE_DELTA = 0.0062;
const LONGITUDE_DELTA = 0.0021;

const mapStateToProps = state => ({
    locationMeta: state.communityReducer
});

const mapDispatchToProps = dispatch => ({
    streamInformant: (sessionId) => {
        dispatch({type: 'STREAM_INFORMATION', sessionId: sessionId})
    }
});


const connectToSession = async () => {
    try {
        await OpenTok.connect(sessionId, token);
    } catch (e) {
        console.log(e)
        console.log('wtf');
    }
}

class LiveStreams extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }


    componentDidMount() {


        agent.Streamer.fetchJourneysList().then((snapshot) => {
            console.log(snapshot.val());
            let arrayObject = [];

            Object.keys(snapshot.val()).map((key, index) => {
                arrayObject.push(snapshot.val()[key])
            })

            console.log(arrayObject);
            this.setState({
                data: arrayObject
            })
        });
    }

    journeySelected = (item) => {
        console.log(item.session_id)
        this.props.streamInformant(item.session_id);
        this.props.navigator.push({
            screen: 'streamer',
            passProps: {sessionId: item.session_id}
        })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => this.journeySelected(item)} style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50
                        }}><Text>{item.journey_description}</Text></TouchableOpacity>}
                />


            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        backgroundColor: '#F0FFFF',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreams);

