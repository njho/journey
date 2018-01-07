import React from 'react';
import {Animated, Text, View, TouchableOpacity, Dimensions, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import JourneyListItemTwo from '../JourneyListItemTwo';

class JourneyPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            journeys:
                [{
                    "title": 'Our Volunteers',
                    "substory": 'Helping our Volunteers Succeed',
                    "description":
                        'Discussion surrounding micropolitcs and why we need social goodnesss',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset2.jpg'
                    }
                }, {
                    "title": 'Water Education',
                    "substory": 'Edumacation',

                    "description":
                        'We have one service chapter focused on ensuring individuals are educated in maintaining water resources and bettering educational facilities. Take a look here.',
                    "meta": {
                        "last_action": "photo",
                        'last_action_meta': 'Cindy Grouper',
                        "last_entry_date": "4 days ago",
                        "num_followers": 23,
                        "num_entries": 30,
                        "num_contributors": 8,
                        "image_uri": '../../../app/Assets/images/asset3.jpg'

                    }
                }, {
                    "title": 'Emulate',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset4.jpg'
                    },
                    "title": 'Emulate',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset2.jpg'
                    }
                }, {
                    "title": 'React Native',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "photo",
                        'last_action_meta': 'Cindy Grouper',
                        "last_entry_date": "4 days ago",
                        "num_followers": 23,
                        "num_entries": 30,
                        "num_contributors": 8,
                        "image_uri": '../../../app/Assets/images/asset3.jpg'

                    }
                }, {
                    "title": 'Emulate',
                    "substory": 'Helping our Volunteers Succeed',

                    "description":
                        'Cat dog',
                    "meta": {
                        "last_action": "bump",
                        'last_action_meta': 'Marcus Levland',
                        "num_followers": 34,
                        "last_entry_date": '2 days ago',
                        "num_contributors": 12,
                        "num_entries": 53,
                        "image_uri": '../../../app/Assets/images/asset4.jpg'
                    }
                },]
        };
    }


    render() {
        return (
            <View style={this.props.style}>
                <View style={{
                    width: width,
                    justifyContent: 'space-between',
                    elevation: 5,
                    backgroundColor: 'white'
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.availableJourneys}>Choose a Journey</Text>
                        <TouchableOpacity style={{marginHorizontal: 20,}}>
                            <LinearGradient colors={['#4D81C2', '#00BDF2']} start={{x: 0, y: .50}}
                                            end={{x: 1, y: .50}}
                                            style={{
                                                marginVertical: 10,
                                                borderRadius: 20,
                                                alignSelf: 'flex-start',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                <Icon name="ios-add"
                                      style={{color: 'white', marginLeft: 20, marginRight: 10}} size={20}/>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginVertical: 10,
                                        marginRight: 20,
                                        fontSize: 14
                                    }}>
                                    New Journey</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View>
                    </View>
                </View>
                <FlatList
                    style={{flex: 1, marginBottom: 30, marginTop: 10}}
                    data={this.state.journeys}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, index}) =>
                        <JourneyListItemTwo
                            index={index}
                            name={item.title}
                            description={item.description}
                            meta={item.meta}

                        />
                    }
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        titleText: {
            color: 'white',
            fontSize: 18
        },
        actionLinearGradient: {
            marginVertical: 10,
            borderRadius: 3,
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        userPhoto: {
            height: 32,
            width: 32,
            borderRadius: 40,
        },
        cardContainer: {
            backgroundColor: 'white',
            elevation: 10,
            width: width * 0.9,
            flex: 0,
            borderRadius: 5,
            alignItems: 'center',
        },
        mainTitle:
            {
                color: 'white',
                fontWeight: 'bold',
                margin: 10,
                fontSize: 40,
                marginVertical: 5,
                marginHorizontal: 15,
            }
        ,
        availableJourneys: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 10,
            marginLeft: 15,
            color: '#4D81C2'
        }
        ,
        linearGradient: {
            backgroundColor: "transparent",
            flex: 1,
            position: "absolute",
            width: width,
            height: height * 0.42,

        },

        subText: {
            marginHorizontal: 20,
            fontSize: 14
        }

    })
;

// You can then use your `FadeInView` in place of a `View` in your components:
export default JourneyPicker;