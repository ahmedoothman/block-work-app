import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logo from "../../components/Public/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/inputs/auth/InputField";
import { RadioButton } from "react-native-paper";
import AppButton from "../../components/btns/AppButton";
import theme from "../../theme";
import { signUpService } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authActions } from "../../store/auth-slice";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import CustomeSnackBar from "../../components/Public/CustomeSnackBar";

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: "",
    nationalID: "",
    email: "",
    password: "",
    passwordConfirm: "",
    country: "",
    phone: "",
    personelPhoto: null,
    frontIdPhoto: null,
    backIdPhoto: null,
    role: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onDismissSnackBar = () => setError(false);

  //' >-------------------------->SignIn Function
  const handleSignUp = async () => {
    setLoading(true);
    if (!validateInputs()) {
      return;
    }

    const formData = new FormData();
    for (const key in userInfo) {
      if (userInfo[key]) {
        if (
          key === "personelPhoto" ||
          key === "frontIdPhoto" ||
          key === "backIdPhoto"
        ) {
          if (userInfo[key]) {
            formData.append(key, {
              uri: userInfo[key].assets[0].uri,
              name: userInfo[key].assets[0].fileName,
              // type: userInfo[key].assets[0].type'image/jpeg',
              type: userInfo[key].assets[0].mimeType, //' -> image/jpeg'
            });
          }
        } else {
          formData.append(key, userInfo[key]);
        }
      }
    }

    const response = await signUpService(formData._parts);

    if (response.status == "success") {
      console.log("response success ", response.data);
    } else {
      console.log(
        "response error message   ",
        response.status,
        " > ",
        response.message
      );
      setError(true);
      setErrorMessage(response.message);
    }

    setLoading(false);
    //- ---------------------> 4-cleare InputFields
    clearInputs();
  };

  //' Validate Inputs
  const validateInputs = () => {
    const {
      name,
      nationalID,
      email,
      password,
      passwordConfirm,
      country,
      phone,
      role,
    } = userInfo;
    // Clear previous error messages
    setError(false);
    setErrorMessage("");

    // Name validation
    if (!name || name.length < 4) {
      setError(true);
      setErrorMessage("Name must be at least 4 characters long.");
      setLoading(false);
      return false;
    }

    // National ID validation
    if (!nationalID || !/^\d{15}$/.test(nationalID)) {
      setError(true);
      setErrorMessage(
        "National ID must be exactly 15 digits long and contain only numbers."
      );
      setLoading(false);
      return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return false;
    }

    // Password validation
    if (!password || password.length < 6 || password.length > 10) {
      setError(true);
      setErrorMessage("Password must be between 6 and 10 characters long.");
      setLoading(false);
      return false;
    }

    // Password confirmation validation
    if (password !== passwordConfirm) {
      setError(true);
      setErrorMessage("Password and Password Confirmation must match.");
      setLoading(false);
      return false;
    }

    // Country validation
    const countryPattern = /^[A-Za-z]+$/;
    if (!country || !countryPattern.test(country)) {
      setError(true);
      setErrorMessage("Country must contain only letters.");
      setLoading(false);
      return false;
    }

    // Phone validation
    const phonePattern = /^(02)?01[0125][0-9]{8}$/;
    if (!phone || !phonePattern.test(phone)) {
      setError(true);
      setErrorMessage(
        "Phone number must be exactly 11 digits, starting with 02, 011, 012, 010, or 015."
      );
      setLoading(false);
      return false;
    }

    // Role validation
    if (!role) {
      setError(true);
      setErrorMessage(
        "Please choose either 'Freelancer' or 'Client' as your role."
      );
      setLoading(false);
      return false;
    }

    return true;
  };

  //' Pick Image Function
  const pickImage = async (field) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //' set the value {image name} to it's property in th object { ie. prepersonelPhoto: null}
    if (!result.cancelled) {
      setUserInfo((prev) => ({ ...prev, [field]: result }));
      console.log("-> ", userInfo[field].assets[0].uri);
      console.log("-> ", userInfo[field].assets[0].fileName);
      console.log("-> ", userInfo[field].assets[0].mimeType);
    }
  };

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
        styles.container,
        { backgroundColor: theme.colors.secondaryDark },
      ]}>
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}>
        <Logo />

        {/* //' name */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, name: value }))
          }
          value={userInfo.name}
          placeholder="Name"
          isPassword={false}
        />
        {/* //' national ID */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, nationalID: value }))
          }
          value={userInfo.nationalID}
          placeholder="National ID"
          isPassword={false}
        />
        {/* //' Email */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, email: value }))
          }
          value={userInfo.email}
          placeholder="Email"
          isPassword={false}
        />
        {/* //' password */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, password: value }))
          }
          value={userInfo.password}
          placeholder="Password"
          isPassword={true}
        />

        {/* //' password Confirm */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, passwordConfirm: value }))
          }
          value={userInfo.passwordConfirm}
          placeholder="Password Confirm"
          isPassword={true}
        />
        {/* //' country */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, country: value }))
          }
          value={userInfo.country}
          placeholder="Country"
          isPassword={false}
        />
        {/* //' phone */}
        <InputField
          onChange={(value) =>
            setUserInfo((prev) => ({ ...prev, phone: value }))
          }
          value={userInfo.phone}
          placeholder="Phone"
          isPassword={false}
        />
        {/* //' personelPhoto */}

        <InputField
          onChange={() => pickImage("personelPhoto")}
          value={userInfo.personelPhoto?.uri}
          placeholder="Upload Photo"
          isUpload={true}
        />

        {/* //' frontIdPhoto */}
        <InputField
          onChange={() => pickImage("frontIdPhoto")}
          value={userInfo.frontIdPhoto?.uri}
          placeholder="Front ID Photo"
          isUpload={true}
        />

        {/* //' backIdPhoto */}
        <InputField
          onChange={() => pickImage("backIdPhoto")}
          value={userInfo.backIdPhoto?.uri}
          placeholder="Back ID Photo"
          isUpload={true}
        />

        {/* //' Role Radio Buttons */}
        <View style={styles.radioGroup}>
          <RadioButton
            value="Freelancer"
            onPress={(value) => {
              console.log("userInfo.role", userInfo.role);
              setUserInfo((prev) => {
                return { ...prev, role: "freelancer" };
              });
            }}
            status={userInfo.role === "freelancer" ? "checked" : "unchecked"}
          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>
            Freelancer
          </Text>
          <RadioButton
            value="Client"
            onPress={(value) =>
              setUserInfo((prev) => ({ ...prev, role: "client" }))
            }
            status={userInfo.role === "client" ? "checked" : "unchecked"}
          />
          <Text style={[styles.radioLabel, { color: theme.colors.white }]}>
            Client
          </Text>
        </View>

        <View style={[styles.centerBtn]}>
          <AppButton
            onPress={() => handleSignUp()}
            buttonTitle={"Create Account"}
            loading={loading}
          />
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
