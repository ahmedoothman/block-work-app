import React, { useState } from 'react';
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
    bgColor,
    paddingY,
    paddingX,
    marginY,
    marginX,
    isTextArea,
    textAreaLines,
    isNumeric,
    textColor,
  } = props;

  return (
    <View
      style={[
        styles.inputContainer,
        {
          marginHorizontal: marginX || 0,
          marginVertical: marginY || 8,
        },
      ]}
    >
      {isUpload ? (
        <TouchableOpacity
          onPress={onChange}
          style={[
            styles.uploadButton,
            {
              backgroundColor: bgColor || theme.colors.inputBg,
            },
          ]}
        >
          <Text style={{ color: theme.colors.ternaryDark }}>
            {value ? 'Photo Selected' : placeholder}
          </Text>
          <MaterialIcons
            name={'file-upload'}
            size={30}
            color={theme.colors.ternaryDark}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          placeholder={placeholder || ''}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isPassword ?? false}
          autoCapitalize='none'
          autoCorrect={false}
          multiline={isTextArea} // Set multiline if isTextArea is true
          numberOfLines={isTextArea ? textAreaLines || 4 : 1}
          keyboardType={isNumeric ? 'numeric' : 'default'}
          style={[
            styles.input,
            {
              backgroundColor: bgColor || theme.colors.inputBg,
              color: textColor || theme.colors.white,
              paddingVertical: paddingY || 15,
              paddingHorizontal: paddingX || 15,
              textAlignVertical: 'top', // Align text to the top
              textAlign: 'left',
            },
          ]}
          placeholderTextColor={theme.colors.ternaryDark}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 2,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: theme.borderRadius,
    width: '100%',
  },
  uploadButton: {
    width: '100%',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    // Additional styles for icon if needed
  },
});

export default InputField;
