
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const CustomInputField = ({ label, placeholder, value, setValue, secureTextEntry, keyboardType }) => {
  return (
    <View style={styles.container} >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.ternaryDark}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: theme.colors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: theme.colors.ternaryLight,
    borderRadius: 8,
    padding: 10,
    color: theme.colors.secondaryGray,
    textAlignVertical: "top",
    
  },
});

