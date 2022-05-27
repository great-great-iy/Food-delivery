/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { HeaderSub } from '../components';


function ProductSpecies({ dataItem, colorBgd }) {
    let bgdColor = '';
    if (dataItem.id % 2 === 0) {
        bgdColor = '#e1ceea';
    } else {
        bgdColor = '#c3e1f5';
    }
    return (
        <View
            style={{
                padding: 5,
                position: 'relative',
            }}
        >
            <Text
                style={[{
                    textAlign: 'center',
                    position: 'absolute',
                    zIndex: 2,
                }, styles.textNameProduct]}
            >
                {dataItem.name}
            </Text>
            <View
                style={[{
                    width: 130,
                    height: 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `${bgdColor}`,
                    borderRadius: 20,
                }, colorBgd]}
            >
                <Image
                    source={dataItem.img}
                />
            </View>
        </View>
    );
}

export default function FoodMenu({navigation}) {
    const [listProduct, setListProduct] = useState([
        {
            id: 1,
            name: 'Burgers',
            img: require('../assets/images/burgers.png'),
            Description: 'Những chiếc bánh burger với nhân thịt bò, thịt cừu, cá hồi hay gà tây cùng nước sốt hấp dẫn rất tốt cho sức khỏe.',
        },
        {
            id: 2,
            name: 'Pizza',
            img: require('../assets/images/pizza.png'),
            Description: 'Pizza, Tiếng La tinh thường đọc là Pi-da, là loại bánh dẹt, tròn được chế biến từ bột mì, nấm men... sau khi đã được ủ bột để nghỉ ít nhất 24 tiếng đồng hồ và nhào nặn thành loại bánh có hình dạng tròn và dẹt, và được cho vào lò nướng chín trước khi ăn.',

        },
        {
            id: 3,
            name: 'BBQ',
            img: require('../assets/images/fruit.png'),
            Description: 'King BBQ Buffet là mô hình buffet theo hình thức gọi món, mang đến cho thực khách những trải nghiệm ẩm thực nướng đúng chuẩn Hàn Quốc. Bên cạnh các món thịt bò nhập khẩu hảo hạng và hải sản tươi ngon, được tẩm ướp theo công thức bí truyền và sử dụng hệ thống bếp nướng không khói hiện đại ngay tại bàn.',
        },
        {
            id: 4,
            name: 'Fruit',
            img: require('../assets/images/pizza.png'),
            Description: 'Fruit is essential to everyday life in Vietnam. From street corners to bicycle vendors, signs for ‘hoa quả’ atop perfectly stacked pyramids of colourful fruits are everywhere. Snack happy, be adventurous and dive into the wonderful world of Vietnam’s fruits with this guide.',
        },
        {
            id: 5,
            name: 'Sushi',
            img: require('../assets/images/fruit.png'),
            Description: 'Sushi là một món ăn Nhật Bản gồm cơm trộn giấm kết hợp với các nguyên liệu khác. Neta và hình thức trình bày sushi rất đa dạng, nhưng nguyên liệu chính mà tất cả các loại sushi đều có là shari. Neta phổ biến nhất là hải sản. Thịt sống cắt lát gọi riêng là sashimi.',
        },
        {
            id: 6,
            name: 'Noodle',
            img: require('../assets/images/burgers.png'),
            Description: 'Mì sợi là một thực phẩm thường dùng trong nhiều nền văn hóa làm từ bột không men. Tất cả được kéo căng, ép đùn, rồi cán phẳng và cắt thành một loạt các hình dạng. Trong đó dạng dài, mỏng có thể là phổ biến nhất, nhiều loại mì được cắt thành sóng, xoắn, ống, dây, vỏ, gấp lại, hay được cắt thành hình dạng khác.',
        }
    ]);

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    backgroundColor: 'white'
                }}
            >
                <TouchableOpacity>
                    <ProductSpecies dataItem={item} />
                </TouchableOpacity>
                <Text>{item.Description}</Text>
            </View>
        )
    };

    return (
        <View>
            <HeaderSub
                navigation = {navigation}
                text={'Food Menu'}
            />
            <View>
                <FlatList
                    data={listProduct}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textNameProduct: {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 21,
        padding: 15,
        paddingLeft: 20,
    },
});