/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FoodMenu from '../screens/FoodMenu';
import Home from '../screens/Home';
import AddCreditCard from '../screens/profiles/AddCreditCard';
import ChangePassword from '../screens/profiles/ChangePassword';
import MyProfile from '../screens/profiles/MyProfile';
import PaySetting from '../screens/profiles/PaySetting';
import Profile from '../screens/profiles/Profile';

const Stack = createNativeStackNavigator(); 

export default function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#eee' } }} >
            <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={Home} />
            <Stack.Screen
                name='FoodMenu'
                options={{ headerShown: false }}
                component={FoodMenu}
            />
        </Stack.Navigator>
    )
}
