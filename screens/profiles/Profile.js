/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonCommon } from '../../components';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg';
import { useStore } from '../../store/hooks';
import * as actions from '../../store/actions';

export default function Profile({ navigation }) {
    const [state, dispatch] = useStore();
    const [listAccount, setListAccount] = React.useState(state.listUser ? [...state.listUser] : []);
    const [account, setAccount] = React.useState(state.userData ? {...state.userData} : null);
    const [userToken, setUserToken] = React.useState(state.userToken ? {...state.userToken} : null);

    React.useEffect(() => {
        setListAccount([...state.listUser]);
        setAccount( {...state.userData})
    }, [state])

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ alignItems: 'center', marginVertical: 20, }}>
                <Image
                    source={require('../../assets/images/avatar.png')}
                />
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '700', lineHeight: 27, color: '#000', marginTop: 20 }}>{`${account?.profile?.firstName} ${account?.profile?.lastName}`}</Text>
                <Text style={{ color: '#000', fontSize: 14, fontWeight: '400', lineHeight: 16 }}>{account?.profile?.phoneNumber}</Text>
            </View>
            <View style={{ marginHorizontal: 30, flex: 1 }}>
                <TouchableOpacity
                    style={styles.optionStyle}
                    onPress={() => navigation.navigate('MyProfile')}
                >
                    <Text style={styles.textStyle}>My Profile</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
                {/*  */}
                <TouchableOpacity
                    style={styles.optionStyle}
                    onPress={() => {
                        navigation.navigate('ChangePassword', { listAccount: listAccount, account: account, userToken: userToken })
                    }}
                >
                    <Text style={styles.textStyle}>Change Password</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionStyle}
                    onPress={() => {
                        navigation.navigate('PaySetting')
                    }}
                >
                    <Text style={styles.textStyle}>Payment Settings</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionStyle}
                >
                    <Text style={styles.textStyle}>My Voucher</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionStyle}
                >
                    <Text style={styles.textStyle}>Notification</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionStyle}
                >
                    <Text style={styles.textStyle}>About Us</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionStyle}
                >
                    <Text style={styles.textStyle}>Contant Us</Text>
                    <ChevronRightIcon />
                </TouchableOpacity>
            </View>
            <View>
                <ButtonCommon
                    onPress={() => {
                        AsyncStorage.removeItem('userToken');
                        dispatch(actions.setToken(null));
                        dispatch(actions.signOut(false));
                    }}
                    text={'Sign Out'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    optionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '500',
        color: '#000',
        marginVertical: 11,
    },
})