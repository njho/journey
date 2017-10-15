import React from 'react';
import { Animated, Text, View } from 'react-native';

class FadeInView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animationDelay: props.animationDelay,
            animationDuration: props.animationDuration,
            fadeAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        var that = this;

        Animated.timing(                        // Animate over time
            that.state.fadeAnim,                // The animated value to drive
            {
                toValue: 1,                     // Animate to opacity: 1 (opaque)
                duration: 2000,                 // Make it take a while
                useNativeDriver: true,
                delay: this.state.animationDelay
            }
        ).start();                        // Starts the animation
    }



render()
{
    let { fadeAnim } = this.state;

    return (
        <Animated.View                 // Special animatable View
            style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
        >
            {this.props.children}
        </Animated.View>
    );
}
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default FadeInView;