import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";
const CustomInputField = ({
  label,
  placeholder,
  value,
  setValue,
  secureTextEntry,
  keyboardType,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            secureTextEntry ? { color: theme.colors.white } : null,
          ]}>
          {label}
        </Text>
      )}
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
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    label: {
      color: theme.colors.whiteTitle,
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
