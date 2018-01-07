import React from 'react';
import {Animated, Text, View, TouchableOpacity, Dimensions, Switch, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            switchValue: false
        };
    }

    toggleSwitch = (value) => {
        this.setState({switchValue: value})
        this.props.callback(value);
    }


    render() {

        const values = ['1', '2'];

        var renderPickerItems = () => {
           return this.props.pickerValues.map((index, item) => {

                return <Picker.Item key ={index} label={'fuck'} value={item}/>
            })
        }

        return (
            <View style={this.props.style}>
                <View style={{
                    width: width,
                    backgroundColor: '#3F3F3F',
                    opacity: 0.3,
                    position: 'absolute'
                }}>
                    <Text
                        style={{
                            marginVertical: 15,
                            fontSize: this.props.fontSize,
                            color: 'transparent',
                        }}>{this.props.title}
                    </Text>

                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 2}}>
                        <Text
                            style={{
                                marginVertical: 15,
                                marginHorizontal: 20,
                                fontSize: this.props.fontSize,
                                color: 'white',
                            }}>{this.props.title}</Text>
                    </View>
                    {this.props.switch ?
                        <Switch
                            value={this.state.switchValue}
                            onValueChange={this.toggleSwitch}
                            thumbTintColor={'white'}
                            tintColor={'#3E5A88'}
                            onTintColor={'#3E5A88'}
                            style={{marginRight: 10}}/> : null}
                    {this.props.picker && this.props.pickerValues ?
                        <Picker
                            style={{
                                flex: 1,
                                color: 'white',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end'
                            }}
                            itemStyle={{
                                backgroundColor: 'white',
                                textAlign: 'right',
                                fontSize: this.props.fontSize,
                            }}
                            mode="dropdown"
                            color={'white'}
                            textStyle={{fontSize: 12, color: 'yellow', textAlign: 'right'}}
                            selectedValue={'Public'}
                         >

                            {this.props.pickerValues.map((item, index) => {

                                return <Picker.Item key ={index} label={item} value={item}/>
                            })}
                        </Picker>
                        : null}

                </View>
            </View>
        );
    }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default ListItem;