import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InputField from '../../components/inputs/auth/InputField';
import theme from '../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/btns/AppButton';
import { createJobService } from '../../services/jobService';
import CustomeSnackBar from '../../components/Public/CustomeSnackBar';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { categories, skillsEnum } from '../../constants/global/data';

const CreateJobForm = () => {
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
  const onDismissSnackBar = () => setAlert(false);
  const navigation = useNavigation();

  const handleCreate = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    const response = await createJobService(jobCreatedInfo);
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

  const clearInputs = () => {
    setJobCreatedInfo({
      title: '',
      description: '',
      budget: '0.00',
      skillsRequired: [],
      category: '',
      duration: '',
    });
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
          {}
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

          {}
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

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Budget</Text>
            <InputField
              value={`$${jobCreatedInfo.budget}`}
              placeholder={'$0.00'}
              isPassword={false}
              onChange={(value) => {
                const numericValue = value.replace(/[^0-9.]/g, '');
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Category</Text>
            <Dropdown
              data={categories}
              placeholder={'Select Category'}
              labelField='label'
              valueField='value'
              value={jobCreatedInfo.category}
              placeholderStyle={{ color: theme.colors.white }}
              selectedTextStyle={{ color: theme.colors.white }}
              searchPlaceholderTextColor={theme.colors.secondaryDark}
              onChange={(item) =>
                setJobCreatedInfo((prev) => ({ ...prev, category: item.value }))
              }
              search
              maxHeight={200}
              style={styles.dropdown}
            />
          </View>
          {jobCreatedInfo.skillsRequired.length > 0 && (
            <View style={styles.inputContainer}>
              {}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {jobCreatedInfo.skillsRequired.map((skill, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.colors.primaryDark,
                      padding: 5,
                      borderRadius: 10,
                      margin: 5,
                    }}
                  >
                    <Text style={{ color: 'white' }}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Skills Required</Text>
            <Dropdown
              data={skillsEnum}
              placeholder={
                jobCreatedInfo.skillsRequired.length > 0
                  ? jobCreatedInfo.skillsRequired.join(', ')
                  : 'Select Skill'
              }
              labelField='label'
              valueField='value'
              value={jobCreatedInfo.skillsRequired[0]}
              placeholderStyle={{ color: theme.colors.white }}
              selectedTextStyle={{ color: theme.colors.white }}
              searchPlaceholderTextColor={theme.colors.secondaryDark}
              onChange={(item) => {
                const selectedSkill = item.value;
                setJobCreatedInfo((prev) => ({
                  ...prev,
                  skillsRequired: [...prev.skillsRequired, selectedSkill],
                }));
              }}
              search
              searchPlaceholder='Type to filter skills'
              style={styles.dropdown}
              maxHeight={200}
            />
          </View>

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

          {}
          <View style={styles.btnContainer}>
            <AppButton
              buttonTitle={'Create'}
              onPress={handleCreate}
              loading={loading}
              bgColor={theme.colors.primaryDark}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      {}
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.colors.secondaryDark,
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
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: theme.colors.secondaryBright,
    borderRadius: 5,
    width: '90%',
    marginHorizontal: 'auto',
    padding: 10,
    color: 'white',
  },
  btnContainer: {
    alignItems: 'center',
  },
});

export default CreateJobForm;
