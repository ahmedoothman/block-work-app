import AsyncStorage from '@react-native-async-storage/async-storage';

// Save Token (Create/Update)
export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

// Get Token (Read)
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        return token; // Returns the token or null if not set
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

// Delete Token (Delete)
export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error deleting token:', error);
    }
};