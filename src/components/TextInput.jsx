import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    error: {
        padding: 10,
        margin: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#d73a4a',
        borderRadius: 5,
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  if (error) {
      return <NativeTextInput style={styles.error} {...props} />;

  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;