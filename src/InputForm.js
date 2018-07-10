import React, { Component } from 'react';
import { Text } from 'react-native';
import Card from './components/Card';
import CardSection from './components/CardSection';
import {InputWithButton} from './components/InputWithButton';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value, error: '' };
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const { value } = this.state;

    if (value.trim().length <= 0) {
      return this.setState({ error: "oops! no empty values"});
    }

    this.props.onAdd(value);
    this.setState({value: ''});
  }

  render() {
    return (
      <Card>
        <CardSection>
          <InputWithButton 
            label="Add"
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
            placeholder="http://app-press.com"
            onPress={this.onButtonPress}
          />
        </CardSection>

        <Text style={styles.errorText}>
          {this.state.error}
        </Text>
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
