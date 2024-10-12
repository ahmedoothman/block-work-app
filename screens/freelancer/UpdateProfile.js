import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import theme from "../../theme";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Snackbar } from "react-native-paper";
import CustomInputField from "../../components/btns/CustomInputField";
import AppButton from "../../components/btns/AppButton";
import { updateMeService } from "../../services/userService";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import { skillsEnum } from "../../constants/global/data";
import CustomeSnackBar from "../../components/Public/CustomeSnackBar";
export default function UpdateProfile({ route }) {
  const navigation = useNavigation();
  const { userdata } = route.params;
  console.log("userdata.skills ", userdata.skills);
  const [uname, setName] = useState(userdata.name);
  const [email, setEmail] = useState(userdata.email);
  const [NId, setNId] = useState(userdata.nationalId);
  const [phone, setPhone] = useState(userdata.phone);
  const [title, setTitle] = useState(userdata.jobTitle);
  const [skills, setSkills] = useState(userdata.skills);
  const [Bio, setBio] = useState(userdata.bio);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const onDismissSnackBar = () => setAlert(false);

  const resetForm = () => {
    setBio("");
    setEmail("");
    setNId("");
    setName("");
    setPhone("");
    setSkills([]);
    setTitle("");
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    const user = {
      name: uname,
      email,
      phone,
      bio: Bio,
      skills: skills,
      jobTitle: title,
      nationalId: NId,
    };
    const data = JSON.stringify(user);
    const response = await updateMeService(data);
    setAlert(true);
    if (response.status === "success") {
      dispatch(authActions.setUser(response.data));
      setIsSuccess(true);
      setAlertMessage("Your Information Updated Successfully");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setIsLoading(false);
  };

  const handlebtn = () => {
    handleUpdate();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <CustomInputField
            label={"Name"}
            value={uname}
            setValue={setName}
            placeholder={"Enter your name"}
          />
          <CustomInputField
            label={"Email"}
            value={email}
            setValue={setEmail}
            placeholder={"Enter your email"}
          />
          <CustomInputField
            label={"National Id"}
            value={NId}
            setValue={setNId}
            placeholder={"Enter your national Id"}
          />
          <CustomInputField
            label={"Phone"}
            value={phone}
            setValue={setPhone}
            placeholder={"Enter your phone"}
          />
          <CustomInputField
            label={"Job Title"}
            value={title}
            setValue={setTitle}
            placeholder={"Enter your job Title"}
          />

          {/* //'-------------------------------------- */}
          <Text style={styles.inputTitle}>Skills Required</Text>

          <View style={styles.inputContainer}>
            <Dropdown
              data={skillsEnum}
              placeholder={"Select Skill"}
              labelField="label"
              valueField="value"
              value="Add skills"
              placeholderStyle={{ color: theme.colors.ternaryDark }}
              selectedTextStyle={{ color: theme.colors.secondaryGray }}
              searchPlaceholderTextColor={theme.colors.ternaryDark}
              onChange={(item) => {
                const selectedSkill = item.value;
                if (skills.find((skill) => selectedSkill == skill)) {
                  setAlert(true);
                  setAlertMessage(
                    `The skill "${selectedSkill}" is already selected. Please choose a different skill.`
                  );
                } else {
                  setSkills((prev) => [...prev, selectedSkill]);
                }
              }}
              search
              searchPlaceholder="Type to filter skills"
              style={styles.dropdown}
              maxHeight={200}
            />
          </View>
          <View style={styles.skillsParent}>
            {skills.length > 0 && (
              <View style={styles.inputContainer}>
                <View style={styles.skillsItemsContainer}>
                  {skills.map((skill, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: theme.colors.primaryDark,
                        padding: 7,
                        borderRadius: 10,
                        margin: 5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <Text style={{ color: "white", marginRight: 5 }}>
                        {skill}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          const selectedSkill = skill;
                          setSkills((prevSkills) =>
                            prevSkills.filter(
                              (skill) => selectedSkill !== skill
                            )
                          );
                        }}>
                        <Icon name="times" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.input}
            placeholder="enter your bio..."
            value={Bio}
            onChangeText={setBio}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={theme.colors.ternaryDark}
            textColor={theme.colors.secondaryGray}
          />
          <View style={{ marginHorizontal: 30 }}>
            <AppButton
              buttonTitle={"Update"}
              onPress={handleUpdate}
              loading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
      <CustomeSnackBar
        visible={alert}
        alertMessage={alertMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText="Undo"
        undoColor={theme.colors.secondaryDark}
        bgColor={isSuccess ? theme.colors.success : theme.colors.danger}
        messageColor={theme.colors.white}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
    padding: 30,
    justifyContent: "center",
  },
  input: {
    backgroundColor: theme.colors.ternaryLight,
    borderRadius: theme.borderRadius,
    padding: 10,
    color: theme.colors.ternaryDark,
    textAlignVertical: "top",
    borderColor: theme.colors.ternaryLight,
  },
  label: {
    color: theme.colors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  snackbarStyle: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  inputTitle: {
    color: theme.colors.white,
    marginBottom: 5,
  },
  skillsParent: {
    padding: 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "white",
    borderStyle: "solid",
    marginBottom: 15,
  },
  inputContainer: {
    // marginBottom: 15,
    // backgroundColor: "red",
  },
  dropdown: {
    backgroundColor: theme.colors.ternaryLight,
    borderRadius: 5,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 2,
    padding: 10,
    color: theme.colors.ternaryDark,
  },
  skillsItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
