import { View, Text, StyleSheet } from "react-native";
import React from "react";
import InputField from "../../components/inputs/auth/InputField";

const CreateJobForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* jop Title */}
        <View style={styles.inputContainer}>
          <Text>Job Title</Text>
          <InputField
            value={"value"}
            placeholder={"value"}
            isPassword={false}
            // onChange={}
            isUpload={false}
            bgColor="red"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  formContainer: {
    backgroundColor: "teal",
    padding: 5,
  },
  inputContainer: {},
});
export default CreateJobForm;
