/* eslint-disable prettier/prettier */
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function ButtonCommon(props) {
  const { text, active } = props;
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, active && styles.activeBtn]}
      {...props}
    >
      <Text style={[styles.textStyle, active && styles.activeTxt]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: '#ECF0F1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#000',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
  },
  activeBtn: {
    backgroundColor: '#D35400',
  },
  activeTxt: {
    color: '#FFF',
  },

});
