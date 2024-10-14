import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import useTheme from "../../hooks/useTheme";
const AppButton = (props) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {
    buttonTitle,
    onPress,
    loading,
    marginBottom,
    marginX,
    btnWidth,
    paddingY,
    paddingX,
    textSize,
    bgColor,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          marginBottom: marginBottom || 20,
          marginHorizontal: marginX || 0,
          width: btnWidth || 210,
          paddingVertical: paddingY || 10,
          paddingHorizontal: paddingX || 15,
          backgroundColor: bgColor || theme.colors.colorTextBlue,
        },
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.white} />
      ) : (
        <Text style={[styles.buttonText, { fontSize: textSize || 14 }]}>
          {buttonTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const createStyles = (theme) =>
  StyleSheet.create({
    button: {
      marginTop: 20,
      paddingVertical: 10,
      width: 210,
      borderRadius: theme.borderRadius,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.colors.white,

      fontWeight: "bold",
    },
  });

export default AppButton;
