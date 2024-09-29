import io from 'socket.io-client';
import { getToken } from '../storage/tokenStorage';
import { API_URL } from '../constants/global/api';

let socket;

// Initialize the socket connection
export const initializeSocket = async () => {
  const token = await getToken();

  socket = io(API_URL);

  // Handle socket connection events
  socket.on('connect', () => {
    console.log('Connected to socket');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket');
  });

  return socket;
};

// Join the chat room
export const joinChatRoom = (userId) => {
  if (socket) {
    socket.emit('join', { userId });
  }
};

// Send a message
export const sendMessage = (senderId, receiverId, message) => {
  if (socket) {
    socket.emit('sendMessage', {
      senderId,
      receiverId,
      message,
    });
  }
};

// Listen for incoming messages
export const receiveMessage = (callback) => {
  if (socket) {
    socket.on('receiveMessage', (message) => {
      callback(message);
    });
  }
};

// Clean up socket events (e.g., when component unmounts)
export const disconnectSocket = () => {
  if (socket) {
    socket.off('receiveMessage');
    socket.disconnect();
  }
};
