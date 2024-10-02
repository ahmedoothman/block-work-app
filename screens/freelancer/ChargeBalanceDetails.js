import React from "react";
import { StyleSheet, View, Text } from "react-native";
import theme from "../../theme";

const ChargeBalanceDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty For now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
  },
  text: {
    margin: "auto",
    color: theme.colors.white,
    fontSize: 25,
  },
});

export default ChargeBalanceDetails;
