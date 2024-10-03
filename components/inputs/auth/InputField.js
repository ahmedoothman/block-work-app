import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import theme from "../../../theme";

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
    isTextErea,
    textErealines,
    isNumeric,
    textColor
  } = props;
  const [text, setText] = useState("");

  return (
    <View
      style={[
        styles.inputContaienr,
        {
          marginHorizontal: marginX || 0,
          marginVertical: marginY || 8,
        },
      ]}>
      {isUpload ? (
        <TouchableOpacity
          onPress={onChange}
          style={[
            styles.uploadButton,
            {
              backgroundColor: bgColor || theme.colors.inputBg,
              color: theme.colors.white,
            },
          ]}>
          <Text style={{ color: theme.colors.ternaryDark }}>
            {value ? "Photo Selected" : placeholder}
          </Text>
          <MaterialIcons
            name={"file-upload"}
            size={30}
            color={theme.colors.ternaryDark}
            style={styles.icon}
            onPress={() => {}}
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isPassword ?? false}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={isTextErea === true} // Set multiline to true if isText is true, otherwise false
          numberOfLines={isTextErea ? textErealines || 4 : 1}
          keyboardType={isNumeric ? "numeric" : "default"}
          style={[
            styles.input,
            {
              backgroundColor: bgColor || theme.colors.inputBg,
              color: textColor||theme.colors.white,
              // paddingRight: 40,
              paddingVertical: paddingY || 15,
              paddingHorizontal: paddingX || 15,
              textAlignVertical: "top", // Align text to the top
              textAlign: "left",
            },
          ]}
          placeholderTextColor={theme.colors.ternaryDark}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContaienr: {
    width: "100%",
    marginVertical: 2,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: theme.borderRadius,
    borderTopStartRadius: theme.borderRadius,
    borderTopEndRadius: theme.borderRadius,
    width: "100%",
    overflow: "hidden",
  },
  uploadButton: {
    width: "100%",
    overflow: "hidden",

    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius,
    borderTopStartRadius: theme.borderRadius,
    borderTopEndRadius: theme.borderRadius,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    // position: 'absolute',
    // right: 10,
    // top: "50%",
    // transform: [{ translateY: -12 }],
    // zIndex: 1,
  },
});
export default InputField;
