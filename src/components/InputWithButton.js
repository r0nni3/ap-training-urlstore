import React from 'react';
import { TextInput, View } from 'react-native';
import Button from './Button';

const InputWithButton = (props) => {
  const { label, value, onChangeText, placeholder, isSecure, onPress } = props;
  return (
    <View style={styles.container}>
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={isSecure}
      />
      <Button 
        style={styles.label}
        onPress={onPress}>{label}</Button>
    </View>
  );
};

const styles = {
  container: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  textInput: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
};

export { InputWithButton };
