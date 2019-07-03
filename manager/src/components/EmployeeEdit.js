import _ from 'lodash';
import React, { Component } from 'react';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { connect } from 'react-redux';
import { employeeCreate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import { Actions } from 'react-native-router-flux';

class EmployeeEdit extends Component{

    state = { showModal: false }

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeCreate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid});
        
    }

    onDiscardPress() {
        Actions.employeeList({ type: 'reset' });
    }

    onTextPress() {
        const { phone , shift } = this.props;

        Communications.text(phone, `You're upcoming shift is on ${shift}`);
    }

    onAccept() {
        const { uid } = this.props.employee;
        
        this.props.employeeDelete({ uid });
    }

    onDecline() {
        this.setState({ showModal: false});
    }

    render(){
        return (
            <Card>
                <EmployeeForm />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>
              
                <CardSection>
                    <Button onPress={this.onDiscardPress.bind(this)}>
                        Discard Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                
                <CardSection>
                    <Button style={styles.altButtonStyle} onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Delete Employee
                    </Button>
                </CardSection>

                <Confirm
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this employee?
                </Confirm>
            </Card>
        );
    }
}

const styles = {
    altButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        marginRight: 5,
        marginLeft: 5
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift }
};

export default connect(mapStateToProps,
     {employeeCreate, employeeSave, employeeDelete})
(EmployeeEdit);