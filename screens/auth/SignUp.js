
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import { RadioButton } from 'react-native-paper';
import AppButton from '../../components/btns/AppButton';
import theme from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import useSignUp from '../../hooks/useSignUp'; // Import your custom hook

const SignUp = () => {
  const navigation = useNavigation();

  const {
    userInfo,
    handleInputChange,
    handleSignUp,
    error,
    errorMessage,
    setError,
    loading,
    pickImage, // Use the pickImage function from the custom hook
  } = useSignUp();

  const onDismissSnackBar = () => setError(false);


  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.secondaryDark },
      ]}>
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}>
        <Logo />

        {/* Name */}
        <InputField
          onChange={(value) => handleInputChange('name', value)}
          value={userInfo.name}
          placeholder='Name'

        />

        {/* National ID */}
        <InputField
          onChange={(value) => handleInputChange('nationalID', value)}
          value={userInfo.nationalID}

          placeholder='National ID'

        />

        {/* Email */}
        <InputField
          onChange={(value) => handleInputChange('email', value)}
          value={userInfo.email}

          placeholder='Email'

        />

        {/* Password */}
        <InputField
          onChange={(value) => handleInputChange('password', value)}
          value={userInfo.password}
          placeholder="Password"
          isPassword={true}
        />

        {/* Password Confirmation */}
        <InputField
          onChange={(value) => handleInputChange('passwordConfirm', value)}
          value={userInfo.passwordConfirm}
          placeholder="Password Confirm"
          isPassword={true}
        />

        {/* Country */}
        <InputField
          onChange={(value) => handleInputChange('country', value)}
          value={userInfo.country}

          placeholder='Country'

        />

        {/* Phone */}
        <InputField
          onChange={(value) => handleInputChange('phone', value)}
          value={userInfo.phone}

          placeholder='Phone'

        />

        {/* Personal Photo */}
        <InputField
          onChange={() => pickImage("personelPhoto")}
          value={userInfo.personelPhoto?.uri}
          placeholder="Upload Photo"
          isUpload={true}
        />

        {/* Front ID Photo */}
        <InputField
          onChange={() => pickImage("frontIdPhoto")}
          value={userInfo.frontIdPhoto?.uri}
          placeholder="Front ID Photo"
          isUpload={true}
        />

        {/* Back ID Photo */}
        <InputField
          onChange={() => pickImage("backIdPhoto")}
          value={userInfo.backIdPhoto?.uri}
          placeholder="Back ID Photo"
          isUpload={true}
        />

        {/* Role Radio Buttons */}
        <View style={styles.radioGroup}>
          <RadioButton

            value='Freelancer'
            onPress={() => handleInputChange('role', 'freelancer')}
            status={userInfo.role === 'freelancer' ? 'checked' : 'unchecked'}

          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>
            Freelancer
          </Text>
          <RadioButton

            value='Client'
            onPress={() => handleInputChange('role', 'client')}
            status={userInfo.role === 'client' ? 'checked' : 'unchecked'}

          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>
            Client
          </Text>
        </View>

        <View style={styles.centerBtn}>
          <AppButton

            onPress={handleSignUp}
            buttonTitle='Create Account'

            loading={loading}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: theme.colors.white }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              color: theme.colors.primaryBright,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: theme.colors.primaryBright }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>


      <CustomeSnackBar
        visible={error}
        alertMessage={errorMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText="Undo"
        undoColor="black"
        bgColor="red"
        messageColor={theme.colors.white}
      />

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 20,
  },
  centerBtn: {
    margin: "auto",
  },
});

export default SignUp;
