/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Food from '../assets/icons/burger.svg';
import Clock from '../assets/icons/clock.svg';
import Drink from '../assets/icons/coffee-cup.svg';
import Locat from '../assets/icons/location.svg';
import Cake from '../assets/icons/piece-of-cake.svg';
import Snack from '../assets/icons/potato-chips.svg';
import Search from '../assets/icons/search.svg';
import Star from '../assets/icons/star.svg';
import { InputCommon } from '../components';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
const itemWidth = windowWidth - 60;

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}



function MenuItem({ dataItem }) {

    return (
        <View
            style={{
                padding: 10,
            }}
        >
            <View
                style={{
                    width: 70,
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ECF0F1',
                    borderRadius: 20,
                }}
            >
                {dataItem.icon}
            </View>
            <Text
                style={{
                    textAlign: 'center',
                }}
            >
                {dataItem.name}
            </Text>
        </View>
    );
}

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

function ItemRestaurant({ dataItem }) {

    return (
        <View
            style={{
                flexDirection: 'row',
                width: itemWidth,
                marginBottom: 10
            }}>
            <Image style={{ width: itemWidth / 3, height: itemWidth / 3 }}
                source={dataItem.img}
            />
            <View style={{ marginLeft: 20, flexDirection: 'column' }}>
                <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: '700' }}>{dataItem.name}</Text>
                <Text style={{ color: '#34495E', marginBottom: 10, fontSize: 12, maxWidth: '80%' }}><Locat /> {dataItem.address}</Text>
                <Text style={{ color: '#34495E', marginBottom: 10, fontSize: 12 }}><Clock /> {dataItem.distance}</Text>
                <View style={{ flexDirection: 'row' }}>{Array.from(Array(dataItem.star)).map((item, index) => <Star
                    key={index}
                />)}</View>
            </View>
        </View>
    );
}


