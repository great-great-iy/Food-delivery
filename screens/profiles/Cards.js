/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import { ButtonCommon } from '../../components';
import { useStore } from '../../store/hooks';
import * as actions from '../../store/actions';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 60;


export default function Cards({ navigation}) {
    const [state, dispatch] = useStore();
    const [listAccount, setListAccount] = React.useState(state.listUser ? [...state.listUser] : []);
    const [account, setAccount] = React.useState(state.userData ? {...state.userData} : null);
    const [userToken, setUserToken] = React.useState(state.userToken ? {...state.userToken} : null);
    const [listCard, setListCard] = React.useState(state?.userData?.listCards ? [...state?.userData?.listCards] : []);
    const [picked, setPicked] = React.useState(null);


    const handleDelete = (value) => {
        if (listAccount && Array.isArray(listAccount)) {
            let newList = [...listAccount];
            newList.forEach((item, index) => {
                if (item.username == userToken.username) {
                    let list = item['listCards'].filter(item => item.cardNumber != value)
                    item['listCards'] = list;
                    setListCard(list);
                }
            })
            dispatch(actions.setListUser(newList));
            dispatch(actions.isDeleteCard());
            AsyncStorage.setItem('account', JSON.stringify(newList))
        }
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' }}>
            <View style={{flex: 1 }}>
                <HeaderSub navigation={navigation} text={'Payment Setting'} />
            </View>
            <View style={{ flex: 7, justifyContent: 'flex-start' }}>
                {/* Card */}
                {listCard && listCard.length > 0 && <FlatList
                    data={listCard}
                    renderItem={({ item, index }) => {
                        return <TouchableOpacity
                            onPress={() => setPicked(item.cardNumber)}
                            style={[styles.spaceBetween, {backgroundColor: picked == item.cardNumber ? '#eee' : '#FFF'}]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.center, styles.iconStyle]}>
                                    <Image source={require('../../assets/images/credit-card.png')} />
                                </View>
                                <Text>{item.card}</Text>
                            </View>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>{item.cardNumber}</Text>
                                <TouchableOpacity
                                    style={[styles.center, { width: 24, height: 24 }]}>
                                    <ChevronRightIcon />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    }}
                />}
            </View>
            <View style={{ flex: 2 }}>
                <ButtonCommon
                    active
                    text={'Make as Default'}
                />
                <ButtonCommon
                    text={'Remove'}
                    onPress={() =>
                        Alert.alert('Delete Card', 'Do you want delete card?', [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "OK",
                                onPress: () => handleDelete(picked)
                            }
                        ])}
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