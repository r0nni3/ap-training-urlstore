import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InputForm from '../components/InputForm';

class AddEditScreen extends Component {
  static navigationOptions = {
    title: 'Add / Edit Screen'
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    const rowData = navigation.getParam("rowData", null);
    this.state = (rowData) ? this.state = { value: rowData.link } : { value: '' };
    this.addToList = this.addToList.bind(this);
  }

  addToList(url) {
    const { navigation } = this.props;
    const onSave = navigation.getParam('onSave', null);
    const rowData = navigation.getParam('rowData', null);

    if (!onSave) return;

    // if rowData is present, is an edit operation.
    if (rowData !== null)
      onSave(
        Object.assign({}, rowData, {link: url}),
        () => navigation.goBack()
      );
    // else, is an add new operation
    else onSave(url, () => navigation.goBack());
  }

  render() {
    return (
      <View style={styles.container}>
        <InputForm
          value={this.state.value} onAdd={this.addToList} buttonLabel="Save" />
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

export { AddEditScreen };