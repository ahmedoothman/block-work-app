import { View, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigator from '../../navigators/BottomNavigator';
import DrawerNavigator from '../../navigators/DrawerNavigator';
const FreelancerBase = () => {
  return (
    <View style={styles.container}>
      <DrawerNavigator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreelancerBase;
