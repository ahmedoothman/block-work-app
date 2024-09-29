import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlertIcon from 'react-native-vector-icons/Fontisto';
import SearchIcon from 'react-native-vector-icons/Feather';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Image } from 'react-native';

import Jobs from '../screens/freelancer/Jobs';
import Proposals from '../screens/freelancer/Proposals';
import theme from '../theme';
import Alert from '../screens/common/Alert';
import Messages from '../screens/common/Messages';
import Contracts from '../screens/freelancer/Contracts';
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
        name='Alert'
        component={Alert}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <AlertIcon name='bell' color={color} size={size} />
          ),
          ...screenOptionsWithHeader('Alerts'),
        }}
      />
    </Tab.Navigator>
  );
}
