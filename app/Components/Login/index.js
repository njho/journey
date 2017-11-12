import React from 'react';
import { Animated, Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard, RkStyleSheet
} from 'react-native-ui-kitten';


import {RkTheme} from 'react-native-ui-kitten';
import {FontAwesome} from '../../Assets/icons';
import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';
import {GradientButton} from '../../Components/gradientButton';

import FadeInView from '../helpers/FadeInView';

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
    } = FBSDK;


//
// var FBButton = React.createClass({
//
//     render: function() {
//         return (
//             <View>
//                 <LoginButton
//                     publishPermissions={["publish_actions"]}
//
//                     onLoginFinished={
//         (error, result) => {
//           if (error) {
//             console.log(error);
//             alert("login has error: " + result.error);
//         } else if (result.isCancelled) {
//             alert("login is cancelled.");
//         } else {
//             console.log('logged in');
//             AccessToken.getCurrentAccessToken().then(
//               (data) => {
//                 alert(data.accessToken.toString())
//             }
//             )
//         }
//     }
// }
//                     onLogoutFinished={() => alert("logout.")}/>
//             </View>
//         );
//     }
// });

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () => {
        dispatch({type: 'REDIRECT'});
    }
});

class Login extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let renderIcon = () => {
            if (RkTheme.current.name === 'light')
                return <Image style={styles.image} source={require('../../Assets/images/logo.png')}/>;
            return <Image style={styles.image} source={require('../../Assets/images/logoDark.png')}/>
        };

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {renderIcon()}
                    <RkText rkType='light h1'>React Native</RkText>
                    <RkText rkType='logo h0'>UI Kitten</RkText>

                </View>
                <FadeInView><Text>Dog Cat Dog</Text></FadeInView>

                <View style={styles.content}>
                    <View>
                        <RkTextInput rkType='rounded' placeholder='Username'/>
                        <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true}/>

                    </View>
                    <View style={styles.buttons}>
                        <RkButton style={styles.button} rkType='social'>
                            <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
                        </RkButton>
                        <RkButton style={styles.button} rkType='social'>
                            <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
                        </RkButton>
                        <RkButton style={styles.button} rkType='social' onPress={()=> this.signIn()}>
                            <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
                        </RkButton>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.textRow}>
                            <RkText rkType='primary3'>Don’t have an account?</RkText>
                            <RkButton rkType='clear' onPress={() => this.props.navigation.navigate('SignUp')}>
                                <RkText rkType='header6'> Sign up now </RkText>
                            </RkButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        marginBottom: 5,
    },
    screen: {
        padding: scaleVertical(16),
        flex: 1,
        justifyContent: 'space-between'
    },
    image: {
        height: scaleVertical(77),
        resizeMode: 'contain'
    },
    header: {
        paddingBottom: scaleVertical(10),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    content: {
        justifyContent: 'space-between'
    },
    save: {
        marginVertical: 20
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: scaleVertical(24),
        marginHorizontal: 24,
        justifyContent: 'space-around',
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {},
    footer: {}
});


// You can then use your `FadeInView` in place of a `View` in your components:
export default connect(mapStateToProps, mapDispatchToProps)(Login)

