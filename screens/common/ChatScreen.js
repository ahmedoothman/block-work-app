import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MessageBox from '../../components/chat/MessageBox';
import { getChatHistory } from '../../services/chatService';
import {
  initializeSocket,
  joinChatRoom,
  sendMessage,
  receiveMessage,
  disconnectSocket,
} from '../../services/socketService';
import useTheme from "../../hooks/useTheme";
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ route }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const { otherUser } = route.params;
  const userId = useSelector((state) => state.auth.user._id);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await getChatHistory(otherUser._id);
        if (response.status === 'success') {
          setMessages(response.data);
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        } else {
          Alert.alert('Error', response.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();

    const setupSocket = async () => {
      await initializeSocket();
      joinChatRoom(userId);

      receiveMessage(({ senderId, message }) => {
        addMessage({
          from: { _id: senderId },
          to: { _id: userId },
          message,
          timestamp: new Date().toISOString(),
        });
      });
    };

    setupSocket();

    return () => {
      disconnectSocket();
    };
  }, [userId]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const addMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const handleSendMessage = () => {
    const message = newMessage.trim();
    if (message) {
      sendMessage(userId, otherUser._id, message);
      addMessage({
        from: { _id: userId },
        to: { _id: otherUser._id },
        message,
        timestamp: new Date().toISOString(),
      });
      setNewMessage('');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={theme.colors.white} />
        <Text style={styles.loadingText}>Loading messages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: otherUser.userPhotoUrl }}
          style={styles.userPhoto}
        />
        <Text style={styles.userName}>{otherUser.name}</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        inverted
      >
        {messages.map((msg, index) => (
          <MessageBox
            key={msg._id || index}
            message={msg.message}
            isSender={msg.from._id === userId}
            timestamp={new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder='Type a message...'
          placeholderTextColor='#ccc'
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>
            <MaterialIcons name='send' size={24} color={theme.colors.white} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
    },
    userInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: theme.colors.secondaryGray,
    },
    userPhoto: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    userName: {
      color: theme.colors.white,
      fontSize: 18,
    },
    scrollContainer: {
      padding: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.white,
    },
    loadingText: {
      color: theme.colors.white,
      fontSize: 20,
      marginTop: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: theme.colors.secondaryGray,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: theme.colors.ternaryDark,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      color: theme.colors.white,
    },
    sendButton: {
      marginLeft: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.colorTextBlue,
      borderRadius: 5,
    },
    sendButtonText: {
      color: theme.colors.white,
    },
  });
export default ChatScreen;
