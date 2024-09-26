import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import DrawerNavigator from '../../navigators/DrawerNavigator';
const Contracts = () => {
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

export default Contracts;
