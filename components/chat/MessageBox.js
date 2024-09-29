import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const MessageBox = ({ message, isSender, timestamp }) => {
  return (
    <View
      style={[styles.container, isSender ? styles.sender : styles.receiver]}
    >
      <Text
        style={[
          styles.message,
          isSender ? styles.senderText : styles.receiverText,
        ]}
      >
        {message}
      </Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff', // Blue color for sender messages
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea', // Light gray for receiver messages
  },
  message: {
    fontSize: 16,
  },
  senderText: {
    color: 'white', // White text for sender messages
  },
  receiverText: {
    color: 'black', // Black text for receiver messages
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.ternaryDark,
    marginTop: 5,
    alignSelf: 'flex-end', // Align timestamp to the end
  },
});

export default MessageBox;
