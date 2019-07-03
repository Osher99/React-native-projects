// Component imports
import React from 'react';
import { AppRegistry, View } from 'react-native';
import { name as appName } from './app.json';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

// Components
const App = () => (
        <View style={{ flex: 1 }}>
          <Header headerText={'Albums'} />
          <AlbumList />
        </View>
    );

// Render components
AppRegistry.registerComponent(appName, () => App);

//AppRegistry.registerComponent(appName, () => Header);
