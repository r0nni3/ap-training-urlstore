import React, { Component } from 'react';
import { StyleSheet, ScrollView, Alert, AsyncStorage, Text, View } from 'react-native';
import UrlDetail from './UrlDetail';

class UrlList extends Component {
  state = { urls: this.props.urls };

  renderUrls (urls) {
    if (urls.length > 0) {
      return urls.map(url =>
        <UrlDetail key={url.title} url={url} onDelete={this.props.onDelete} />
      );
    }

    return (
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Start adding urls!</Text>
      </View>
    );
  }

  render () {
    return (
      <ScrollView>
        {this.renderUrls(this.props.urls)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  textHeader: {
    fontSize: 18
  }
});

export default UrlList;
