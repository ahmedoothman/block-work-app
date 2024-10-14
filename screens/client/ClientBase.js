import { View, StyleSheet } from "react-native";
import React from "react";
import useTheme from "../../hooks/useTheme";
import ClientBottomNavigator from "../../navigators/ClientBottomNavigator";
const FreelancerBase = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <ClientBottomNavigator />
    </View>
  );
};
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default FreelancerBase;
