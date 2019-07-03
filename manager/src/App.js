import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import { YellowBox } from 'react-native';
import _ from 'lodash';

class App extends Component {


    
    componentWillMount() {
        // web app's Firebase configuration
        var firebaseConfig = {
            apiKey: 'AIzaSyBwrlpy6zceOQp2Vgr_APrl3Du-aKzNUNI',
            authDomain: 'appmanager-cb8f6.firebaseapp.com',
            databaseURL: 'https://appmanager-cb8f6.firebaseio.com',
            projectId: 'appmanager-cb8f6',
            storageBucket: '',
            messagingSenderId: '445796254680',
            appId: '1:445796254680:web:3339f0c31094664a'
        };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

    render() {
YellowBox.ignoreWarnings(['ListView is deprecated']);
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


        const store = createStore(
            reducers,
            {},
            applyMiddleware(ReduxThunk)
            );

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    };
};

export default App;
