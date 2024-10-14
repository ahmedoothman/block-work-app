import { View, StyleSheet } from 'react-native';
import React from 'react';

import FreelancerBottomNavigator from '../../navigators/FreelancerBottomNavigator';
const FreelancerBase = () => {
  return (
    <View style={styles.container}>
      {/* <DrawerNavigator /> */}
      <FreelancerBottomNavigator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreelancerBase;
