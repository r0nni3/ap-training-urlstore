import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, ListView, View, Alert, AsyncStorage } from 'react-native';
import Header from './src/components/header';
import UrlList from './src/components/UrlList';
import InputForm from './src/InputForm';
import { store } from './src/state';
import { saveOnAsyncStorage, removeFromAsyncStorage, loadFromAsyncStorage } from './src/state/Actions';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { ds: ds.cloneWithRows([]), value: '' };
    this.removeFromList = this.removeFromList.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentWillMount() {
    store.dispatch(loadFromAsyncStorage()).then(() => {
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});
    }).catch(err => {
      console.log(err);
    });
  }

  addToList(url) {
    const key = `${+ new Date()}`;
    // Async dispatch thunk
    store.dispatch(saveOnAsyncStorage(key, url)).then((res) => {
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  removeFromList(key) {
    // Async dispatch thunk
    store.dispatch(removeFromAsyncStorage(key)).then(() => {
      // Updates UI
      const state = store.getState();
      this.setState({ ds: this.state.ds.cloneWithRows(state.urls) });
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header text="URL List" />
          <InputForm value={this.state.value} onAdd={this.addToList} />
          <UrlList urls={this.state.ds} onDelete={this.removeFromList} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
});
