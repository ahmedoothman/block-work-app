import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";

const MessageBox = ({ message, isSender, timestamp }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View
      style={[styles.container, isSender ? styles.sender : styles.receiver]}>
      <Text
        style={[
          styles.message,
          isSender ? styles.senderText : styles.receiverText,
        ]}>
        {message}
      </Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      maxWidth: "80%",
      padding: 10,
      borderRadius: 8,
      marginVertical: 5,
    },
    sender: {
      alignSelf: "flex-end",
      backgroundColor: theme.colors.primaryBright, // Blue color for sender messages
    },
    receiver: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.ternaryLight, // Light gray for receiver messages
    },
    message: {
      fontSize: 16,
    },
    senderText: {
      color: theme.colors.white, // White text for sender messages
    },
    receiverText: {
      color: theme.colors.secondaryDark, // Black text for receiver messages
    },
    timestamp: {
      fontSize: 12,
      color: theme.colors.ternaryDark,
      marginTop: 5,
      alignSelf: "flex-end", // Align timestamp to the end
    },
  });

export default MessageBox;
