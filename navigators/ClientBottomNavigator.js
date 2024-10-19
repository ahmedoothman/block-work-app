import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import Jobs from '../screens/client/Jobs';
import theme from '../theme';
import Profile from '../screens/client/ClientProfile';
import Messages from '../screens/common/Messages';
import Contracts from '../screens/client/Contracts';
import Menu from '../screens/common/Menu';
import Icon from 'react-native-vector-icons/Ionicons';
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
          ...screenOptionsWithHeader('Messages', false),
        }}
      />

      <Tab.Screen
        name='Settings'
        component={Menu}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name='settings' color={color} size={size} />
          ),
          ...screenOptionsWithHeader('Menu'),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          title: 'Profile',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          tabBarButton: () => null,
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
    </Tab.Navigator>
  );
}
