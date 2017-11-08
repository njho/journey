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
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';


import {theme} from "../helpers/constants";


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


class Streamer extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentWillMount() {
        await OpenTok.connect("2_MX40NTk5MTkxMn5-MTUxMDEwODYwMjQwM355cmFYK24rMDF2cEdjdGV0UGhGcGh1Qnd-fg", "T1==cGFydG5lcl9pZD00NTk5MTkxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9NmUxOThiN2E3OWY4YmRjNDUxYzM1NWRhZDA1OTY5OWMyNDlhNzM4OTpzZXNzaW9uX2lkPTJfTVg0ME5UazVNVGt4TW41LU1UVXhNREV3T0RZd01qUXdNMzU1Y21GWUsyNHJNREYyY0VkamRHVjBVR2hHY0doMVFuZC1mZyZjcmVhdGVfdGltZT0xNTEwMTA4NjAyJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MTAxMDg2MDIuNDM2NTk2MDUzNzI4MiZleHBpcmVfdGltZT0xNTEyNzAwNjAy");
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log('Iam here'));
    }




    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#FB704B', '#FE4C64']} style={{flex: 1, width: '100%'}}>
               <Text>
                        Send signal
                    </Text>
                    <OpenTok.SubscriberView
                        style={{ height: 100, width: 200 }}
                        sessionId={"2_MX40NTk5MTkxMn5-MTUxMDEwODYwMjQwM355cmFYK24rMDF2cEdjdGV0UGhGcGh1Qnd-fg"}
                        onSubscribeStop={() => { console.log('stopped')}}
                    />
                </LinearGradient>
            </View>

        );
    }
}

//<Text style={styles.infoText}>30:01</Text>
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorMap.locations.backgroundColor,
        flex: 1,
        width: '100%',
    },
    littleExtra: {
        position: 'absolute',
        bottom: 30,
        right: 30+56/2-10,
        borderRadius: 20,
        width: 15,
        height: 15,
        backgroundColor: '#FD7846',
        elevation: 5
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Streamer);
