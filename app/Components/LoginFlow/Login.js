import React from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    Easing,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';
import firebase from 'react-native-firebase';
import {AccessToken, LoginManager} from 'react-native-fbsdk';


import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';
import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';
import FadeInView from "../helpers/FadeInView";


import agent from '../helpers/agent.js';
import wrapWords from '../helpers/quoteParser';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    quoteMeta: state.auth.quoteMeta
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () => {
        dispatch({type: 'REDIRECT'});
    },
    login: (user) => {
        dispatch({type: 'LOGIN', user: user})
    }
});


const facebookLogin = () => {
    console.log('facebook login');
    return LoginManager
        .logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            if (!result.isCancelled) {
                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
                // get the access token
                return AccessToken.getCurrentAccessToken()
            }
        })
        .then(data => {
            if (data) {
                console.log('create new firebase cred');
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                // login with credential
                return firebase.auth().signInWithCredential(credential)
            }
        })
        .then((currentUser) => {
            console.log('currentUser');
            if (currentUser) {

                this.props.login(currentUser.toJSON());

                console.info(JSON.stringify(currentUser.toJSON()))
            }
        })
        .catch((error) => {
            console.log(`Login fail with error: ${error}`)
        })
}

class NeighborhoodDetected extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.state = {
            closeNeighborSelected: false,
            farNeighborSelected: false,
            slide: 1,
            transform: new Animated.Value(-0.1),
            translate: new Animated.Value(0),
            closeNeighborGreeted: false,
            farNeighborGreeted: false,
            backgroundColor: new Animated.Value(0),
            logoSubText: new Animated.Value(1),
            translateLogoUp: new Animated.Value(0),
            farthestBeen: 0,
            digits: null,
            codeInput: null
        }
    }

    //Animate the login

    buttonPress(value) {
        switch (value) {
            case 'digits':
                console.log('in Digits');
                Animated.parallel([
                    // Animated.timing(
                    //     this.state.backgroundColor,
                    //     {
                    //         toValue: 1,
                    //         duration: 1000,
                    //         delay: 0,
                    //     }
                    // ),
                    Animated.timing(
                        this.state.logoSubText,
                        {
                            toValue: 0,
                            duration: 700,
                            delay: 0,
                        }
                    ),
                    Animated.timing(
                        this.state.translateLogoUp,
                        {
                            toValue: 1,
                            duration: 500,
                            delay: 300,
                        }
                    )
                ]).start(() => this.setState({
                    ...this.state,
                    farthestBeen: 1
                }));
                break;
            case 'facebook':
                break;

            case 'back':
                this.setState({
                    ...this.state,
                    farthestBeen: 0,
                    codeInput: null,
                    digits: null
                })

                Animated.parallel([
                    // Animated.timing(
                    //     this.state.backgroundColor,
                    //     {
                    //         toValue: 1,
                    //         duration: 1000,
                    //         delay: 0,
                    //     }
                    // ),
                    Animated.timing(
                        this.state.logoSubText,
                        {
                            toValue: 1,
                            duration: 700,
                            delay: 0,
                        }
                    ),
                    Animated.timing(
                        this.state.translateLogoUp,
                        {
                            toValue: 0,
                            duration: 500,
                            delay: 300,
                        }
                    )
                ]).start();
                break;
        }
    }

    digitsAuth = () => {
        console.log(this.state.digits);
        console.log('in digitsAuth');
        firebase.auth().signInWithPhoneNumber(this.state.digits)
            .then(confirmResult => {
                this.setState({
                    ...this.state,
                    confirmResult,
                    farthestBeen: 2
                })
                console.log(confirmResult);
                console.log('It should confirm the result');
            })
            .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}));
    };

    confirmDigits = () => {
        const {codeInput, confirmResult} = this.state;
        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({message: 'Code Confirmed!'});
                })
                .catch(error => this.setState({message: `Code Confirm Error: ${error.message}`}));
        }
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.login(user.toJSON());
                this.props.navigator.resetTo({screen: 'Timeline'})
            }
        });
    }

    componentDidMount() {
        // this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log('User successfully logged in');
        //         console.log(user.toJSON());
        //         this.props.login(user.toJSON());
        //         this.setState({...this.state, user: user.toJSON()});
        //     } else {
        //         // User has been signed out, reset the state
        //         console.log('did not work');
        //         this.setState({
        //             user: null,
        //             message: '',
        //             codeInput: '',
        //             phoneNumber: '+44',
        //             confirmResult: null,
        //         });
        //     }
        // });

    }


    textHandler(value, text) {
        switch (value) {
            case 'digits':
                this.setState({
                    ...this.state,
                    digits: text
                });
                break;
            case 'codeInput':
                this.setState({
                    ...this.state,
                    codeInput: text
                })
        }
    }

    render() {

        var {logoSubText} = this.state;

        var inverseOpacity = this.state.logoSubText.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })

        var backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['white', 'rgba(0, 0, 0, 0.85)']
        });

        var translateLogoUp = this.state.translateLogoUp.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -height * 0.05]
        });


        return (
            <Animated.View style={[styles.container, {backgroundColor: backgroundColor}]}>
                {
                    this.state.farthestBeen > 0 ?
                        <TouchableWithoutFeedback onPress={() => this.buttonPress('back')}>
                            <Icon name="md-arrow-back" size={20} style={{left: 20, top: 20, position: 'absolute',}}
                                  color="#00BBF5"/>
                        </TouchableWithoutFeedback> : null

                }

                <Animated.View style={[{
                    alignItems: 'center',
                    marginTop: 0.2 * height
                }, {transform: [{translateY: translateLogoUp}]}]}>
                    <Image
                        style={styles.logo}
                        source={require('../../Assets/images/V5.png')}/>
                    <Text style={styles.logoText}>WELCOME TO JOURNEY</Text>
                    <Animated.Text style={{marginTop: 5, opacity: logoSubText}}>Connection in the 21st
                        Century</Animated.Text>
                </Animated.View>
                <Animated.View style={{
                    flexDirection: 'column',
                    position: 'absolute',
                    bottom: height * 0.07,
                    alignItems: 'center',
                    opacity: logoSubText
                }}>
                    <View>
                        <TouchableOpacity onPress={() => this.buttonPress('digits')}>
                            <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                            end={{x: 1, y: .50}}
                                            style={{
                                                borderRadius: 30,
                                                alignSelf: 'flex-start',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: width * 0.7,
                                                marginVertical: 15
                                            }}>

                                <Text
                                    style={{
                                        color: 'white',
                                        marginVertical: 12,
                                        fontSize: 15
                                    }}>
                                    P H O N E S I G N I N</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => facebookLogin()}>
                            <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                            end={{x: 1, y: .50}}
                                            style={{
                                                borderRadius: 40,
                                                alignSelf: 'flex-start',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: width * 0.7,
                                            }}>

                                <Text
                                    style={{
                                        color: 'white',
                                        marginVertical: 12,
                                        fontSize: 15
                                    }}>
                                    F A C E B O O K S I G N I N</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View>

                    </View>

                </Animated.View>
                {this.state.farthestBeen === 1 ? <Animated.View style={{
                    flexDirection: 'column',
                    position: 'absolute',
                    bottom: height * 0.07,
                    alignItems: 'center',
                }}>

                    <View style={{marginHorizontal: width * 0.1, marginBottom: height * 0.15, alignItems: 'center'}}>
                        <TextInput
                            style={{
                                textAlign: 'center',
                                width: width * 0.75,
                                fontSize: 35,
                                color: '#F3766F',
                                flexDirection: 'column'
                            }}
                            autoCapitalize="words"
                            value={this.state.digits}
                            onChangeText={(text) => this.textHandler('digits', text)}
                            underlineColorAndroid='#00BDF2'
                            keyboardType='numeric'
                            onSubmitEditing={() => this.digitsAuth()}
                        />
                        <Text
                            style={{
                                marginTop: 25,
                                marginBottom: 20,
                                marginHorizontal: 20,
                                fontSize: 12
                            }}>
                            Please confirm your country code and enter your phone number.</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.digitsAuth()}>
                        <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                        end={{x: 1, y: .50}}
                                        style={{
                                            borderRadius: 40,
                                            alignSelf: 'flex-start',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width * 0.7,
                                        }}>

                            <Text
                                style={{
                                    color: 'white',
                                    marginVertical: 12,
                                    fontSize: 15
                                }}>
                                R E G I S T E R</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </Animated.View> : null}

                {this.state.farthestBeen === 2 ?
                    <Animated.View style={{
                        flexDirection: 'column',
                        position: 'absolute',
                        bottom: height * 0.07,
                        alignItems: 'center',
                    }}>

                        <View
                            style={{marginHorizontal: width * 0.1, marginBottom: height * 0.15, alignItems: 'center'}}>
                            <TextInput
                                style={{
                                    textAlign: 'center',
                                    width: width * 0.75,
                                    fontSize: 35,
                                    color: '#F3766F',
                                    flexDirection: 'column'
                                }}
                                autoCapitalize="words"
                                value={this.state.codeInput}
                                onChangeText={(text) => this.textHandler('codeInput', text)}
                                underlineColorAndroid='#00BDF2'
                                keyboardType='numeric'
                                onSubmitEditing={() => this.confirmDigits()}
                            />
                            <Text
                                style={{
                                    marginTop: 25,
                                    marginBottom: 20,
                                    marginHorizontal: 20,
                                    fontSize: 12
                                }}>
                                Please enter the verification number received via SMS.</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.confirmDigits()}>
                            <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                            end={{x: 1, y: .50}}
                                            style={{
                                                borderRadius: 40,
                                                alignSelf: 'flex-start',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: width * 0.7,
                                            }}>

                                <Text
                                    style={{
                                        color: 'white',
                                        marginVertical: 12,
                                        fontSize: 15
                                    }}>
                                    S I G N I N</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </Animated.View> : null}

            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: width * 0.18,
        height: width * 0.18,
        marginRight: width * 0.01,
    },
    logoText: {
        marginTop: 20,
        color: '#0E89AF',
        fontSize: 26,
        fontWeight: '400'

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NeighborhoodDetected);

/*
<Text
    style={{
        marginTop: 25,
        marginBottom: 0,
        fontSize: 8
    }}>
    R E G I S T E R   F O R A N A C C O U N T</Text>*/