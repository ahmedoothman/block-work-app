import React from "react";
import { StyleSheet, View, Text } from "react-native";
import useTheme from "../../hooks/useTheme";
import { Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const CustomeSnackBar = ({
  visible,
  alertMessage,
  onDismissSnackBar,
  undoColor,
  undoText,
  bgColor,
  messageColor,
  Radius,
}) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: undoText || "Undo",
        onPress: () => {},
        labelStyle: {
          color: undoColor ? undoColor : "#000",
        },
      }}
      style={{
        backgroundColor: bgColor || "red",
        borderRadius: Radius || theme.borderRadius,
      }}>
      <Text style={{ color: messageColor || theme.colors.white }}>{alertMessage}</Text>
    </Snackbar>
  );
};

const createStyles = (theme) => StyleSheet.create({});

export default CustomeSnackBar;
