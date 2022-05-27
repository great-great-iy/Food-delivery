/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert, StyleSheet, Text, View
} from 'react-native';
import { ButtonCommon, Footer, HeaderSub, InputCommon } from '../components';
import { useStore } from '../store/hooks';
import { windowHeight } from './Home';
import * as actions from '../store/actions';



export default function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [onClick, setOnClick] = useState(true);
    const heightC = React.useRef(windowHeight);
    const [isErrorWrongUsernameOrPass, setIsErrorWrongUsernameOrPass] = useState(false);

    const [state, dispatch] = useStore();

    useEffect(() => {
        setIsErrorWrongUsernameOrPass(false);
    }, [username, password]);

    const windowH = windowHeight;
    return (
        <View style={{ flex: 1, height: windowH, justifyContent: 'space-between' }}>
            <View style={{marginBottom: 115}}>
                <HeaderSub navigation={navigation} />
            </View>
            <View style={{marginBottom: 78, paddingHorizontal: 20}}>
                <View>
                    <Text style={styles.textHeader}>
                        Sign In
                    </Text>
                </View>
                <View >
                    <InputCommon
                        onChangeText={setUsername}
                        placeholder="uername"
                    />
                    <InputCommon
                        onChangeText={setPassword}
                        placeholder="password"
                        secureTextEntry
                    />
                </View>
                {
                    isErrorWrongUsernameOrPass && <Text style={styles.textError} >
                        Username or password is not correct
                    </Text>
                }
                <View style={{ marginTop: 30, }} >
                    <ButtonCommon
                        text="Sign In"
                        active={{
                            color: '#FFF',
                            backgroundColor: '#D35400',
                        }}
                        onPress={() => {
                            onClick && AsyncStorage.getItem('account').then(acounts => {

                                const listAccount = JSON.parse(acounts);
                                console.log('listAccount', listAccount);
                                if (listAccount.some(item => item.username == username && item.password == password)) {
                                    AsyncStorage.setItem('userToken', JSON.stringify({
                                        username, password
                                    }));
                                    setIsErrorWrongUsernameOrPass(false);
                                    dispatch(actions.signIn(true))
                                } else {
                                    setIsErrorWrongUsernameOrPass(true);
                                }
                            });
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                    <Text
                        onPress={() => {
                            Alert.alert('Forgot Password');
                        }}
                        style={styles.textStyle}>
                        Forgot Password?
                    </Text>
                </View>
            </View>
            <View style={{}}>
                <Footer />
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    textHeader: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 36,
        marginBottom: 20,

        color: '#000',
    },
    textStyle: {
        textAlign: 'right',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        color: '#34495E',
    },
    textError: {
        color: 'red',
        marginTop: 10,
    },
});
9