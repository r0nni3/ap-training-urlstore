import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, ListView, View, Alert, AsyncStorage } from 'react-native';
import Header from './src/components/header';
import UrlList from './src/components/UrlList';
import InputForm from './src/InputForm';
import { store } from './src/state';
import { addUrl, removeUrl, loadFromAsyncStorage } from './src/state/Actions';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { ds: ds.cloneWithRows([]), value: '' };
    this.removeFromList = this.removeFromList.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getAllKeys().then(keys => {
      return AsyncStorage.multiGet(keys);
    }).then(urls => {
      // Loads data contained on AsyncStorage
      store.dispatch(loadFromAsyncStorage(urls));
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});
      // Logging
      console.log(urls);
    }).catch(err => {
      console.log(err);
    });
  }

  addToList(url) {
    const i = `${+ new Date()}`;
    AsyncStorage.setItem(i, url).then((res) => {
      // Adds new url to store
      store.dispatch(addUrl(i, url));
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});
      // Logging
      console.log("Store State: ", state);
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  removeFromList(key) {
    AsyncStorage.removeItem(`${key}`).then(() => {
      // Removes url from store
      store.dispatch(removeUrl(key));
      // Updates UI
      const state = store.getState();
      this.setState({ ds: this.state.ds.cloneWithRows(state.urls) });
      // Logging
      console.log('Deleted: ', key);
      console.log(store.getState());
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    })
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
