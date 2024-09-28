import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPasswordScreen from '../screens/auth/ResetPasword';
import FreelancerBase from '../screens/freelancer/FreelancerBase';
import Contracts from '../screens/freelancer/Contracts';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    // ' change the 'initialRouteName' to runder the screen you want
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          title: false,
          headerShown: false
        }}
      />

      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={{
          title: false,
          headerShown: false
        }}
      />

      <Stack.Screen
        name='ResetPassword'
        component={ResetPasswordScreen}
        options={{
          title: false,
          headerShown: false
        }}
      />



      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          title: false,
          headerShown: false
        }}
      />

      <Stack.Screen
        name='FreelancerBase'
        component={FreelancerBase}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='Contracts'
        component={Contracts}
        options={{ title: 'Contracts' }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigator;
