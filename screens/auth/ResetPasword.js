import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Public/logo';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import useTheme from "../../hooks/useTheme";
import { resetPasswordService } from '../../services/userService';
import CustomeSnackBar from '../../components/Public/CustomeSnackBar';

const ResetPassword = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const navigation = useNavigation();

  //'  Main States
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  //' public Functions
  const onDismissSnackBar = () => setAlert(false);

  //' resetPassword Function
  async function handleSubmit() {
    setLoading(true);
    if (!validateInputs()) {
      return;
    }
    const response = await resetPasswordService(otp, password, passwordConfirm);
    setAlert(true);
    if (response.status == 'success') {
      setIsSuccess(true);
      setAlertMessage('Password Reset SuccessFul');
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 1000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setLoading(false);
  }

  //' Validate Inputs
  const validateInputs = () => {
    setAlert(false);
    setAlertMessage('');
    // --------- OTP validation
    const otpRegex = /^[0-9]{6}$/;
    if (!otp) {
      setAlert(true);
      setAlertMessage('OTP is required.');
      setLoading(false);
      return false;
    }
    if (!otpRegex.test(otp)) {
      setAlert(true);
      setAlertMessage('OTP must be a 6-digit number.');
      setLoading(false);
      return false;
    }
    // --------- Password validation
    if (!password || password.length < 6 || password.length > 10) {
      setAlert(true);
      setAlertMessage('Password must be at least 8 characters long.');
      setLoading(false);
      return false;
    }

    // --------- Password confirmation validation
    if (password !== passwordConfirm) {
      setAlert(true);
      setAlertMessage('Password and Password Confirmation must match.');
      setLoading(false);
      return false;
    }
    return true;
  };

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
          onChange={(value) => setOTP(value)}
          value={otp}
          placeholder='OTP'
        />
        {/* //' password */}
        <InputField
          onChange={(value) => setPassword(value)}
          value={password}
          placeholder='password'
          isPassword={true}
        />

        {/* //' password Confirm */}
        <InputField
          onChange={(value) => setPasswordConfirm(value)}
          value={passwordConfirm}
          placeholder='Password Confirm'
          isPassword={true}
        />
        {/* //' Login Btn */}
        <AppButton
          onPress={() => handleSubmit()}
          buttonTitle={'Submit'}
          loading={loading}
        />
      </View>

      <CustomeSnackBar
        visible={alert}
        alertMessage={alertMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText='Undo'
        undoColor={theme.colors.secondaryDark}
        bgColor={isSuccess ? theme.colors.success : theme.colors.danger}
        messageColor={theme.colors.white}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "50%",
    },
  });
export default ResetPassword;
