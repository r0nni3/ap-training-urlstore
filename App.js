import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, AsyncStorage} from 'react-native';
import Header from './src/components/header';
import UrlList from './src/components/UrlList';
import InputForm from './src/InputForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { urls: [], value: '' };
    this.removeFromList = this.removeFromList.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  addToList(url) {
    const i = `${this.state.urls.length}`;
    AsyncStorage.setItem(i, url).then((res) => {
      const newList = [
        ... this.state.urls,
        {title: i, link: url}
      ];
      this.setState({urls: newList, value: ''});
    }).catch(err => {
      Alert.alert("Error",
        err.message, [], { cancelable: true, onDismiss: () => {} });
    });
  }

  removeFromList(key) {
    AsyncStorage.removeItem(`${key}`).then(() => {
      const newList = this.state.urls.filter((url) => {
        return url.title !== key;
      });
  
      this.setState({ urls: newList });
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
        <UrlList urls={this.state.urls} onDelete={this.removeFromList} />
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
