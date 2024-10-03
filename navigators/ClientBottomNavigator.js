import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import Jobs from '../screens/client/Jobs';
import theme from '../theme';
import Profile from '../screens/client/ClientProfile';
import Messages from '../screens/common/Messages';
import Contracts from '../screens/client/Contracts';
import Menu from '../screens/common/Menu';
const Tab = createBottomTabNavigator();

import screenOptionsWithHeader from './screenOptionsWithHeader';

export default function ClientBottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Jobs'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryDark,
        },
        tabBarActiveTintColor: theme.colors.primaryBright,
        tabBarInactiveTintColor: theme.colors.ternaryLight,
      }}
    >
      <Tab.Screen
        name='Jobs'
        component={Jobs}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <SearchIcon name='search' color={color} size={size} />
          ),
          ...screenOptionsWithHeader('Jobs'),
        }}
      />
      <Tab.Screen
        name='Contract'
        component={Contracts}
        options={{
          tabBarLabel: 'Contracts',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='assignment' color={color} size={size} />
          ),
          ...screenOptionsWithHeader('Contracts'),
        }}
      />
      <Tab.Screen
        name='Messages'
        component={Messages}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='chat' color={color} size={size} />
          ),
          ...screenOptionsWithHeader('Messages'),
        }}
      />

      <Tab.Screen
        name='Menu'
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Entypo name='menu' color={color} size={size} />
          ),
          ...screenOptionsWithHeader('Menu'),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='account-circle' color={color} size={size} />
          ),
          tabBarButton: () => null, // Hide the Profile tab
          ...screenOptionsWithHeader('Profile'),
        }}
      />
    </Tab.Navigator>
  );
}
