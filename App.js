import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation'; 
import { store } from './src/state';
import { HomeScreen, AddEditScreen } from './src/screens';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  AddEdit: AddEditScreen
}, {
  initialRouteName: 'Home'
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
  }
}
