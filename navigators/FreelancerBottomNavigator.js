import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchIcon from 'react-native-vector-icons/Feather';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Jobs from '../screens/freelancer/Jobs';
import Proposals from '../screens/freelancer/Proposals';
import useTheme from "../hooks/useTheme";
import Messages from '../screens/common/Messages';
import Contracts from '../screens/freelancer/Contracts';
import Profile from '../screens/freelancer/Profile';
import Menu from '../screens/common/Menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import screenOptionsWithHeader from './screenOptionsWithHeader';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export default function FreelancerBottomNavigator() {
    const theme = useTheme();
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

      {/* implement profile but hide it */}
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          title: 'Profile',
          headerStyle: { backgroundColor: theme.colors.secondaryDark },
          headerTintColor: theme.colors.white,
          tabBarButton: () => null,
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color={theme.colors.white}
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
