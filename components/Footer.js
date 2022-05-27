/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function Footer() {
    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 14,
            }}>
                <View style={{
                    flex: 7,
                    borderStyle: 'solid',
                    borderBottomWidth: 2,
                    borderBottomColor: '#34495E4D',
                }}
                />
                <View
                    style={{
                        flex: 3,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text style={styles.textStyle}>
                        Or connect with
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Image
                        source={require('../assets/images/PngItem_39514.png')}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 5,
                }}
                >
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 20,
                        }}
                    >
                        <Image
                            source={require('../assets/images/facebook.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 30,
                        }}
                    >
                        <Image
                            source={require('../assets/images/google-plus.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        fontFamily: 'Poppins',
        fontStyle: 'nomarl',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 36,
        marginBottom: 30,

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
});
