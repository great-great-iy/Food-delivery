import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ButtonCommon } from '../../components';
import HeaderSub from '../../components/HeaderSub';
import { countries } from '../../data/data';
import { useStore } from '../../store/hooks';
import { windowWidth } from '../Home';

export const fullDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    return fullDate;
}

export default function MyProfile({ navigation, route }) {
    // const {listAccount, account} = route.params;
    const [state, dispatch] = useStore();
    const [account, setAccount] = React.useState(state.userData ? {...state.userData} : null);

    React.useEffect(() => {
        setAccount({...state.userData})
    }, [state.isEditProfile, state.userData])
    console.log('my profile', account);
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF' }}>

            <View style={{}}>
                <HeaderSub navigation={navigation} text={'My Profile'} />
            </View>

            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/avatar.png')}
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Fist Name</Text>
                        <Text style={[styles.textStyle]}>{account?.profile?.firstName}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Last Name</Text>
                        <Text style={[styles.textStyle]}>{account?.profile?.lastName}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Brithday</Text>
                        <Text style={[styles.textStyle]}>{ fullDate(new Date(account?.profile?.date))}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Gender</Text>
                        <Text style={[styles.textStyle]}>{account?.profile?.gender}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Phone number</Text>
                        <Text style={[styles.textStyle]}>{account?.profile?.phoneNumber}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Email</Text>
                        <Text style={[styles.textStyle]}>{account?.profile?.email}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lableStyle}>Location</Text>
                        <Text style={[styles.textStyle]}>{account?.profile?.location}</Text>
                    </View>
                </View>
            </View>
            <View>
                <ButtonCommon
                    active
                    text={'Edit Profile'}
                    onPress={() => navigation.navigate('EditProfile', { account: account })}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#34495E',
    },
    lableStyle: {
        width: windowWidth / 4,
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 16,
        color: '#888'
    },
    textStyle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 16,
        color: '#111'
    }
})