import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ButtonCommon, HeaderSub } from '../../components';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg';


export default function Paypal({ navigation }) {

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1 }}>
        <HeaderSub text={'Paypal'} navigation={navigation} />
      </View>
      <View style={[styles.spaceBetween, { flex: 7, alignItems: 'flex-start' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.center, styles.iconStyle]}>
            <Image source={require('../../assets/images/paypal.png')} />
          </View>
          <Text>Paypal</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 30 }}>
          <Text>example@gmail.com</Text>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.center, { width: 24, height: 24 }]}>
            <ChevronRightIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <ButtonCommon
          active
          text={'Make as Default'}
        />
        <ButtonCommon
          text={'Remove'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconStyle: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeStyle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  textHeader: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',

    color: '#000',
  },
  textStyle: {
    // textAlign: 'right',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#34495E',
  },
  textError: {
    color: 'red',
    marginTop: 10,
  },
})