export default function Home({ navigation }) {
    const [textSearch, setTextSearch] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [listMenu, setListMenu] = useState([
        {
            id: 1,
            name: 'Drink',
            icon: <Drink />,
        },
        {
            id: 2,
            name: 'Food',
            icon: <Food />,

        },
        {
            id: 3,
            name: 'Cake',
            icon: <Cake />,


        },
        {
            id: 4,
            name: 'Snack',
            icon: <Snack />,
        }
    ]);

    const [listProduct, setListProduct] = useState([
        [{
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

        }],
        [{
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
        }],
        [{
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
        }]
    ]);

    const [listNearMe, setListNearMe] = useState([
        {
            id: 1,
            name: 'Dapur Ijah Restaurant',
            img: require('../assets/images/Rectangle.png'),
            address: '123, Đường số 1, Quận 1, TP. Hồ Chí Minh',
            distance: '3 min - 1.1 km',
            star: 5,
        },
        {
            id: 2,
            name: 'Biển Restaurant',
            img: require('../assets/images/Rectangle.png'),
            address: '123, Đường số 2, Quận 3, TP. Hồ Chí Minh',
            distance: '15 min -3 km',
            star: 4,
        },
    ]);
    
    const [listSearch, setListSearch] = React.useState(listNearMe);


    // xử lý tìm kiếm theo tên nhà hàng
    const handleSearch = (value) => {
        let data = removeVietnameseTones(value);
        let newList = [...listNearMe];
        if (value !== '') {
            setOpen(true);
            let listSearch = newList.filter((item, index) => {
                return removeVietnameseTones(item.name.toLowerCase()).includes(data)
            });

            newList = [...listSearch];
        } else {
            setOpen(false);
            newList = [...listNearMe]
        }
        console.log('newList', newList);
        setListSearch(newList);

    }

    const renderMenuItem = ({ item, index }) => {
        return (<MenuItem dataItem={item} />);
    };

    const renderProductItem = ({ item, index }) => {
        return (<ProductSpecies dataItem={item} />);
    };

    const renderItemNearMe = ({ item, index }) => {
        return (<ItemRestaurant dataItem={item} />);
    };

    return (
        <FlatList
            data={[1]}
            renderItem={() =>
                <View style={{ position: 'relative' , backgroundColor: 'white', paddingHorizontal: 20}} >

                    {/* Search */}
                    <View style={[styles.container, { position: 'relative' }]} >
                        <InputCommon
                            onChangeText={(value) => {
                                handleSearch(value);
                            }}
                            placeholder="Search"
                            customer='paddingLeft: 50'
                        />
                        <View style={{ position: 'absolute', padding: 20, }} >
                            <Search color={'rgba(0, 0, 0, 0.4)'} />
                        </View>
                    </View>

                    {
                        !open && <View>
                            {/* My Currently Location  */}
                            <View
                                style={[styles.container, { position: 'relative', flexDirection: 'row', marginVertical: 5 }]}
                            >
                                <View style={{ paddingRight: 12 }} >
                                    <Locat color={"#000"} />
                                </View>
                                <Text style={{ color: '#000' }} >
                                    9 West 46 Th Street, New York City
                                </Text>
                            </View>

                            <View style={styles.containerFluid} >
                                <FlatList
                                    horizontal
                                    data={listMenu}
                                    renderItem={renderMenuItem}
                                />
                            </View>

                            <View>
                                <View style={[styles.container, styles.spaceBetweenStyle]} >
                                    <Text style={styles.textHeader} >
                                        Food Menu
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('FoodMenu')} >
                                        <Text style={styles.textViewAall} >
                                            view all
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerFluid}>

                                    <FlatList
                                        horizontal
                                        data={listProduct}
                                        renderItem={({ item, index }) => {
                                            const purple = 'rgba(155, 89, 182, 0.3)'
                                            const lightBlue = 'rgba(52, 152, 219, 0.3)'
                                            return <View style={{
                                                flexDirection: 'column',
                                                marginLeft: index != 0 ? 20 : 0
                                            }}>
                                                <TouchableOpacity style={{
                                                    width: itemWidth / 3,
                                                    borderRadius: 20,
                                                    paddingTop: 10,
                                                    paddingLeft: 15,
                                                    backgroundColor: index % 2 == 0 ? lightBlue : purple,
                                                    height: itemWidth / 3,
                                                    marginBottom: 20,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                                    onPress={() => {
                                                        changeScreen('FoodDetailScreen');
                                                        setFood(item[0].title)
                                                    }}
                                                >
                                                    <Image source={item[0].img} />
                                                    <Text style={{ fontWeight: '700', fontSize: 14, color: '#FFF', position: 'absolute', top: 0, left: 0, padding: 10, paddingLeft: 15 }}>{item[0].name}</Text>

                                                </TouchableOpacity>

                                                <TouchableOpacity style={{
                                                    width: itemWidth / 3,
                                                    paddingTop: 10,
                                                    paddingLeft: 15,
                                                    borderRadius: 20,
                                                    backgroundColor: index % 2 == 0 ? purple : lightBlue,
                                                    height: itemWidth / 3,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                                    onPress={() => {
                                                        changeScreen('FoodDetailScreen');
                                                        setFood(item[1].title)
                                                    }}
                                                >
                                                    <Image source={item[1].img} />
                                                    <Text style={{ fontWeight: '700', fontSize: 14, color: '#FFF', position: 'absolute', top: 0, left: 0, padding: 10, paddingLeft: 15 }}>{item[1].name}</Text>
                                                </TouchableOpacity>

                                            </View>
                                        }}
                                    />

                                </View>
                            </View>

                        </View>
                    }
                    <View style={styles.container} >
                        <View style={[styles.spaceBetweenStyle]} >
                            <Text style={styles.textHeader} >
                                Near Me
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.textViewAall} >
                                    view all
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <FlatList
                                data={listSearch}
                                renderItem={renderItemNearMe}
                            />
                        </View>
                    </View>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 20,
    },
    containerFluid: {
        // paddingLeft: 20,
    },
    spaceBetweenStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    logoStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    iconStyle: {
        width: 300,
        height: 300,
    },
    text: {
        color: 'red',
        fontSize: 102,
        fontWeight: '600',
        textAlign: 'center',
    },
    searchStype: {
        paddingLeft: 100,
    },
    textHeader: {
        color: '#000',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27,
    },
    textViewAall: {
        color: '#000',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14,
    },
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
