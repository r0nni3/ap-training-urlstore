import React, { Component } from 'react';
import { Text, AsyncStorage, Alert } from 'react-native';
import Button from './components/Button';
import Card from './components/Card';
import CardSection from './components/CardSection';
import {Input} from './components/Input';

class InputForm extends Component {
  state = { value: this.props.value, error: '' };

  onButtonPress() {
    const { value, error } = this.state;

    if (value.trim().length <= 0) {
      return this.setState({ error: "oops! no empty values"});
    }

    this.props.onAdd(value);
    this.setState({value: ''});
  }

  renderButton() {
    return (
      <Button onPress={this.onButtonPress.bind(this)}>Add</Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="URL"
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
            placeholder="http://app-press.com"
          />
        </CardSection>

        <Text style={styles.errorText}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default InputForm;
