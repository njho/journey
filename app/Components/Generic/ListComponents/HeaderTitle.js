import React from 'react';
import {Animated, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class CommentBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={this.props.style}>


                <View>
                    <Text
                        style={{
                            marginVertical: 5,
                            marginTop: 20,
                            marginHorizontal: 20,
                            fontSize: this.props.fontSize,
                            color: 'white',
                        }}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default CommentBar;