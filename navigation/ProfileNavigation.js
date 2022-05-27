/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddCreditCard from '../screens/profiles/AddCreditCard';
import Cards from '../screens/profiles/Cards';
import ChangePassword from '../screens/profiles/ChangePassword';
import EditProfile from '../screens/profiles/EditProfile';
import MyProfile from '../screens/profiles/MyProfile';
import Paypal from '../screens/profiles/Paypal';
import PaySetting from '../screens/profiles/PaySetting';
import Profile from '../screens/profiles/Profile';

//NOTES: File này là settings của navigation

const Tab = createBottomTabNavigator(); //NOTES: Khai báo tabbar
const Stack = createNativeStackNavigator(); //NOTES: Khai báo stack

export default function ProfileNavigation() {
    //NOTES: cái này là Navigation của app
    //gồm có tabbar và các màn hình ngoiaf tabbar
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#eee' } }} >
            <Stack.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={Profile} />
            <Stack.Screen
                name='MyProfile'
                options={{ headerShown: false }}
                component={MyProfile}
            />
            <Stack.Screen
                name='EditProfile'
                options={{ headerShown: false }}
                component={EditProfile}
            />
            <Stack.Screen
                name="ChangePassword"
                options={{ headerShown: false }}
                component={ChangePassword} />
            <Stack.Screen
                name="PaySetting"
                options={{ headerShown: false }}
                component={PaySetting} />
            <Stack.Screen
                name='AddCreditCard'
                options={{ headerShown: false }}
                component={AddCreditCard}
            />
            <Stack.Screen
                name='Paypal'
                options={{ headerShown: false }}
                component={Paypal}
            />
            <Stack.Screen
                name='Cards'
                options={{ headerShown: false }}
                component={Cards}
            />

        </Stack.Navigator>
    )
}
