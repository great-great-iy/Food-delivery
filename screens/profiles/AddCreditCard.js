/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { TextInput } from 'react-native-paper';
import { ButtonCommon } from '../../components';
import HeaderSub from '../../components/HeaderSub';
import { useStore } from '../../store/hooks';
import * as actions from '../../store/actions';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 60;


export default function AddCreditCard({ navigation, route }) {
    const [state, dispatch] = useStore();
    const [listAccount, setListAccount] = React.useState([...state.listUser])
    const [user, setUser] = React.useState(state.userToken);


    const [newArray, setNewArray] = React.useState(null);
    const [bankName, setBankName] = React.useState('AZRAEN');
    const [holderName, setHolderName] = React.useState('Itoh');
    const [cardNumber, setCardNumber] = React.useState('4444 3784 1380 6739');
    const [goodThruDate, setGoodThruDate] = React.useState('02/22');
    const [cvv, setCvv] = React.useState('877');


    const [card, setCard] = React.useState('Credit Card');
    const [error, setError] = React.useState({
        cardNumberError: null,
        cardNumberExist: null,
    });

    const handleAddCrard = () => {

        if (listAccount && Array.isArray(listAccount)) {
            let newList = [...listAccount];
            const cardInfo = {
                bankName: bankName,
                holderName: holderName,
                cardNumber: cardNumber,
                goodThruDate: goodThruDate,
                cvv: cvv,
                card: card,
            }
            let check = null;
            newList.forEach((item, index) => {
                if (item.username == user.username) {
                    let list = item['listCards'] ? [...item['listCards']] : [];

                    if (item['listCards'] && Array.isArray(item['listCards'])) {
                        if (!item['listCards'].some((item) => item.cardNumber == cardNumber)) {
                            list = [...item['listCards'], cardInfo];
                            check = false;
                            setError({
                                ...error,
                                cardNumberExist: false,
                            })
                        }
                        else {
                            check = true;
                           setError({
                                ...error,
                                cardNumberExist: true,
                            })
                            Alert.alert('Card Exist!', 'Your card is exist!')
                        }
                    }
                    else {
                        list.push(cardInfo);
                    }
                    item['listCards'] = list;
                }
            })
            if(!check) {
                dispatch(actions.isAddCard())
                AsyncStorage.setItem('account', JSON.stringify(newList)).then(() => {
                    navigation.goBack();
                })
            }
        }
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 30 }}>
            <View style={{}}>
                <HeaderSub text={'Add Credit Card'} screen="PaySetting" navigation={navigation} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ position: 'relative' }}>
                    <View>
                        <Image
                            style={{ width: itemWidth, height: 196, resizeMode: 'contain' }}
                            source={require('../../assets/images/mastercard.png')}
                        />
                    </View>
                    <View style={{ position: 'absolute', top: 15, right: 32 }}>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontWeight: '800', lineHeight: 26, color: '#fff' }}>{bankName}</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 15, left: 42 }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '800', lineHeight: 27, color: '#fff', textTransform: 'uppercase' }}>{holderName}</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 50, left: 42 }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', lineHeight: 18, color: '#fff' }}>{`${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12, 17)}`}</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 22, left: 42 }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '600', lineHeight: 18, color: '#fff' }}>{goodThruDate}</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 78, left: 42 }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '600', lineHeight: 18, color: '#fff' }}>{card}</Text>
                    </View>
                </View>
                <FlatList
                    data={[1]}
                    renderItem={() => <View>
                        <View style={styles.spaceBetween}>
                            <Text>Bank name</Text>
                            <TextInput
                                placeholder='Your Bank'
                                style={{ width: '60%', height: 30, backgroundColor: 'transparent' }}
                                onChangeText={setBankName}
                            />
                        </View>
                        <View style={styles.spaceBetween}>
                            <Text>Your name</Text>
                            <TextInput
                                placeholder='Your name'
                                style={{ width: '60%', height: 30, backgroundColor: 'transparent' }}
                                onChangeText={setHolderName}
                            />
                        </View>
                        <View>
                            <View style={styles.spaceBetween}>
                                <Text>Card number</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder='#### #### #### ####'
                                    style={{ width: '60%', height: 30, backgroundColor: 'transparent' }}
                                    onChangeText={(value) => {
                                        if (value.trim().length == 16) {
                                            setCardNumber(value);
                                            setError({
                                                ...error,
                                                cardNumberError: false,
                                            })
                                        } else {
                                            setError({
                                                ...error,
                                                cardNumberError: true,
                                            })
                                        }
                                    }}
                                />
                            </View>
                            {error.cardNumberError && <Text style={styles.errorStyle}>Card number incorrect!</Text>}
                        </View>
                        <View style={styles.spaceBetween}>
                            <Text>Good Thru Date</Text>
                            <TextInput
                                placeholder='MM/YY'
                                keyboardType='numeric'
                                style={{ width: '60%', height: 30, backgroundColor: 'transparent' }}
                                onChangeText={(value) => {
                                    setGoodThruDate
                                }}
                            />
                        </View>
                        <View style={styles.spaceBetween}>
                            <Text>CVV</Text>
                            <TextInput
                                placeholder='###'
                                keyboardType='numeric'
                                style={{ width: '60%', height: 30, backgroundColor: 'transparent' }}
                                onChangeText={setCvv}
                            />
                        </View>
                        <View style={[styles.spaceBetween]}>
                            <Text style={{ paddingBottom: 15 }}>Credit or Debit Card</Text>
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    setCard('Credit Card')
                                }}
                                isChecked={card == 'Credit Card'}
                                leftText={"Credit Card"}
                            />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    setCard('Debit Card')
                                }}
                                isChecked={card == 'Debit Card'}
                                leftText={"Debit Card"}
                            />
                        </View>

                    </View>}
                />
            </View>
            <View style={{ padding: 0, backgroundColor: 'transparent' }}>
                <ButtonCommon
                    onPress={() => {
                        if (error.cardNumberError) {
                            Alert.alert('Error!')
                        } else handleAddCrard()
                    }}
                    text={'Add'}
                    active
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    errorStyle: {
        color: 'red',
        fontSize: 10,
        marginTop: -10,
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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