import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';


const InputField = (props) => {
  const { value, placeholder, isPassword, onChange, isUpload } = props;
  const [text, setText] = useState('');

  return (
    <View style={styles.inputContaienr}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword ?? false}
        autoCapitalize='none'
        autoCorrect={false}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.inputBg,
            color: theme.colors.white,
            paddingRight: 40
          }]}
        placeholderTextColor={theme.colors.ternaryDark}
      />
      {isUpload &&
        <MaterialIcons
          name={"file-upload"}
          size={30}
          color={theme.colors.ternaryDark}
          style={styles.icon}
          onPress={() => {
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContaienr: {
    width: "100%",
    marginVertical: 10,
    // backgroundColor: "red",
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    borderRadius: 15,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,

    width: "100%",
    overflow: 'hidden',
    paddingVertical: 11,
    paddingHorizontal: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
})
export default InputField;
