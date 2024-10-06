import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import { RadioButton } from 'react-native-paper';
import AppButton from '../../components/btns/AppButton';
import theme from '../../theme';
import { signUpService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { uploadFile } from '../../utils/uploadFile';

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: '',
    nationalId: '',
    email: '',
    password: '',
    passwordConfirm: '',
    country: '',
    phone: '',
    frontIdPhotoUrl: null,
    backIdPhotoUrl: null,
    userPhotoUrl: null,
    role: '',
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onDismissSnackBar = () => setError(false);

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const uploadedPhotos = await Promise.all([
        userInfo.userPhotoUrl &&
          uploadFile(userInfo.userPhotoUrl.uri, 'users', 'userPhotoUrl'),
        userInfo.frontIdPhotoUrl &&
          uploadFile(userInfo.frontIdPhotoUrl.uri, 'users', 'frontIdPhotoUrl'),
        userInfo.backIdPhotoUrl &&
          uploadFile(userInfo.backIdPhotoUrl.uri, 'users', 'backIdPhotoUrl'),
      ]);

      const [personelPhotoURL, frontIdPhotoURL, backIdPhotoURL] =
        uploadedPhotos;

      const userJson = {
        ...userInfo,
        userPhotoUrl: personelPhotoURL || null,
        frontIdPhotoUrl: frontIdPhotoURL || null,
        backIdPhotoUrl: backIdPhotoURL || null,
      };

      const response = await signUpService(userJson);

      if (response.status === 'success') {
        clearInputs(); // Clear inputs after successful signup

        navigation.navigate('SignIn');
      } else {
        setError(true);
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError(true);
      setErrorMessage('An error occurred while signing up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserInfo((prev) => ({ ...prev, [field]: result.assets[0] }));
    }
  };

  const clearInputs = () => {
    setUserInfo({
      name: '',
      nationalId: '',
      email: '',
      password: '',
      passwordConfirm: '',
      country: '',
      phone: '',
      frontIdPhotoUrl: null,
      backIdPhotoUrl: null,
      userPhotoUrl: null,
      role: '',
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.secondaryDark },
      ]}
    >
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <Logo />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, name: value }))
          }
          value={userInfo.name}
          placeholder='Name'
        />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, nationalId: value }))
          }
          value={userInfo.nationalId}
          placeholder='National ID'
        />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, email: value }))
          }
          value={userInfo.email}
          placeholder='Email'
        />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, password: value }))
          }
          value={userInfo.password}
          placeholder='Password'
          isPassword={true}
        />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, passwordConfirm: value }))
          }
          value={userInfo.passwordConfirm}
          placeholder='Password Confirm'
          isPassword={true}
        />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, country: value }))
          }
          value={userInfo.country}
          placeholder='Country'
        />

        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, phone: value }))
          }
          value={userInfo.phone}
          placeholder='Phone'
        />

        <InputField
          onChange={() => pickImage('userPhotoUrl')}
          value={userInfo.userPhotoUrl?.uri}
          placeholder='Upload Photo'
          isUpload={true}
        />

        <InputField
          onChange={() => pickImage('frontIdPhotoUrl')}
          value={userInfo.frontIdPhotoUrl?.uri}
          placeholder='Front ID Photo'
          isUpload={true}
        />

        <InputField
          onChange={() => pickImage('backIdPhotoUrl')}
          value={userInfo.backIdPhotoUrl?.uri}
          placeholder='Back ID Photo'
          isUpload={true}
        />

        <View style={styles.radioGroup}>
          <RadioButton
            value='Freelancer'
            onPress={() =>
              setUserInfo((prev) => ({ ...prev, role: 'freelancer' }))
            }
            status={userInfo.role === 'freelancer' ? 'checked' : 'unchecked'}
          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>
            Freelancer
          </Text>

          <RadioButton
            value='Client'
            onPress={() => setUserInfo((prev) => ({ ...prev, role: 'client' }))}
            status={userInfo.role === 'client' ? 'checked' : 'unchecked'}
          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>
            Client
          </Text>
        </View>

        <View style={styles.centerBtn}>
          <AppButton
            onPress={handleSignUp}
            buttonTitle={'Create Account'}
            loading={loading}
          />
        </View>

        <View style={styles.signInTextContainer}>
          <Text style={styles.signInPrompt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <Snackbar
        visible={error}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => setError(false),
          labelStyle: { color: theme.colors.secondaryDark },
        }}
        style={{
          backgroundColor: theme.colors.danger,
          borderRadius: theme.borderRadius,
        }}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 20,
  },
  centerBtn: {
    margin: 'auto',
  },
  signInTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInPrompt: {
    color: theme.colors.white,
  },
  signInText: {
    color: theme.colors.primaryBright,
    marginLeft: 5,
  },
});

export default SignUp;
