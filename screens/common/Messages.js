import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBox from '../../components/inputs/searchBox/SearchBox';
import { getAllChats } from '../../services/chatService';
import ChatBox from '../../components/chat/ChatBox';
import { ActivityIndicator, Snackbar } from 'react-native-paper'; // Import Snackbar
import theme from '../../theme';

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      const response = await getAllChats();
      if (response.status === 'success') {
        setChats(response.data);
      } else {
        setError(true);
        setErrorMessage(response.message || 'An error occurred'); // Fallback error message
      }
      setLoading(false);
    };
    fetchChats();
  }, []);

  const onDismissSnackbar = () => setError(false); // Dismiss snackbar function

  return (
    <ScrollView style={styles.container}>
      <SearchBox placeholder={'Search for chats'} />
      {loading ? ( // Check for loading state
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.white} />
        </View>
      ) : (
        chats.map((chat, index) => <ChatBox key={index} data={chat} />)
      )}
      {chats.length === 0 &&
        !loading && ( // Show no messages found only when not loading
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFound}>No messages found</Text>
          </View>
        )}
      <Snackbar
        visible={error}
        onDismiss={onDismissSnackbar}
        duration={3000}
        action={{
          label: 'Close',
          onPress: onDismissSnackbar, // Dismiss snackbar on action
        }}
      >
        {errorMessage || 'An unknown error occurred.'} // Directly use string
        here
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Full height to center the spinner
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Messages;
