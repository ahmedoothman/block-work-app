import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import theme from '../../theme';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import signInStyle from '../../styles/Screens/SignIn_Style';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';
import { loginService } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //'  Main States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  //' SignIn Function
  const handleSignIn = async () => {
    setLoading(true);
    const response = await loginService({ email, password });
    if (response.status === 'success') {
      // response.data contains the user data , set store
      dispatch(authActions.login(response.data));
      // navigate to freelancer base
    } else {
      // show error message
      setError(true);
      setErrorMessage(response.message);
    }
    setLoading(false);
    clearInputs();
  };

  //' clear InputFields
  function clearInputs() {
    setEmail('');
    setPassword('');
  }

  return (
    <SafeAreaView
      style={[signInStyle.container, { backgroundColor: '#121114' }]}
    >
      <View style={[signInStyle.content]}>
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
        <AppButton onPress={() => handleSignIn()} buttonTitle={'login'} />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')} // Navigate to SignUp component
        >
          <Text style={signInStyle.forget}>Forget Password ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
