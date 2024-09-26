import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';

import Jobs from '../screens/freelancer/Jobs';
import Proposals from '../screens/freelancer/Proposals';
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Info'
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='Jobs'
        component={Jobs}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <Icon name='aircraft-take-off' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Proposals'
        component={Proposals}
        options={{
          tabBarLabel: 'Proposals',
          tabBarIcon: ({ color, size }) => (
            <Icon name='aircraft-take-off' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
