import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import theme from '../../theme';
import Logo from '../../components/Public/logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';

import { loginService } from '../../services/userService';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authReducer } from '../../store/auth-slice';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  //'  Main States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //->--------------------------handel Loading
  // const [laoding, setLaoding] = useState(false);
  const authLoading = useSelector((state) => state.auth.authLoading)
  //->--------------------------


  // ! SnackBar------------------- ------------------- -------------------
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);//'Hide Snackbar 
  // ! ------------------- ------------------- -------------------


  //' SignIn Function
  const handleSignIn = async () => {

    dispatch(authActions.handelLoading(true))

    try {
      const data = { email, password }
      const response = await loginService(data)
      if (response.status == "success") {
        console.log("response success ", response.data);
        dispatch(authActions.handelLoading(false))
      } else {
        console.log("response error message   ", response.message);
        dispatch(authActions.handelLoading(false))
        setError(true)
        setErrorMessage(response.message)
        setVisible(true)  //'make Snackbar Visible
      }
    } catch (error) {
      console.log("Fetching Error ", error);
      setLaoding(false)
      setError(true)
      setErrorMessage(response.message)
      setVisible(true)
    }

    dispatch(authActions.handelLoading(false))
    clearInputs()
  }


  //' clear InputFields
  function clearInputs() {
    setEmail('');
    setPassword('');
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

        <AppButton onPress={handleSignIn} buttonTitle={"login"} loading={authLoading} />


        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')} // Navigate to SignUp component
        >
          <Text style={styles.forget}>
            Forget Password ?
          </Text>
        </TouchableOpacity>
      </View>


      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            setVisible(false)
          },
          labelStyle: { color: 'black' }
        }}
        style={
          { backgroundColor: "red", borderRadius: theme.borderRadius }
        }
      >
        {/* <Text style={{ fontSize: 13, color: theme.colors.white }}>{errorMessage}</Text> */}
        {errorMessage}
      </Snackbar>

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
  forget: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "regular",
  },
})
export default SignIn;
