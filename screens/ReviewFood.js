/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import BackIcon from '../assets/icons/back.svg';
import LikeIcon from '../assets/icons/like.svg';
import Drink from '../assets/icons/coffee-cup.svg';
import Locat from '../assets/icons/location.svg';
import Cake from '../assets/icons/piece-of-cake.svg';
import Snack from '../assets/icons/potato-chips.svg';
import Search from '../assets/icons/search.svg';
import Star from '../assets/icons/star.svg';
import { ButtonCommon } from '../components';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 60;


function ItemRestaurant({ dataItem }) {

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                width: itemWidth,
                marginBottom: 10
            }}>
            <Image style={{ width: itemWidth / 3, height: itemWidth / 3 }}
                source={dataItem.img}
            />
            <View style={{ marginLeft: 20, flexDirection: 'column', width: '66.7%' }}>
                <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: '700', color: '#000' }}>{dataItem.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <LikeIcon />
                        <Text style={styles.textStyle}>  {dataItem.like}+</Text>
                        <Text> | </Text>
                        <View style={{ transform: [{ rotateX: '180deg' }] }}>
                            <LikeIcon />
                        </View>
                        <Text style={styles.textStyle}>  {dataItem.dislike}+</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={styles.likeStyle}>
                            <LikeIcon />
                        </View>
                        <View style={[styles.likeStyle,]}>
                            <View style={{ transform: [{ rotateX: '180deg' }] }}>
                                <LikeIcon />
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={[{color: '#2ECC71', fontFamily: 'Poppins', fontSize: 14, fontWeight: '500', lineHeight: 21, marginVertical: 10}]}>${dataItem.cost}</Text>
            </View>
        </TouchableOpacity>
    );
}

const Header = ({ text }) => {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <TouchableOpacity>
                <BackIcon />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: -20 }}>
                <Text style={styles.textHeader}>
                    {text}
                </Text>
            </View>
        </View>
    );
}

export default function ReviewFood() {

    const renderItemNearMe = ({ item, index }) => {
        return (<ItemRestaurant dataItem={item} />);
    };
    const [listNearMe, setListNearMe] = React.useState([
        {
            id: 1,
            name: 'Dapur Ijah Restaurant',
            like: 999,
            dislike: 99,
            img: require('../assets/images/Rectangle.png'),
            cost: 99.99,
            address: '123, Đường số 1, Quận 1, TP. Hồ Chí Minh',
            distance: '3 min - 1.1 km',
            star: 5,
        },
        {
            id: 2,
            name: 'Biển Restaurant',
            like: 999,
            dislike: 99,
            img: require('../assets/images/Rectangle.png'),
            cost: 99.99,
            address: '123, Đường số 1, Quận 1, TP. Hồ Chí Minh',
            distance: '3 min - 1.1 km',
            star: 5,
        },
        {
            id: 3,
            name: 'Biển Restaurant',
            like: 999,
            dislike: 99,
            img: require('../assets/images/Rectangle.png'),
            cost: 99.99,
            address: '123, Đường số 1, Quận 1, TP. Hồ Chí Minh',
            distance: '3 min - 1.1 km',
            star: 5,
        },
        {
            id: 4,
            name: 'Biển Restaurant',
            like: 999,
            dislike: 99,
            img: require('../assets/images/Rectangle.png'),
            cost: 99.99,
            address: '123, Đường số 1, Quận 1, TP. Hồ Chí Minh',
            distance: '3 min - 1.1 km',
            star: 5,
        },
    ]);
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
            <View style={{}}>
                <Header text={'Review Food'} />
            </View>
            <FlatList
                style={{}}
                data={listNearMe}
                renderItem={renderItemNearMe}
            />
            <View style={{ padding: 0, backgroundColor: 'transparent' }}>
                <ButtonCommon
                    text={'Send'}
                    active
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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