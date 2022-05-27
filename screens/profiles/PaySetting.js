/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import { useStore } from '../../store/hooks';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 60;


export default function PaySetting({ navigation }) {
  const [state, dispatch] = useStore();
  const [listCard, setListCard] = React.useState(state?.userData?.listCards ? [...state?.userData?.listCards] : []);
  
  React.useEffect(() => {
    setListCard([
      ...state.userData?.listCards
    ])
  },[state.isAddCard, state.userData])

  const handleDelete = (value) => {
    if (state?.listUser && Array.isArray(state?.listUser)) {
      let newList = [...state?.listUser];
      newList.forEach((item, index) => {
        if (item.username == user.username) {
          let list = item['listCards'].filter(item => item.cardNumber != value)
          item['listCards'] = list;
          setListCard(list);
        }
      })
      AsyncStorage.setItem('account', JSON.stringify(newList))
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
      <View style={{ marginBottom: 30 }}>
        <HeaderSub navigation={navigation} text={'Payment Setting'} />
      </View>
      <View>
        <View style={styles.spaceBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.center, styles.iconStyle]}>
              <Image source={require('../../assets/images/paypal.png')} />
            </View>
            <Text>Paypal</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 30 }}>
            <Text>example@gmail.com</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Paypal')}
              style={[styles.center, { width: 24, height: 24 }]}>
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>
        </View>
        {/* Card */}
        {listCard && listCard.length > 0 && <FlatList
          data={listCard}
          renderItem={({ item, index }) => {
            return <View style={styles.spaceBetween}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.center, styles.iconStyle]}>
                  <Image source={require('../../assets/images/credit-card.png')} />
                </View>
                <Text>{item.card}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{item.cardNumber}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Cards')}
                  style={[styles.center, { width: 24, height: 24 }]}>
                  <ChevronRightIcon />
                </TouchableOpacity>
              </View>
            </View>
          }}
        />}
        <View style={styles.spaceBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.center, styles.iconStyle]}>
              <Image source={require('../../assets/images/card.png')} />
            </View>
            <Text>Add new payment method</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddCreditCard')}
            style={[styles.iconStyle, styles.center]}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
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