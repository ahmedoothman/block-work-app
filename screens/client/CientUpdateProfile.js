import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import theme from '../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Snackbar } from 'react-native-paper';
import CustomInputField from '../../components/btns/CustomInputField';
import AppButton from '../../components/btns/AppButton';
import { updateMeService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useNavigation } from '@react-navigation/native';
export default function UpdateProfile({ route }) {
  const navigation = useNavigation();
  const { userdata } = route.params;
  const [uname, setName] = useState(userdata.name);
  const [email, setEmail] = useState(userdata.email);
  const [NId, setNId] = useState(userdata.nationalId);
  const [phone, setPhone] = useState(userdata.phone);
  const [title, setTitle] = useState(userdata.jobTitle);
  const [Bio, setBio] = useState(userdata.bio);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const onDismissSnackBar = () => setVisible(false);

  const resetForm = () => {
    setBio('');
    setEmail('');
    setNId('');
    setName('');
    setPhone('');
    setTitle('');
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    const user = {
      name: uname,
      email,
      phone,
      bio: Bio,
      jobTitle: title,
      nationalId: NId,
    };
    const data = JSON.stringify(user);
    const response = await updateMeService(data);
    if (response.status === 'success') {
      dispatch(authActions.setUser(response.data));
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setError(true);
      setErrorMessage(response.message);
      setVisible(true);
    }
    setIsLoading(false);
  };
  const handlebtn = () => {
    handleUpdate();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <CustomInputField
            label={'Name'}
            value={uname}
            setValue={setName}
            placeholder={'Enter your name'}
          />
          <CustomInputField
            label={'Email'}
            value={email}
            setValue={setEmail}
            placeholder={'Enter your email'}
          />
          <CustomInputField
            label={'National Id'}
            value={NId}
            setValue={setNId}
            placeholder={'Enter your national Id'}
          />
          <CustomInputField
            label={'Phone'}
            value={phone}
            setValue={setPhone}
            placeholder={'Enter your phone'}
          />
          <CustomInputField
            label={'Job Title'}
            value={title}
            setValue={setTitle}
            placeholder={'Enter your job Title'}
          />
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.input}
            placeholder='enter your bio...'
            value={Bio}
            onChangeText={setBio}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={theme.colors.ternaryDark}
            textColor={theme.colors.secondaryGray}
          />
          <View style={{ marginHorizontal: 30 }}>
            <AppButton
              buttonTitle={'Update'}
              onPress={handleUpdate}
              loading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbarStyle}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
    padding: 30,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: theme.colors.ternaryLight,
    borderRadius: theme.borderRadius,
    padding: 10,
    color: theme.colors.ternaryDark,
    textAlignVertical: 'top',
    borderColor: theme.colors.ternaryLight,
  },
  label: {
    color: theme.colors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  snackbarStyle: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});
