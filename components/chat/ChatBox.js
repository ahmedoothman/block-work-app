import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatBox = ({ data }) => {
  const navigation = useNavigation();
  const { lastMessage = 'No messages yet', lastTimestamp, fromUser } = data;

  // Handle potential undefined fromUser properties
  const userId = fromUser?._id || '';
  const userName = fromUser?.name || 'Unknown User';
  const userPhotoUrl =
    fromUser?.userPhotoUrl || 'https://via.placeholder.com/50'; // Fallback image

  // Convert timestamp to a more readable format
  const formattedTime = lastTimestamp
    ? new Date(lastTimestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A'; // Fallback for timestamp

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChatScreen', { userId, fromUser })}
    >
      <Image source={{ uri: userPhotoUrl }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
      <Text style={styles.timestamp}>{formattedTime}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#000', // Black background
    elevation: 2, // For Android shadow effect
    borderRadius: 8, // Rounded corners
    width: '80%',
    marginHorizontal: '10%',
    borderBottomWidth: 1, // Added border bottom width
    borderBottomColor: '#444', // Dark gray color for the border
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular avatar
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff', // White text color
  },
  lastMessage: {
    color: '#ccc', // Light gray text color
    fontSize: 14,
  },
  timestamp: {
    color: '#aaa', // Slightly lighter gray for timestamp
    fontSize: 12,
    textAlign: 'right',
  },
});

export default ChatBox;
