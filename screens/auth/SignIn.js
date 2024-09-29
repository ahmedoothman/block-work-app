import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import { ActivityIndicator } from 'react-native-paper';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';

import { loginService, getMeService } from '../../services/userService';
import { Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //'  Main States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const response = await getMeService();
      if (response.status === 'success') {
        dispatch(authActions.login(response.data));

        if (response.data.role === 'client') {
          navigation.navigate('ClientBase');
        } else {
          navigation.navigate('FreelancerBase');
        }
      }
      setIsCheckingToken(false);
    };

    checkToken();
  }, []);

  //' SignIn Function
  const handleSignIn = async () => {
    const data = { email, password };
    setLoading(true);
    const response = await loginService(data);
    if (response.status == 'success') {
      dispatch(authActions.login(response.data));
      // navigate to job screen
      navigation.navigate('FreelancerBase');
    } else {
      setError(true);
      setErrorMessage(response.message);
    }
    setLoading(false);
  };

  const onDismissSnackBar = () => setError(false);

  if (isCheckingToken) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.secondaryDark },
      ]}
    >
      <View style={[styles.content]}>
        {/* //' Logo Container */}
        <Logo />

        {/* //' Email */}
        <InputField
          onChange={(value) => setEmail(value)}
          value={email}
          placeholder='Email'
        />
        {/* //' Password */}
        <InputField
          onChange={(value) => setPassword(value)}
          value={password}
          placeholder='Password'
          isPassword={true}
        />

        {/* //' Login Btn */}

        <AppButton
          onPress={handleSignIn}
          buttonTitle={'login'}
          loading={loading}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forget}>Forget Password ?</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={error}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            setVisible(false);
          },
          labelStyle: { color: 'black' },
        }}
        style={{ backgroundColor: '#B31312', borderRadius: theme.borderRadius }}
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
    paddingHorizontal: 20,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  forget: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'regular',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignIn;
