import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeCreate } from '../actions';
import { Input, CardSection, Card } from './common';

class EmployeeForm extends Component{
    render() {
        return (
            <View>
                
                <CardSection>
                <Text style={styles.labelStyle}>Full Name:    {this.props.name} </Text>
                </CardSection>
                <CardSection>
                    <Input 
                    label="Full Name:" 
                    placeholder="Name"
                    // value={this.props.name}
                     onChangeText={value => this.props.employeeCreate({ prop: 'name', value })}
                    />
                </CardSection>
                <CardSection>
                <Text style={styles.labelStyle}>Phone number:   {this.props.phone} </Text>
                </CardSection>
                <CardSection>
                    <Input 
                    label="Phone:"
                    keyboardType="numeric"
                    maxLength={12}
                    // value={this.props.phone}
                     placeholder="555-555-5555"
                      onChangeText={value => this.props.employeeCreate({ prop: 'phone', value })}
                      />
                </CardSection>
                <CardSection>
                    <Text style={styles.pickerTextStyle}>Select a Shift:</Text>
                    <Picker  
                    style={{ flex: 2} }
                    selectedValue={this.props.shift}
                    onValueChange={ value => this.props.employeeCreate({ prop: 'shift', value })}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wendesday" value="Wendesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </CardSection>

            </View>
        );
    }
}

const styles = {
    pickerTextStyle: {
        flex: 2,
        fontSize: 17,
        alignSelf: 'center',
        color: 'black',
        paddingRight: 20
    },
    labelStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center'
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeCreate })
(EmployeeForm);
