import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import InputField from '../../components/inputs/auth/InputField';
import useTheme from "../../hooks/useTheme";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/btns/AppButton';
import { updateJobService } from '../../services/jobService'; // Only update service
import CustomeSnackBar from '../../components/Public/CustomeSnackBar';
import { useNavigation } from '@react-navigation/native';

const UpdateJobForm = ({ route }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const { job } = route.params;
  const [jobCreatedInfo, setJobCreatedInfo] = useState({
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
  const navigation = useNavigation();

  useEffect(() => {
    if (job) {
      setJobCreatedInfo({
        title: job.title || '',
        description: job.description || '',
        budget: job.budget || 0,
        skillsRequired: job.skillsRequired || [],
        category: job.category || '',
        duration: job.duration || '',
      });
    }
  }, [job]);

  const onDismissSnackBar = () => setAlert(false);

  const handleUpdate = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);

    const response = await updateJobService(job._id, jobCreatedInfo); // Call update service

    setAlert(true);
    if (response.status === 'success') {
      setIsSuccess(true);
      setAlertMessage('Updated Successfully');
      setTimeout(() => {
        navigation.navigate('ClientBase');
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setLoading(false);
  };

  const validateInputs = () => {
    setAlert(false);
    setAlertMessage('');

    if (!jobCreatedInfo.title || jobCreatedInfo.title.trim() === '') {
      setAlert(true);
      setAlertMessage('Title is required.');
      setLoading(false);
      return false;
    }

    if (
      !jobCreatedInfo.description ||
      jobCreatedInfo.description.trim() === ''
    ) {
      setAlert(true);
      setAlertMessage('Description is required.');
      setLoading(false);
      return false;
    }

    if (
      !jobCreatedInfo.budget ||
      isNaN(jobCreatedInfo.budget) ||
      parseFloat(jobCreatedInfo.budget) <= 0
    ) {
      setAlert(true);
      setAlertMessage('Budget must be a valid positive number.');
      setLoading(false);
      return false;
    }

    if (
      !jobCreatedInfo.skillsRequired ||
      jobCreatedInfo.skillsRequired.length === 0
    ) {
      setAlert(true);
      setAlertMessage('At least one skill is required.');
      setLoading(false);
      return false;
    }

    if (!jobCreatedInfo.category || jobCreatedInfo.category.trim() === '') {
      setAlert(true);
      setAlertMessage('Category is required.');
      setLoading(false);
      return false;
    }

    if (
      !jobCreatedInfo.duration ||
      isNaN(jobCreatedInfo.duration) ||
      parseInt(jobCreatedInfo.duration) <= 0
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
          {/* Job Title */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Job Title</Text>
            <InputField
              value={jobCreatedInfo.title}
              placeholder={'Job Title'}
              isPassword={false}
              onChange={(value) =>
                setJobCreatedInfo((prev) => ({ ...prev, title: value }))
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
          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Description</Text>
            <InputField
              value={jobCreatedInfo.description}
              placeholder={'Description'}
              isPassword={false}
              onChange={(value) =>
                setJobCreatedInfo((prev) => ({ ...prev, description: value }))
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
          {/* Budget */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Budget</Text>
            <InputField
              value={`$${jobCreatedInfo.budget}`}
              placeholder={'$0.00'}
              isPassword={false}
              onChange={(value) => {
                const numericValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
                setJobCreatedInfo((prev) => ({
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
          {/* Skills Required */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Skills Required</Text>
            <InputField
              value={jobCreatedInfo.skillsRequired.join(' ')}
              placeholder={'Skills Required'}
              isPassword={false}
              onChange={(value) => {
                const skills = value.split(' ');
                setJobCreatedInfo((prev) => ({
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
          {/* Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Category</Text>
            <InputField
              value={jobCreatedInfo.category}
              placeholder={'Category'}
              isPassword={false}
              onChange={(value) =>
                setJobCreatedInfo((prev) => ({ ...prev, category: value }))
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
          {/* Duration */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Duration</Text>
            <InputField
              value={jobCreatedInfo.duration}
              placeholder={'Duration'}
              isPassword={false}
              onChange={(value) =>
                setJobCreatedInfo((prev) => ({ ...prev, duration: value }))
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
          {/* Update Button */}
          <View style={styles.btnContainer}>
            <AppButton
              buttonTitle='Update'
              onPress={() => {
                handleUpdate();
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
        bgColor={isSuccess ? theme.colors.success : theme.colors.danger}
        messageColor='#fff'
      />
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      padding: 10,
    },
    formContainer: {
      width: "95%",
      marginHorizontal: "auto",
      marginTop: 20,
      backgroundColor: theme.colors.secondaryGray,
      padding: 10,
      borderRadius: 20,
    },
    inputContainer: {
      marginBottom: 15,
    },
    inputTitle: {
      color: theme.colors.colorTextBlue,
      fontSize: 17,
      fontWeight: "bold",
    },
    btnContainer: {
      marginTop: 10,
    },
  });

export default UpdateJobForm;
