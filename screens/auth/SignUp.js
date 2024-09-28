import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import { RadioButton } from 'react-native-paper';
import AppButton from '../../components/btns/AppButton';
import theme from '../../theme';

const SignUp = () => {


  //'  Main States
  const [userInfo, setUserInfo] = useState({
    name: "",
    nationalID: "",
    email: "",
    password: "",
    passwordConfirm: "",
    country: "",
    phone: "",
    personelPhoto: "",
    frontIdPhoto: "",
    backIdPhoto: "",
    role: ""
  });

  //' SignIn Function
  function handleSignUp() {
    console.log(userInfo);


    clearInputs()
  }

  //' clear InputFields
  function clearInputs() {
    const clearedInputs = {};
    const keys = Object.keys(userInfo);
    for (let i = 0; i < keys.length; i++) {
      clearedInputs[keys[i]] = "";
    }
    setUserInfo(clearedInputs);
  }

  return (
    <SafeAreaView
      style={[
        styles.container, { backgroundColor: theme.colors.secondaryDark }
      ]}
    >

      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >

        <Logo />

        {/* //' name */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, name: value }))}
          value={userInfo.name}
          placeholder="Name"
          isPassword={false}
        />
        {/* //' national ID */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, nationalID: value }))}
          value={userInfo.nationalID}
          placeholder="National ID"
          isPassword={false}
        />
        {/* //' Email */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, email: value }))}
          value={userInfo.email}
          placeholder="Email"
          isPassword={false}
        />
        {/* //' password */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, password: value }))}
          value={userInfo.password}
          placeholder="Password"
          isPassword={true}
        />

        {/* //' password Confirm */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, passwordConfirm: value }))}
          value={userInfo.passwordConfirm}
          placeholder="Password Confirm"
          isPassword={true}
        />
        {/* //' country */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, country: value }))}
          value={userInfo.country}
          placeholder="Country"
          isPassword={false}
        />
        {/* //' phone */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, phone: value }))}
          value={userInfo.phone}
          placeholder="Phone"
          isPassword={false}
        />
        {/* //' personelPhoto */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, personelPhoto: value }))}
          value={userInfo.personelPhoto}
          placeholder="Upload photo"
          isPassword={false}
          isUpload={true}
        />
        {/* //' frontIdPhoto */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, frontIdPhoto: value }))}
          value={userInfo.frontIdPhoto}
          placeholder="Front Id Photo"
          isPassword={false}
          isUpload={true}
        />
        {/* //' backIdPhoto */}
        <InputField
          onChange={(value) => setUserInfo(prev => ({ ...prev, backIdPhoto: value }))}
          value={userInfo.backIdPhoto}
          placeholder="Back Id Photo"
          isPassword={false}
          isUpload={true}
        />


        {/* //' Role Radio Buttons */}
        <View style={styles.radioGroup}>
          <RadioButton
            value="Freelancer"
            onPress={(value) => {
              console.log("userInfo.role", userInfo.role);
              setUserInfo((prev) => { return { ...prev, role: "freelancer" } })
            }}
            status={userInfo.role === 'freelancer' ? 'checked' : 'unchecked'}
          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>Freelancer</Text>
          <RadioButton
            value="Client"
            onPress={(value) => setUserInfo(prev => ({ ...prev, role: "client" }))}
            status={userInfo.role === 'client' ? 'checked' : 'unchecked'}
          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>Client</Text>
        </View>

        <View style={[styles.centerBtn]}>
          <AppButton onPress={() => handleSignUp()} buttonTitle={"Create Account"} />
        </View>


      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 20,
  },
  centerBtn: {
    margin: "auto"
  }
})
export default SignUp;
