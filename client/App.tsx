import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import SignupScreen from './screens/SignupScreen';
import ShopScreen from './screens/ShopScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PreviousOrders from './screens/AccountScreen/PreviousOrders';
import UserAdresses from './screens/UserAddress';

type ParamProps = {
    name?: string;
    shopId?: string,
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* <Stack.Screen 
          options={{ headerShown: false }}
          name="Login" 
          component={LoginScreen} 
        />

        <Stack.Screen 
          options={{ headerShown: false }}
          name="Register"
          component={SignupScreen}
        /> */}
        
        <Stack.Screen 
          options={{ headerShown: false }}
          name="Landing" 
          component={LandingScreen} 
        />

        <Stack.Screen
          options={({ route }) => {
            let val: ParamProps = (route.params) || { name: 'Shop' }
            
            return {
              title: val.name
            }
          }}
          name="Shop"
          component={ShopScreen}
        />

        <Stack.Screen 
          options={{ headerShown: true }}
          name="Checkout" 
          component={CheckoutScreen} 
        />

        <Stack.Screen 
          options={{ headerShown: true }}
          name="UserPreviousOrders"
          component={PreviousOrders}
        />

        <Stack.Screen 
          options={{ headerShown: true }}
          name="UserAddresses"
          component={UserAdresses}
        /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}
