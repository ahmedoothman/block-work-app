import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import inputstyle from '../../../styles/components/inputs/inputField';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const InputField = (props) => {
  const { value, placeholder, isPassword, onChange, isUpload } = props;
  const [text, setText] = useState('');

  return (
    <View style={inputstyle.inputContaienr}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword ?? false}
        autoCapitalize='none'
        autoCorrect={false}
        style={[
          inputstyle.input,
          { backgroundColor: '#393939', color: '#fff', paddingRight: 40 },
        ]} // Add padding to the right
        placeholderTextColor='#9E9E9E'
      />
      {/* Icon positioned at the end of the TextInput */}
      {isUpload && (
        <MaterialIcons
          name={'file-upload'} // Change icon based on isPassword
          size={30}
          color='#9E9E9E'
          style={inputstyle.icon}
          onPress={() => {
            // Add functionality for icon press if needed
            // For example, toggle password visibility
          }}
        />
      )}
    </View>
  );
};

export default InputField;
