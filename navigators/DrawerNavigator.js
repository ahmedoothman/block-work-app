import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/freelancer/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Profile'>
      <Drawer.Screen name='Profile' component={Profile} />
    </Drawer.Navigator>
  );
}
