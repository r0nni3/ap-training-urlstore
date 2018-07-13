import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';

class ButtonForm extends Component {
  constructor(props) {
    super(props);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    this.props.onClick()
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.onButtonPress}>{this.props.label}</Button>
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

export default ButtonForm;
