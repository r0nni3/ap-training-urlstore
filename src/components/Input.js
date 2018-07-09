import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, isSecure }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={isSecure}
      />
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

export { Input };
