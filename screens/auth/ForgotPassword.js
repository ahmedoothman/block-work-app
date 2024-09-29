import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/inputs/auth/InputField";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Public/logo";
import AppButton from "../../components/btns/AppButton";
import theme from "../../theme";
import { Snackbar } from "react-native-paper";
import CustomeSnackBar from "../../components/Public/CustomeSnackBar";
import { forgotPasswordService } from "../../services/userService";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const navigation = useNavigation();

  //'  Main States
  const [email, setEmail] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  //' public Functions
  const onDismissSnackBar = () => setAlert(false);

  //' forgetPassword Function
  async function handleSubmit() {
    setLoading(true);
    if (!validateInputs()) {
      return;
    }
    const response = await forgotPasswordService(email);
    setAlert(true);
    if (response.status == "success") {
      setIsSuccess(true);
      setAlertMessage(response.data);
      console.log("success response", isSuccess, alert, email, response.data);
      setTimeout(() => {
        navigation.navigate("ResetPassword");
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
      console.log("error response", isSuccess, alert, email, response.message);
    }
    setLoading(false);
    clearInputs();
  }

  //' clear InputFields
  function clearInputs() {
    setEmail("");
  }

  //' Validate Inputs
  const validateInputs = () => {
    setAlert(false);
    setAlertMessage("");
    // ------ Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setAlert(true);
      setAlertMessage("Please enter a valid email address.");
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
      ]}>
      <View style={[styles.content]}>
        {/* //' Logo Container */}
        <Logo />

        {/* //' Email */}
        <InputField
          onChange={(value) => setEmail(value)}
          value={email}
          placeholder="Email"
        />

        {/* //' Login Btn */}
        <AppButton
          onPress={() => handleSubmit()}
          buttonTitle={"Submit"}
          loading={loading}
        />
      </View>

      <CustomeSnackBar
        visible={alert}
        alertMessage={alertMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText="Undo"
        undoColor="black"
        bgColor={isSuccess ? theme.colors.colorTextBlue : "red"}
        messageColor="#fff"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default ForgotPassword;
