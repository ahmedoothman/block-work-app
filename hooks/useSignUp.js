import { useState } from 'react';
import { signUpService } from '../services/userService';
import * as ImagePicker from 'expo-image-picker';

const useSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    nationalID: '',
    email: '',
    password: '',
    passwordConfirm: '',
    country: '',
    phone: '',
    personelPhoto: null,
    frontIdPhoto: null,
    backIdPhoto: null,
    role: '',
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validateInputs = () => {
    const { name, email, password, passwordConfirm, role } = userInfo;

    setError(false);
    setErrorMessage('');

    if (!name || name.length < 4) {
      setError(true);
      setErrorMessage('Name must be at least 4 characters long.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setError(true);
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 6 || password.length > 10) {
      setError(true);
      setErrorMessage('Password must be between 6 and 10 characters long.');
      return false;
    }

    if (password !== passwordConfirm) {
      setError(true);
      setErrorMessage('Password and Password Confirmation must match.');
      return false;
    }

    if (!role) {
      setError(true);
      setErrorMessage(
        "Please choose either 'Freelancer' or 'Client' as your role."
      );
      return false;
    }

    return true;
  };

  const pickImage = async (field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange(field, result.assets[0]);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (const key in userInfo) {
      if (userInfo[key]) {
        if (
          key === 'personelPhoto' ||
          key === 'frontIdPhoto' ||
          key === 'backIdPhoto'
        ) {
          const file = userInfo[key];
          if (file && file.uri) {
            formData.append(key, {
              uri: file.uri,
              type: file.mimeType || 'image/jpeg',
              name: file.fileName || `${key}.jpg`,
            });
          }
        } else {
          formData.append(key, userInfo[key]);
        }
      }
    }

    const response = await signUpService(formData);

    if (response.status === 'success') {
      setError(false);
      setErrorMessage('');
      // Handle successful sign-up (e.g., navigate to a new screen)
    } else {
      setError(true);
      setErrorMessage(response.message || 'An error occurred during sign-up');
    }
    setLoading(false);
  };

  return {
    userInfo,
    handleInputChange,
    handleSignUp,
    pickImage,
    error,
    errorMessage,
    setError,
    loading,
  };
};

export default useSignUp;
