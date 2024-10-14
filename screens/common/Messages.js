import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBox from '../../components/inputs/searchBox/SearchBox';
import { getAllChats } from '../../services/chatService';
import ChatBox from '../../components/chat/ChatBox';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import theme from '../../theme';
import { useQuery } from 'react-query';

const Messages = () => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    data,
    error: queryError,
    isLoading,
  } = useQuery('chats', getAllChats, {
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  React.useEffect(() => {
    if (queryError) {
      setError(true);
      setErrorMessage(queryError.message || 'An unknown error occurred');
    }
  }, [queryError]);

  const onDismissSnackbar = () => setError(false);

  return (
    <ScrollView style={styles.container}>
      <SearchBox placeholder={'Search for chats'} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.white} />
        </View>
      ) : (
        data?.status === 'success' &&
        data.data.map((chat, index) => <ChatBox key={index} data={chat} />)
      )}
      {!isLoading && data?.data?.length === 0 && (
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
          onPress: onDismissSnackbar,
        }}
      >
        {errorMessage || 'An unknown error occurred.'}
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
    height: '100%',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  notFound: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Messages;
