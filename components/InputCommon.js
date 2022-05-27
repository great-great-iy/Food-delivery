/* eslint-disable prettier/prettier */
import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function InputCommon(props) {
  const { customer, ...rest } = props;
  return (
    <View>
      <TextInput
        style={[styles.inputUserInfor, customer && { paddingLeft: 50 }]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputUserInfor: {
    width: '100%',
    height: 50,
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#edeef2',
  },
});
