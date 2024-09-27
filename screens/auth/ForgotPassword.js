import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import { useNavigation } from '@react-navigation/native';
import ForgetStyle from '../../styles/Screens/Forget_Style';
import Logo from '../../components/Public/logo';
import AppButton from '../../components/btns/AppButton';

const ForgotPassword = () => {
  const navigation = useNavigation();


  //'  Main States
  const [email, setEmail] = useState("");

  //' SignIn Function
  function handleSubmit() {
    console.log("email ", email);
    clearInputs()
  }

  //' clear InputFields
  function clearInputs() {
    setEmail("")
  }

  return (
    <SafeAreaView
      style={[
        ForgetStyle.container, { backgroundColor: "#121114" }
      ]}
    >

      <View style={[
        ForgetStyle.content,
      ]}>

        {/* //' Logo Container */}
        <Logo />

        {/* //' Email */}
        <InputField
          onChange={(value) => setEmail(value)}
          value={email}
          placeholder="Email"
        />
        {/* //' Password */}

        {/* //' Login Btn */}
        <AppButton onPress={() => handleSubmit()} buttonTitle={"Submit"} />

      </View>

    </SafeAreaView>
  );
};

export default ForgotPassword;
