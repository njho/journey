import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {scale, scaleModerate, scaleVertical} from '../../Utils/scale.js';


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
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
            >
                <Text>Yo Dude</Text>
            </Animated.View>
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
        color: '#333333',
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);