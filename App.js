/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import Provider from './store/Provider';
export default function App() {

    // AsyncStorage.getItem('account').then((data) =>
    //     console.log(JSON.parse(data))
    // )

    const [location, setLocation] = React.useState({
        lat: '',
        lon: ''
    });

    React.useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    ...location,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            })
        } else {
            console.warn("Not Available");
        }
    }, []);

    console.log(location);
    
    return (
        <SafeAreaView style={styles.container}>
            {/* <Provider>
                <MainNavigation/>
            </Provider> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { height: '100%', justifyContent: 'space-between', backgroundColor: '#FFF' },
    containerInner: {
        marginHorizontal: 30,
    },
});
