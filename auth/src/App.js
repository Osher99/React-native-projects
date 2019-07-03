import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LogInForm from './components/LogInForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBH-v-g_h6rvxSHt1qCka2Dn_qfQFkZEMI',
            authDomain: 'authenticationproject-fcc59.firebaseapp.com',
            databaseURL: 'https://authenticationproject-fcc59.firebaseio.com',
            projectId: 'authenticationproject-fcc59',
            storageBucket: '',
            messagingSenderId: '927820321870',
            appId: '1:927820321870:web:87b0288b654b5bf2'
          });

          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState( {loggedIn: true });
              } else {
                this.setState( {loggedIn: false });
              }
          });
       }

       renderContent() {
           switch (this.state.loggedIn) {
               case true:
                   return (
                        <View style={{ flexDirection: 'row' }}>
                       <Button onPress={() => firebase.auth().signOut()}>
                           Log Out
                       </Button>
                       </View>
                   );
                   case false: 
                   return <LogInForm />
                   default:
                   return (
                        <View style={{ flexDirection: 'row' }}>
                       <Spinner size="large" />
                       </View>
                       );
           }

        //    if (this.state.loggedIn) {
        //        return (
        //            <Button>
        //                Log Out
        //            </Button>
        //        )
        //    } else {
        //        return <LogInForm />;
        //    }
       }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                { this.renderContent() }
            </View>
        );
    }
}

const styles = {
    spinnerStyle: {
        paddingTop: 200
    }
}

export default App;
