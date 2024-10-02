import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import theme from "../../theme";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
// <ActivityIndicator animating={true} color={MD2Colors.red800} /> :
const AppButton = (props) => {
  const { buttonTitle, onPress, loading, bgColor } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor||theme.colors.colorTextBlue }]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.white} />
      ) : (
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 10,
    width: 210,
    borderRadius: theme.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default AppButton;
