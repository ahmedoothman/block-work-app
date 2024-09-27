import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import theme from '../../theme';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import signInStyle from '../../styles/Screens/SignIn_Style';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();

  //'  Main States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //' SignIn Function
  function handleSignIn() {
    console.log("email ", email, "password ", password);


    clearInputs()
  }

  //' clear InputFields
  function clearInputs() {
    setEmail("")
    setPassword("")
  }



  return (
    <SafeAreaView
      style={[
        signInStyle.container, { backgroundColor: "#121114" }
      ]}
    >

      <View style={[
        signInStyle.content,
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
        <InputField
          onChange={(value) => setPassword(value)}
          value={password}
          placeholder="Password"
          isPassword={true}
        />


        {/* //' Login Btn */}
        <AppButton onPress={() => handleSignIn()} buttonTitle={"login"} />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')} // Navigate to SignUp component
        >
          <Text style={signInStyle.forget}>
            Forget Password ?
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SignIn;
