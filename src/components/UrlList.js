import React, { Component } from 'react';
import { StyleSheet, ListView, Text, View } from 'react-native';
import UrlDetail from './UrlDetail';

class UrlList extends Component {
  state = { urls: this.props.urls };

  renderUrls ({onDelete}) {
    return (url) => {
      return (
        <UrlDetail key={url.key} url={url} onDelete={onDelete} />
      );
    };
  }

  render () {
    if (this.props.urls.getRowCount() > 0) {
      const renderRow = this.renderUrls(this.props);
      return (
        <ListView 
          dataSource={this.props.urls}
          renderRow={renderRow}
        />
      );
    }

    return (
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Start adding urls!</Text>
      </View>
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
