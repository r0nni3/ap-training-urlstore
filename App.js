import React, {Component} from 'react';
import {StyleSheet, ListView, View, Alert, AsyncStorage} from 'react-native';
import Header from './src/components/header';
import UrlList from './src/components/UrlList';
import InputForm from './src/InputForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = { urls: [], ds: ds.cloneWithRows([]), value: '' };
    this.removeFromList = this.removeFromList.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  addToList(url) {
    const i = `${this.state.urls.length}`;
    AsyncStorage.setItem(i, url).then((res) => {
      const newList = [
        ... this.state.urls,
        {key: i, link: url}
      ];
      this.setState({urls: newList, ds: this.state.ds.cloneWithRows(newList), value: ''});
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  removeFromList(key) {
    AsyncStorage.removeItem(`${key}`).then(() => {
      const newList = this.state.urls.filter((url) => {
        return url.key !== key;
      });
  
      this.setState({ urls: newList, ds: this.state.ds.cloneWithRows(newList) });
      Alert.alert('Deleted', key, [],
        { cancelable: true, onDismiss: () => {} }
      );
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="URL List" />
        <InputForm value={this.state.value} onAdd={this.addToList} />
        <UrlList urls={this.state.ds} onDelete={this.removeFromList} />
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
