import React, { Component } from 'react';
import { StyleSheet, ListView, View, Alert } from 'react-native';
import UrlList from '../components/UrlList';
import ButtonForm from '../components/ButtonForm';
import { store } from '../state';
import {
  saveOnAsyncStorage, removeFromAsyncStorage, loadFromAsyncStorage,
  updateOnAsyncStorage
} from '../state/Actions';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'URL List'
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { ds: ds.cloneWithRows([]), value: '' };
    this.loadList = this.loadList.bind(this);
    this._saveUrl = this._saveUrl.bind(this);
    this._updateUrl = this._updateUrl.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.addToList = this.addToList.bind(this);
    this.editUrl = this.editUrl.bind(this);
  }

  componentWillMount() {
    this.loadList();
  }

  loadList() {
    store.dispatch(loadFromAsyncStorage()).then(() => {
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});
    }).catch(err => {
      console.log(err);
    });
  }

  _saveUrl({key, link}, cb = null) {
    // Async dispatch thunk
    store.dispatch(saveOnAsyncStorage(key, link)).then((res) => {
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});

      if (cb) return Promise.resolve(cb());
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  _updateUrl({key, link}, cb = null) {
    // Async dispatch thunk
    store.dispatch(updateOnAsyncStorage(key, link)).then((res) => {
      // Updates UI
      const state = store.getState();
      this.setState({ds: this.state.ds.cloneWithRows(state.urls), value: ''});

      if (cb) return Promise.resolve(cb());
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  addToList(url, cb = null) {
    const key = `${+ new Date()}`;
    this._saveUrl({key, link:url}, cb);
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

  editUrl({key, link}, cb = null) {
    this._updateUrl({key, link}, cb);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ButtonForm 
          onClick={() => navigation.navigate('AddEdit', {onSave: this.addToList})}
          label="Add New" />
        <UrlList 
          urls={this.state.ds} onDelete={this.removeFromList}
          onPressItem={(rowData) => navigation.navigate('AddEdit', {onSave: this.editUrl, rowData})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
});

export { HomeScreen };