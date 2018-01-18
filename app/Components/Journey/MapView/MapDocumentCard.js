import React from 'react';
import {Animated, Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import CommentBarV2 from "../Cards/CommentBarV2";
import HorizontalAvatarJourney from '../../Generic/HorizontalAvatarJourney';
import HorizontalDocJourney from '../../Generic/HorizontalDocJourney';

import FloatingJourney from '../../Generic/FloatingJourney';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class MapBumpCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <FloatingJourney number={20}/>
                <View style={{
                    width: width * 0.93,
                    marginBottom: 10,
                    backgroundColor: 'white',
                    elevation: 5,
                    borderRadius: 10
                }}>
                    <View style={{
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        paddingTop: 10,
                        flexDirection: 'row',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        justifyContent: 'space-between'
                    }}>
                        <Text style={[styles.cardTitle,
                            {
                                fontWeight: 'bold',
                                fontSize: 13,
                                color: '#F96D69'
                            }]}>December 20, 2017</Text>


                    </View>
                    <View style={{
                        paddingVertical: 7,
                    }}>
                        <View style={{marginBottom: 20, marginTop: 5, marginLeft: 20}}>
                            <HorizontalDocJourney name="The Evolution of Science"
                                                  journey = ""
                                                  avatarDimension={50}
                                                  mainColor='#525372'/>
                        </View>
                        <View style={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: 5,
                            paddingHorizontal: 15,
                            marginHorizontal: 15,
                            paddingVertical: 10
                        }}>
                            <Text style={{fontSize: 14, color: '#2D2D2D', paddingVertical: 5}}>This is some example
                                text. Not
                                sure if this
                                is the best way.</Text>
                        </View>
                    </View>
                    <CommentBarV2 likes={10} comments={20} style={{marginHorizontal: 15}}/>
                </View>
            </View>
        );
    }
}


const
    styles = StyleSheet.create({
        userPhoto: {
            marginTop: 0.015 * width,
            height: 0.37 * width,
            width: 0.37 * width,
            borderRadius: width * 0.3,
        },
        titleText: {
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#F96D69'
        },
        cardTitle: {
            color: 'white',
            textAlign: 'center',
        },
    });


export default MapBumpCard;
