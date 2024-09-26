import { View, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigator from '../../navigators/BottomNavigator';
const FreelancerBase = () => {
  return (
    <View style={styles.container}>
      <BottomNavigator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreelancerBase;
