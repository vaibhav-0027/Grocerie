import { CommonActions, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { auth } from '../../utils/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../HomeScreen';
import BasketScreen from '../BasketScreen';
import AccountScreen from '../AccountScreen';
import { SCREEN_ACTIVE_COLOR, SCREEN_INACTIVE_COLOR } from '../../utils/constants';

const LandingScreen = () => {

    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            backBehavior='history'
            screenOptions={{
                tabBarLabelPosition: 'below-icon',
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {
                    marginBottom: 4
                },
                unmountOnBlur: true,
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <Entypo 
                                    name="home" 
                                    size={24}
                                    color={focused ? SCREEN_ACTIVE_COLOR : SCREEN_INACTIVE_COLOR}
                                />
                    },
                    tabBarLabel: ({focused}) => {
                        return focused && <Text style={styles.tabBarLabel} >
                                            Home
                                          </Text>
                    }
                }}
            />

            <Tab.Screen 
                name="Basket" 
                component={BasketScreen} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return <FontAwesome 
                                    name="shopping-basket" 
                                    size={22}
                                    color={focused ? SCREEN_ACTIVE_COLOR : SCREEN_INACTIVE_COLOR}
                                />
                    },
                    tabBarLabel: ({focused}) => {
                        return focused && <Text style={styles.tabBarLabel} >
                                            Basket
                                          </Text>
                    },
                }}
            />

            <Tab.Screen 
                name="Account" 
                component={AccountScreen} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return <MaterialCommunityIcons 
                                    name="account" 
                                    size={26}
                                    color={focused ? SCREEN_ACTIVE_COLOR : SCREEN_INACTIVE_COLOR}
                                />
                    },
                    tabBarLabel: ({focused}) => {
                        return focused && <Text style={styles.tabBarLabel} >
                                            Account
                                          </Text>
                    }
                }}
            />
        </Tab.Navigator>
    )

}

export default LandingScreen

const styles = StyleSheet.create({
    tabBarLabel: {
        color: SCREEN_ACTIVE_COLOR,
        fontSize: 10,
        marginBottom: 6,
    },
})
