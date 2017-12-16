import React from 'react';
import { Animated, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class CommentBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


render()
{
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'stretch',
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#4D81C2',
                    justifyContent: 'center',
                }}>
                <Icon name="ios-heart-outline" style={{color: 'white'}} size={25}/>

                <Text
                    style={{
                        color: 'white',
                        marginVertical: 10,
                        fontSize: 14,
                        marginLeft: 10

                    }}>

                    31</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: '#4D81C2',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon name="ios-chatbubbles-outline" style={{color: 'white'}} size={25}/>


                <Text
                    style={{
                        color: 'white',
                        marginVertical: 10,
                        fontSize: 14,
                        marginLeft: 10
                    }}>

                    31</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flexDirection: 'row',
                flex: 2,
                backgroundColor: '#4D81C2',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text
                    style={{
                        color: 'white',
                        marginHorizontal: 20,
                        marginVertical: 10,
                        fontSize: 14
                    }}>
                    Contribute</Text>
            </TouchableOpacity>
        </View>
    );
}
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default CommentBar;