/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ButtonCommon, Footer, Header, InputCommon } from '../components';
import HeaderSub from '../components/HeaderSub';
import { useStore } from '../store/hooks';
import { styles } from './SignInScreen';
import * as actions from '../store/actions';

export default function SignUpScreen({ navigation }) {
    const [state, dispatch] = useStore();
    const [listAccounts, setListAccounts] = useState([...state.listUser]);
    const [account, setAccount] = useState({
        username: '',
        password: '',
        rePassword: '',
    });
    const [isExist, setIsExist] = useState(false);
    const [checkLength, setCheckLength] = useState(false);
    const [checkPass, setCheckPass] = useState(false);

    console.log('sign up', listAccounts);

    const onChange = (value) => {
        setScreen(value);
    };

    const onSignUp = (value) => {
        let list = [...listAccounts];
        if (listAccounts !== null && listAccounts.length > 0 && listAccounts.some(item => item.username == value.username)) {
            setIsExist(true);
            return;
        } else {
            list.push(value);
        }
        AsyncStorage.setItem('account', JSON.stringify(list)).then((data) => {
            dispatch(actions.signUp())
            return navigation.navigate('SignIn')
        })
    };

    const setExist = (value) => {
        setIsExist(value);
    };


    const onSetAccount = (data) => {
        const user = {
            username: data.username,
            password: data.password,
        };
        if (data.username !== '' && data.password !== '') {
            onSignUp(user);
        }
    };
    return (
        <View style={{ height: '100%', justifyContent: 'space-between' }}>
            <View style={{ marginBottom: 80 }}>
                <HeaderSub navigation={navigation} />
            </View>
            <View style={{ marginBottom: 70, paddingHorizontal: 20 }}>
                <View>
                    <Text style={styles.textHeader} >
                        Sign Up
                    </Text>
                </View>
                <View >
                    <InputCommon
                        onChangeText={(value) => {
                            setExist(false);
                            if (value.length >= 6) {
                                setCheckLength(false);
                                setAccount({
                                    ...account,
                                    username: value,
                                });
                            } else {
                                setCheckLength(true);
                            }
                        }}
                        placeholder="Enter Username"
                    />
                    <InputCommon
                        onChangeText={(value) => {
                            setExist(false);
                            setCheckPass(false);
                            if (value.length >= 6) {
                                setCheckLength(false);
                                setAccount({
                                    ...account,
                                    password: value,
                                });
                            } else {
                                setCheckLength(true);
                            }
                        }}
                        placeholder="Enter Password"
                        secureTextEntry
                    />
                    <InputCommon
                        onChangeText={(value) => {
                            if (value != account.password) {
                                setCheckPass(true);
                            } else {
                                setCheckPass(false);
                                setAccount({
                                    ...account,
                                    rePassword: value,
                                });
                            }
                        }}
                        placeholder="Re-enter Passeord"
                        secureTextEntry
                    />
                </View>

                {checkLength && <Text
                    style={styles.textError}
                >
                    Username password no shorter than 6 characters!
                </Text>}

                {checkPass && <Text
                    style={styles.textError}
                >
                    Password and re-password is not match
                </Text>}

                {isExist && <Text
                    style={styles.textError}
                >
                    Account is exist!
                </Text>}

                <View style={{ marginTop: 30, }} >
                    <ButtonCommon
                        text="Sign Up"
                        active={{
                            color: '#FFF',
                            backgroundColor: '#D35400',
                        }}
                        onPress={(event) => {
                            !checkLength && !checkPass && onSetAccount(account);
                        }}
                    />
                </View>
            </View>
            <View>
                <Footer />
            </View>
        </View>
    );
}




