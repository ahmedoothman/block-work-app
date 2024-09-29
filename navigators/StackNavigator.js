import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPasswordScreen from '../screens/auth/ResetPasword';
import FreelancerBase from '../screens/freelancer/FreelancerBase';
import ClientBase from '../screens/client/ClientBase';
import JobsDetails from '../screens/freelancer/JobsDetails';
import ProposalsForm from '../screens/freelancer/ProposalsForm';
import Alert from '../screens/common/Alert';
import ChatScreen from '../screens/common/ChatScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          title: false,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={{
          title: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ResetPassword'
        component={ResetPasswordScreen}
        options={{
          title: false,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          title: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='FreelancerBase'
        component={FreelancerBase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ClientBase'
        component={ClientBase}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          title: 'Chats',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name='JobsDetails'
        component={JobsDetails}
        options={{
          title: 'Job Details',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name='ProposalsForm'
        component={ProposalsForm}
        options={{
          title: 'Submit Proposal',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name='Alert'
        component={Alert}
        options={{
          title: 'Alert',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
