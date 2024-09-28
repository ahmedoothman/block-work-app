import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Public/logo';
import AppButton from '../../components/btns/AppButton';
import theme from '../../theme';

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
export default ForgotPassword;
