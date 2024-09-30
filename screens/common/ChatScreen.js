import React, { useEffect, useState } from 'react';
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
import theme from '../../theme';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import icon
const ChatScreen = ({ route }) => {
  const { userId: toUser } = route.params;
  const userId = useSelector((state) => state.auth.user._id);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  // Dummy data for user info
  const userInfo = route.params.fromUser;

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await getChatHistory(toUser);
        if (response.status === 'success') {
          setMessages(response.data); // Set the messages directly from fetched data
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
      disconnectSocket(); // Clean up the socket connection
    };
  }, [userId]);

  const addMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const handleSendMessage = () => {
    const message = newMessage.trim();
    if (message) {
      sendMessage(userId, toUser, message);
      addMessage({
        from: { _id: userId },
        to: { _id: toUser },
        message,
        timestamp: new Date().toISOString(),
      });
      setNewMessage('');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#fff' />
        <Text style={styles.loadingText}>Loading messages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: userInfo.userPhotoUrl }}
          style={styles.userPhoto}
        />
        <Text style={styles.userName}>{userInfo.name}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <MaterialIcons name='send' size={24} color='white' />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: 'white',
    fontSize: 18,
  },
  scrollContainer: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.secondaryGray,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.colorTextBlue,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatScreen;
