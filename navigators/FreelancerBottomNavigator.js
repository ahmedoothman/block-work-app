import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/Feather';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Jobs from '../screens/freelancer/Jobs';
import Proposals from '../screens/freelancer/Proposals';
import theme from '../theme';
import Messages from '../screens/common/Messages';
import Contracts from '../screens/freelancer/Contracts';
import Profile from '../screens/common/Profile';
import Menu from '../screens/common/Menu';

import screenOptionsWithHeader from './screenOptionsWithHeader';

const Tab = createBottomTabNavigator();

export default function FreelancerBottomNavigator() {
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
        name='Proposals'
        component={Proposals}
        options={{
          tabBarLabel: 'Proposals',
          tabBarIcon: ({ color, size }) => (
            <EditIcon
              name='file-document-edit-outline'
              color={color}
              size={size}
            />
          ),
          ...screenOptionsWithHeader('Proposals'),
        }}
      />

      <Tab.Screen
        name='Contracts'
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

      {/* implement profile but hide it */}
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
