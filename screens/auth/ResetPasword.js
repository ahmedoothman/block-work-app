import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Public/logo';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import theme from '../../theme';


const ResetPassword = () => {
  const navigation = useNavigation();


  //'  Main States
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //' SignIn Function
  function handleSubmit() {
    console.log("otp ", otp, " : ", " password  ", password, " : ", " passwordConfirm ", passwordConfirm);
    clearInputs()
  }

  //' clear InputFields
  function clearInputs() {
    setOTP("")
    setPassword("")
    setPasswordConfirm("")
  }

  return (
    <SafeAreaView
      style={[
        styles.container, { backgroundColor: theme.colors.secondaryDark }
      ]}
    >

      <View style={[
        styles.content,
      ]}>

        {/* //' Logo Container */}
        <Logo />

        {/* //' Email */}
        <InputField
          onChange={(value) => setOTP(value)}
          value={otp}
          placeholder="OTP"
        />
        {/* //' password */}
        <InputField
          onChange={(value) => setPassword(value)}
          value={password}
          placeholder="password"
          isPassword={true}
        />

        {/* //' password Confirm */}
        <InputField
          onChange={(value) => setPasswordConfirm(value)}
          value={passwordConfirm}
          placeholder="Password Confirm"
          isPassword={true}
        />
        {/* //' Login Btn */}
        <AppButton onPress={() => handleSubmit()} buttonTitle={"Submit"} />

      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
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
