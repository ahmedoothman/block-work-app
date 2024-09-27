import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Public/logo';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import ResetPasswordStyle from '../../styles/Screens/ResetPassword_Style';


const ResetPassword = () => {
  const navigation = useNavigation();


  //'  Main States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //' SignIn Function
  function handleSubmit() {
    console.log("email ", email, " : ", " password  ", password, " : ", " passwordConfirm ", passwordConfirm);
    clearInputs()
  }

  //' clear InputFields
  function clearInputs() {
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
  }

  return (
    <SafeAreaView
      style={[
        ResetPasswordStyle.container, { backgroundColor: "#121114" }
      ]}
    >

      <View style={[
        ResetPasswordStyle.content,
      ]}>

        {/* //' Logo Container */}
        <Logo />

        {/* //' Email */}
        <InputField
          onChange={(value) => setEmail(value)}
          value={email}
          placeholder="Email"
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

export default ResetPassword;
