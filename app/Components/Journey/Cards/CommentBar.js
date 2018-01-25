import React from 'react';
import {Animated, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class CommentBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={{
                marginVertical: 10,
                paddingTop: 10,
                marginHorizontal: 25,
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: 0.2,
                borderColor: '#686868'
            }}>
                <TouchableOpacity
                    style={{
                        marginVertical:4,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Icon name="ios-heart-outline" style={{color: '#313131'}} size={25}/>

                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginVertical:4,
                        marginHorizontal: 10,
                        flexDirection: 'row',

                        justifyContent: 'center',
                    }}>
                    <Icon name="ios-chatbubbles-outline" style={{color: '#313131'}} size={25}/>

                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    flex: 2,
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            color: '#686868',
                            marginVertical: 10,
                            fontSize: 14
                        }}>
                        Contribute</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{color: '#686868', fontSize: 12}}>
                        3 days ago
                    </Text>
                </View>
            </View>
        );
    }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default CommentBar;