import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../theme";
import { useSelector } from "react-redux";
const UserBox = ({ otherUser, isMe }) => {
  const navigation = useNavigation();
  const viewFreelancerProfile = () => {
    navigation.navigate("ProfileView", {
      id: otherUser?._id,
      isMe,
    });
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.freelanceContainer}>
      <TouchableOpacity onPress={viewFreelancerProfile}>
        <View style={styles.userImage}>
          <Image
            source={{
              uri: otherUser?.userPhotoUrl || "",
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
            }}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.userName}>
        {otherUser?.name || "Unknown Freelancer"}
      </Text>

      {!isMe && (
        <MaterialCommunityIcons
          name="chat-processing"
          size={30}
          color={theme.colors.ternaryDark}
          style={{ marginRight: 0 }}
          onPress={() => {
            navigation.navigate("ChatScreen", {
              userId: user._id,
              otherUser,
            });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  freelanceContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  userName: {
    fontSize: 15,
    color: theme.colors.ternaryDark,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.ternaryDark,
    overflow: "hidden",
  },
});
export default UserBox;
