import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InputField from '../../components/inputs/auth/InputField';
import theme from '../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/btns/AppButton';
import { createJobService } from '../../services/jobService';
import CustomeSnackBar from '../../components/Public/CustomeSnackBar';
import { useNavigation } from '@react-navigation/native';
const CreateJobForm = () => {
  const [jopCreatedinfo, setJopCreatedinfo] = useState({
    title: '',
    description: '',
    budget: 0,
    skillsRequired: [],
    category: '',
    duration: '',
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDismissSnackBar = () => setAlert(false);
  const navigation = useNavigation();

  const handelCreate = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    const response = await createJobService(jopCreatedinfo);
    setAlert(true);
    if (response.status === 'success') {
      setIsSuccess(true);
      setAlertMessage('Job created successfully.');
      setTimeout(() => {
        navigation.navigate('ClientBase');
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setLoading(false);
  };

  function clearInputs() {
    setJopCreatedinfo({
      Title: '',
      description: '',
      budget: '0.00',
      skillsRequired: [],
      Category: '',
    });
  }
  const validateInputs = () => {
    setAlert(false);
    setAlertMessage('');

    if (!jopCreatedinfo.title || jopCreatedinfo.title.trim() === '') {
      setAlert(true);
      setAlertMessage('Title is required.');
      setLoading(false);
      return false;
    }

    if (
      !jopCreatedinfo.description ||
      jopCreatedinfo.description.trim() === ''
    ) {
      setAlert(true);
      setAlertMessage('Description is required.');
      setLoading(false);
      return false;
    }

    if (
      !jopCreatedinfo.budget ||
      isNaN(jopCreatedinfo.budget) ||
      parseFloat(jopCreatedinfo.budget) <= 0
    ) {
      setAlert(true);
      setAlertMessage('Budget must be a valid positive number.');
      setLoading(false);
      return false;
    }

    if (
      !jopCreatedinfo.skillsRequired ||
      jopCreatedinfo.skillsRequired.length === 0
    ) {
      setAlert(true);
      setAlertMessage('At least one skill is required.');
      setLoading(false);
      return false;
    }

    if (!jopCreatedinfo.category || jopCreatedinfo.category.trim() === '') {
      setAlert(true);
      setAlertMessage('Category is required..');
      setLoading(false);
      return false;
    }

    if (
      !jopCreatedinfo.duration ||
      isNaN(jopCreatedinfo.duration) ||
      parseInt(jopCreatedinfo.duration) <= 0
    ) {
      setAlert(true);
      setAlertMessage('Duration must be a valid positive number.');
      setLoading(false);
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Job Title</Text>
            <InputField
              value={jopCreatedinfo.Title}
              placeholder={'Job Title'}
              isPassword={false}
              onChange={(value) =>
                setJopCreatedinfo((prev) => ({ ...prev, title: value }))
              }
              isUpload={false}
              bgColor={theme.colors.white}
              paddingY={10}
              paddingX={10}
              marginY={5}
              marginX={'auto'}
              textColor={'black'}
            />
          </View>
          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Description</Text>
            <InputField
              value={jopCreatedinfo.description}
              placeholder={'description'}
              isPassword={false}
              onChange={(value) =>
                setJopCreatedinfo((prev) => ({ ...prev, description: value }))
              }
              isUpload={false}
              bgColor={theme.colors.white}
              paddingY={0}
              paddingX={0}
              marginY={5}
              marginX={'auto'}
              isTextErea={true}
              textErealines={4}
              textColor={'black'}
            />
          </View>
          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Budget</Text>
            <InputField
              value={`$${jopCreatedinfo.budget}`}
              placeholder={'$0.00'}
              isPassword={false}
              onChange={(value) => {
                const numericValue = value.replace(/[^0-9.]/g, '');
                setJopCreatedinfo((prev) => ({
                  ...prev,
                  budget: parseFloat(numericValue),
                }));
              }}
              isUpload={false}
              bgColor={theme.colors.white}
              paddingY={10}
              paddingX={10}
              marginY={5}
              marginX={'auto'}
              isNumeric={true}
              textColor={'black'}
            />
          </View>
          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Skills Required</Text>
            <InputField
              value={jopCreatedinfo.skillsRequired}
              placeholder={'Skills Required'}
              isPassword={false}
              onChange={(value) => {
                const skills = value.split(',');
                setJopCreatedinfo((prev) => ({
                  ...prev,
                  skillsRequired: skills,
                }));
              }}
              isUpload={false}
              bgColor={theme.colors.white}
              paddingY={10}
              paddingX={10}
              marginY={5}
              marginX={'auto'}
              textColor={'black'}
            />
          </View>
          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Category</Text>
            <InputField
              value={jopCreatedinfo.Category}
              placeholder={'Category'}
              isPassword={false}
              onChange={(value) =>
                setJopCreatedinfo((prev) => ({ ...prev, category: value }))
              }
              isUpload={false}
              bgColor={theme.colors.white}
              paddingY={10}
              paddingX={10}
              marginY={5}
              marginX={'auto'}
              textColor={'black'}
            />
          </View>
          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Duration</Text>
            <InputField
              value={jopCreatedinfo.duration}
              placeholder={'Duration'}
              isPassword={false}
              onChange={(value) =>
                setJopCreatedinfo((prev) => ({ ...prev, duration: value }))
              }
              isUpload={false}
              isNumeric={true}
              bgColor={theme.colors.white}
              paddingY={10}
              paddingX={10}
              marginY={5}
              marginX={'auto'}
              textColor={'black'}
            />
          </View>
          {}
          <View style={styles.btnContainer}>
            <AppButton
              buttonTitle={'Create'}
              onPress={() => {
                handelCreate();
              }}
              loading={loading}
              bgColor={theme.colors.primaryDark}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomeSnackBar
        visible={alert}
        alertMessage={alertMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText='Undo'
        undoColor='black'
        bgColor={isSuccess ? theme.colors.success : theme.colors.red}
        messageColor='#fff'
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  formContainer: {
    width: '95%',
    marginHorizontal: 'auto',
    marginTop: 20,
    backgroundColor: theme.colors.secondaryGray,
    padding: 10,
    borderRadius: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputTitle: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'regular',
    marginLeft: 5,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
});
export default CreateJobForm;
