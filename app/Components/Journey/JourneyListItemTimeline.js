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
import LiveStoryCard from './Cards/LiveStoryCard';


import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenTok from 'react-native-opentok';
import MapView from 'react-native-maps';
import Animation from 'lottie-react-native';
import BumpCard from './Cards/BumpCard';
import PhotoCard from './Cards/PhotoCard'


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
        this.setState({
            ...this.state,
            selected: !this.state.selected
        })

    }

    _keyExtractor = (item, index) => item.id;

    renderItem() {
        switch (this.props.meta.type) {
            case 'bump':
                return <BumpCard
                    description={this.props.description}
                />
                break;
            case 'photo':
                return <PhotoCard/>
                break;
            case 'live':
                return <LiveStoryCard {...this.props}/>
                break;
        }
    }


    render() {


        return (
            <View style={{
                flexDirection: 'column',
                width: '100%',
                flex: 1,
                paddingTop: 15,
                backgroundColor: this.props.index % 2 === 0 ? '#f9f9f9' : 'white'
            }}>
                {this.renderItem()}
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
            marginBottom: 35,
        },
        userPhoto: {
            height: 35,
            width: 35,
            borderRadius: 35,
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

{/*<View style={[{*/
}
{/*flexDirection: 'row',*/
}
{/*borderColor: 'white',*/
}
{/*width: 35,*/
}
{/*height: 35,*/
}
{/*borderWidth: 2,*/
}
{/*borderRadius: 30,*/
}
{/*alignItems: 'center',*/
}
{/*justifyContent: 'center',*/
}
{/*backgroundColor: 'white'*/
}
{/*}]}>*/
}
{/*<Image style={styles.userPhoto}*/
}
{/*source={require('../../../app/Assets/images/elon_musk.jpeg')}/>*/
}
{/*</View>*/
}
{/*<View*/
}
{/*style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>*/
}
{/*<Text style={{marginLeft: 10, fontSize: 14, fontWeight: 'bold'}}>Fun-eh</Text>*/
}
{/*<View style={{flexDirection: 'column', alignItems: 'flex-end'}}>*/
}
{/*<Text style={{*/
}
{/*marginRight: 20, fontSize: 14, color: '#4D81C2', fontWeight: 'bold',*/
}
{/*}}>{this.props.substory ? this.props.substory : '../' + this.props.name}</Text>*/
}


{/*</View>*/
}
{/*</View>*/
}