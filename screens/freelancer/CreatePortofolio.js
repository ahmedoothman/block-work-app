import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createPortfolioService,
  updatePortfolioService,
} from '../../services/portofolioService';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import InputField from '../../components/inputs/auth/InputField';
import * as ImagePicker from 'expo-image-picker';
import useTheme from "../../hooks/useTheme";
import { uploadFile } from '../../utils/uploadFile';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

export default function CreatePortfolio({ route }) {
    const theme = useTheme();
    const styles = createStyles(theme);
  const user = useSelector((state) => state.auth.user);
  const { isEdit, screenTitle, _id, item } = route.params;
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    navigation.setOptions({ title: screenTitle });
    if (isEdit && item) {
      setTitle(item.title || '');
      setDescription(item.description || '');
      setImages(item.files || []);
    }
  }, [navigation]);

  const handleResetForm = () => {
    setImages([]);
    setTitle('');
    setDescription('');
  };

  const createPortofolioItem = async () => {
    setIsLoading(true);
    const newData = {
      title,
      description,
      files: images,
    };
    const response = await createPortfolioService(newData);
    if (response.status === 'success') {
      setVisible(true);
      setMessageType('success');
      setMessage('Portfolio submitted successfully');
      handleResetForm();
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setVisible(true);
      setMessageType('error');
      setMessage(response.message);
    }
  };

  const updatePortfolioItem = async () => {
    setIsLoading(true);
    const newData = {
      title,
      description,
      files: images,
    };
    const response = await updatePortfolioService(_id, newData);
    if (response.status === 'success') {
      setVisible(true);
      setMessageType('success');
      setMessage('Portfolio updated successfully');
      setTimeout(() => {
        navigation.navigate('Portofolio', { userId: user._id });
      }, 2000);
    } else {
      setVisible(true);
      setMessageType('error');
      setMessage(response.message);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUploading(true);
      // upload the selected image
      const uploadedImage = await uploadFile(
        result.assets[0].uri,
        'portfolios',
        'images'
      );
      setImages([...images, uploadedImage]);
      setImageUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.portfolioForm}>
        {/* Title input field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description input field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.coverLetterInput}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Images input field */}
        <View style={styles.inputGroup}>
          <Text style={styles.imageLabel}>Images</Text>
          <InputField
            onChange={pickImage}
            value={images.map((img) => img.uri).join(', ')}
            placeholder='Upload Photos'
            isUpload={true}
            bgColor={theme.colors.ternaryLight}
          />
        </View>
        {/* Button Add */}
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => {
              isEdit ? updatePortfolioItem() : createPortofolioItem();
            }}
          >
            {isLoading || imageUploading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>{isEdit ? 'Update' : 'Add'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={[
          styles.snackbar,
          {
            backgroundColor:
              messageType === 'success'
                ? theme.colors.success
                : theme.colors.danger,
          },
        ]}
      >
        <Text style={styles.snackbarText}>{message}</Text>
      </Snackbar>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      padding: 10,
      position: "relative",
    },
    portfolioForm: {
      width: width * 0.8,
      backgroundColor: theme.colors.secondaryGray,
      borderRadius: 10,
      marginVertical: 25,
      padding: 15,
      alignSelf: "center",
    },
    label: {
      color: theme.colors.white,
      fontSize: 14,
      marginBottom: 10,
    },
    imageLabel: {
      color: theme.colors.white,
      fontSize: 14,
      marginBottom: -1,
    },
    inputGroup: {
      marginBottom: 15,
    },
    input: {
      backgroundColor: theme.colors.ternaryLight,
      borderRadius: 8,
      padding: 10,
      color: theme.colors.ternaryDark,
      textAlignVertical: "top",
    },
    coverLetterInput: {
      backgroundColor: theme.colors.ternaryLight,
      borderRadius: 8,
      padding: 10,
      height: 100,
      textAlignVertical: "top",
      color: theme.colors.ternaryDark,
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
    snackbar: {
      borderRadius: 8,
      position: "absolute",
      bottom: 5,
    },
    snackbarText: {
      color: theme.colors.white,
    },
  });
