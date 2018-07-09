import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={styles.button}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#007aff',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  }
};

export default Button;
