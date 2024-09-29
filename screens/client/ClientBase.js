import { View, StyleSheet } from 'react-native';
import React from 'react';

import ClientBottomNavigator from '../../navigators/ClientBottomNavigator';
const FreelancerBase = () => {
  return (
    <View style={styles.container}>
      <ClientBottomNavigator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreelancerBase;
