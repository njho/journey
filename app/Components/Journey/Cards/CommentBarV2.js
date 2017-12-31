import React from 'react';
import {Animated, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


class CommentBarV2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={[{
                flexDirection: 'row',
                alignItems: 'stretch',
            }, this.props.style]}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Icon name="ios-heart-outline" style={{color: '#727272'}} size={25}/>
                    <Text
                        style={{
                            color: '#727272',
                            marginVertical: 10,
                            fontSize: 14,
                            marginLeft: 10

                        }}>
                        {this.props.likes}
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Icon name="ios-chatbubbles-outline" style={{color: '#727272'}} size={25}/>
                    <Text
                        style={{
                            color: '#727272',
                            marginVertical: 10,
                            fontSize: 14,
                            marginLeft: 10
                        }}>

                        {this.props.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                    end={{x: 1, y: .50}}
                                    style={{
                                        marginVertical: 10,
                                        borderRadius: 5,
                                        alignSelf: 'flex-start',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                        <Icon name="ios-add"
                              style={{color: 'white', marginLeft: 20, marginRight: 10}} size={20}/>
                        <Text
                            style={{
                                color: 'white',
                                marginVertical: 5,
                                marginRight: 20,
                                fontSize: 14
                            }}>
                            Contribute</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default CommentBarV2;