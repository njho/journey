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
            <View style={[
                this.props.style
                , {
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: '#686868',
                    marginVertical: 5
                }]}>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Icon name="ios-heart-outline" style={{color: '#313131'}} size={25}/>

                </TouchableOpacity>
                <TouchableOpacity
                    style={{
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