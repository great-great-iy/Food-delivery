/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ListIcon from '../assets/icons/Rectangle.svg';
import OrderIcon from '../assets/icons/shopping-list.svg';
import HomeIcon from '../assets/icons/store.svg';
import ProfileIcon from '../assets/icons/user.svg';
import MainScreen from '../screens/MainScreen';
import MyList from '../screens/MyList';
import ReviewFood from '../screens/ReviewFood';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useStore } from '../store/hooks';
import HomeNavigation from './HomeNavigation';
import ProfileNavigation from './ProfileNavigation';
import * as actions from '../store/actions';

//NOTES: File này là settings của navigation

const Tab = createBottomTabNavigator(); //NOTES: Khai báo tabbar
const Stack = createNativeStackNavigator(); //NOTES: Khai báo stack

const Tabbar = () => {
    return <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => { //NOTES: HIển thị icon ở tabbar
                let iconName;

                switch (route.name) {
                    case 'MainScreen': {
                        iconName = <HomeIcon color={focused ? '#D35400' : '#777'} />;
                        break;
                    }
                    case 'Order': {
                        iconName = <OrderIcon color={focused ? '#D35400' : '#777'} />;
                        break;
                    }
                    case 'My List': {
                        iconName = <ListIcon color={focused ? '#D35400' : '#777'} />;
                        break;
                    }
                    case 'ProfileNavigation': {
                        iconName = <ProfileIcon color={focused ? '#D35400' : '#777'} />;
                        break;
                    }
                }

                return iconName;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        })}
    >
        {/* tabBarStyle: { display: "none" } */}
        <Tab.Screen name="MainScreen" options={{ title: 'Home' }} component={HomeNavigation} />
        <Tab.Screen name="Order" component={ReviewFood} />
        <Tab.Screen name="My List" component={MyList} />
        <Tab.Screen name="ProfileNavigation" options={{ title: 'Profile' }} component={ProfileNavigation} />
    </Tab.Navigator>
}

// export const UserContext = React.createContext();

export default function MainNavigation() {
    const [state, dispatch] = useStore();
    const [user, setUser] = React.useState(state.userToken);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                await AsyncStorage.getItem('userToken').then((data) => {
                    userToken = JSON.parse(data);
                    setUser(userToken)
                    dispatch(actions.setToken(userToken));
                }
                );
            } catch (e) {
                
            }
        };

        bootstrapAsync();
    }, [dispatch, state.isSignIn, state.isChangePass]);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let data;

            try {
                await AsyncStorage.getItem('account').then(accounts => {
                    data = JSON.parse(accounts);
                    if (Array.isArray(data) && data.length > 0) {
                        let acc = data.find((item) => item.username == user?.username)
                        dispatch(actions.setUserData(acc));
                        dispatch(actions.setListUser(data));
                    }
                })
            } catch (e) {

            }
        };

        bootstrapAsync();
    }, [dispatch, state.isSignIn, state.userToken, state.isAddCard, state.isEditProfile, state.isDeleteCard]);

    console.log('home', user,  state);

    //NOTES: cái này là Navigation của app
    //gồm có tabbar và các màn hình ngoiaf tabbar
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#eee' } }} >
                {state.isSignIn ? (
                    <Stack.Screen
                        name="MainTabbar"
                        options={{ headerShown: false }}
                        component={Tabbar} />
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}
                            component={MainScreen}
                        />
                        <Stack.Screen
                            name="SignIn"
                            options={{ headerShown: false }}
                            component={SignInScreen}
                        />
                        <Stack.Screen
                            name="SignUp"
                            options={{ headerShown: false }}
                            component={SignUpScreen}
                        />
                    </>
                )}

            </Stack.Navigator>
        </NavigationContainer>
    )
}
