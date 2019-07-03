import React ,{ Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({email, password});
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Log in
            </Button>
        );;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                    label="Email"
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    keyboardType="email-address"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                    secureTextEntry
                    label="Password"
                    placeholder="********"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    />
                    </CardSection>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                    <View style={styles.hr} />
                    {this.renderError()}

                    <View style={styles.hr} />
            </Card>
        );
    };
}
const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'
    },
    hr: {
        backgroundColor: 'black', 
        height: 1
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    
    return { email, password, error, loading };
};

export default connect(
    mapStateToProps, 
    {
         emailChanged, 
         passwordChanged,
         loginUser 
     }
    )(LoginForm);
