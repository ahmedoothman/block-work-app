import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';

const InputField = (props) => {
  const {
    value,
    placeholder,
    isPassword,
    onChange,
    isUpload,
    marginY,
    marginX,
    isTextArea,
    textAreaLines,
    isNumeric,
  } = props;

  return (
    <View
      style={[
        styles.inputContainer,
        { marginHorizontal: marginX || 0, marginVertical: marginY || 0 },
      ]}
    >
      {isUpload ? (
        <TouchableOpacity onPress={onChange} style={styles.uploadBtn}>
          <Text style={styles.uploadText}>{value || placeholder}</Text>
          <MaterialIcons
            name='cloud-upload'
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          style={styles.textInput}
          multiline={isTextArea}
          numberOfLines={isTextArea ? textAreaLines || 4 : 1}
          keyboardType={isNumeric ? 'numeric' : 'default'}
          textAlignVertical={isTextArea ? 'top' : 'center'}
          placeholderTextColor='white' // Set the placeholder color to white
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderRadius: theme.borderRadius,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    padding: 10,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.secondaryBright,
    color: 'white', // Set the text color to white
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.secondaryBright,
    borderColor: theme.colors.gray,
    borderWidth: 1,
  },
  uploadText: {
    color: theme.colors.gray,
  },
});

export default InputField;
