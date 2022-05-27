/* eslint-disable prettier/prettier */
import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { ButtonCommon, Footer } from '../components';

export default function MainScreen({navigation}) {
    return (
        <View style={{ height: '100%', justifyContent: 'space-between' }}>
            <View style={{paddingHorizontal: 20}}>
                <View style={styles.logoStyle} >
                    <Image
                        source={require('../assets/images/hamburger.png')}
                        style={styles.imgStyle}
                    />
                </View>
                <View>
                    <ButtonCommon
                        text="Sign In"
                        active
                        onPress={() => navigation.navigate('SignIn')}
                    />
                </View>
                <View>
                    <ButtonCommon
                        text="Sign Up"
                        onPress={() => navigation.navigate('SignUp')}
                    />
                </View>
            </View>
            <Footer/>
        </View>
    );
}

const styles = StyleSheet.create({
    logoStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    imgStyle: {
        width: 300,
        height: 300,
    },
});
