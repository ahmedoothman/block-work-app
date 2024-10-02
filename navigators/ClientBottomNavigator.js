import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlertIcon from 'react-native-vector-icons/Fontisto';
import SearchIcon from 'react-native-vector-icons/Feather';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Image } from 'react-native';

import Jobs from '../screens/client/Jobs';
import theme from '../theme';
import Alert from '../screens/common/Alert';
import Messages from '../screens/common/Messages';
import Contracts from '../screens/client/Contracts';

const Tab = createBottomTabNavigator();

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
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/1.jpg',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'white',
                }}
              />
            </View>
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='white'
              style={{ marginRight: 15 }}
            />
          ),
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
        }}
      />
      <Tab.Screen
        name='Messages'
        component={Messages}
        options={{
          tabBarLabel: 'Proposals',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='chat' color={color} size={size} />
          ),
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
        }}
      />
    </Tab.Navigator>
  );
}
