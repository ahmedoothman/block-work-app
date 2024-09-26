import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import ResetPasswordScreen from '../screens/auth/ResetPasword';
import FreelancerBase from '../screens/freelancer/FreelancerBase';
import Contracts from '../screens/freelancer/Contracts';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Contracts'
        component={Contracts}
        options={{ title: 'Contracts' }}
      />
      <Stack.Screen
        name='FreelancerBase'
        component={FreelancerBase}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name='SignIn'
        component={SignIn}
        options={{ title: 'Sign In' }}
      />

      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />
      <Stack.Screen
        name='ResetPassword'
        component={ResetPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
