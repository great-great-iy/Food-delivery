import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import BackIcon from '../assets/icons/back.svg';

const HeaderSub = ({ text, navigation }) => {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <TouchableOpacity
                style={{ paddingRight: 10, paddingBottom: 10 }}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <BackIcon />
            </TouchableOpacity>
            {text && <View style={{ flex: 1, marginLeft: -20 }}>
                <Text style={styles.textHeader}>
                    {text}
                </Text>
            </View>}
        </View>
    );
}


export default HeaderSub;

const styles = StyleSheet.create({
    
    textHeader: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',

        color: '#000',
    },
})