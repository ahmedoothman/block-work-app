import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const { width } = Dimensions.get('window');
import useTheme from "../../hooks/useTheme";
import CustomInputField from '../../components/btns/CustomInputField';
import { useState } from 'react';
import { changePasswordService } from '../../services/userService';
import CustomeSnackBar from '../../components/Public/CustomeSnackBar';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import useLogout from '../../hooks/useLogout';
const PasswordSettings = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const logoutHandler = useLogout();
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDismissSnackBar = () => setAlert(false);
  async function handleSubmitPasswordSettings() {
    setLoading(true);
    if (!handleInputsValidation()) {
      return;
    }
    const response = await changePasswordService(
      currentPassword,
      newPassword,
      confirmPassword
    );
    setAlert(true);
    if (response.status == 'success') {
      setIsSuccess(true);
      setAlertMessage('Password has been reset successfully');
      setTimeout(() => {
        logoutHandler();
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setLoading(false);
    handleResetForm();
  }

  function handleResetForm() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  function handleInputsValidation() {
    setAlert(false);
    setAlertMessage('');

    if (
      !currentPassword ||
      currentPassword.length < 6 ||
      currentPassword.length > 10
    ) {
      setAlert(true);
      setAlertMessage('Password must be at least 8 characters long.');
      setLoading(false);
      return false;
    }

    if (newPassword !== confirmPassword) {
      setAlert(true);
      setAlertMessage('New Password and Confirmation Password  must match.');
      setLoading(false);
      return false;
    }

    return true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.ChangePasswordForm}>
        <CustomInputField
          label='Current Password'
          value={currentPassword}
          setValue={setCurrentPassword}
          secureTextEntry
        />

        <CustomInputField
          label='New Password'
          value={newPassword}
          setValue={setNewPassword}
          secureTextEntry
        />

        <CustomInputField
          label='Password Confirm'
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry
        />

        {/*Button Submit*/}

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleSubmitPasswordSettings}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <CustomeSnackBar
        visible={alert}
        alertMessage={alertMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText='Undo'
        undoColor={theme.colors.secondaryDark}
        bgColor={isSuccess ? theme.colors.success : theme.colors.danger}
        messageColor={theme.colors.white}
      />
    </View>
  );
};

export default PasswordSettings;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      padding: 10,
    },
    ChangePasswordForm: {
      width: width * 0.8,
      // backgroundColor: theme.colors.secondaryGray,
      backgroundColor: theme.colors.secondaryDark,
      borderRadius: 10,
      marginVertical: 25,
      padding: 15,
      alignSelf: "center",
    },

    buttonView: {
      marginTop: 20,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: "bold",
      fontSize: 15,
    },
    button: {
      backgroundColor: theme.colors.colorTextBlue,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: width * 0.45,
    },
  });
