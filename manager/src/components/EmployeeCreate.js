import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import { employeeCreate, newEmployee, employeeBack } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {

    componentWillMount() {  
        this.props.employeeBack();
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.newEmployee({ name, phone, shift });
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
}

export default connect(
    mapStateToProps, 
    { employeeCreate, newEmployee, employeeBack })(EmployeeCreate);
