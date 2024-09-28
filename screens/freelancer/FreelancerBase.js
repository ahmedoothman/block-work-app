import { View, StyleSheet } from 'react-native';
import React from 'react';

import DrawerNavigator from '../../navigators/DrawerNavigator';
import BottomNavigator from '../../navigators/BottomNavigator';
const FreelancerBase = () => {
  return (
    <View style={styles.container}>
      {/* <DrawerNavigator /> */}
      <BottomNavigator/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreelancerBase;
