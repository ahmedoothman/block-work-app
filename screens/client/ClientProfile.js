import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme";
import {
  Avatar,
  Icon,
  Snackbar,
  Text,
  IconButton,
  Divider,
} from "react-native-paper";

import CustomBtn from "../../components/profile/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const { height } = Dimensions.get("window");
const onDismissSnackBar = () => setVisible(false);

const Profile = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const handleReviews = () => {
    navigation.navigate("Reviews", {
      userId: user._id,
    });
  };
  const handleUpdate = () => {
    navigation.navigate("ClientUpdateProfile", {
      userdata: user,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.avtarView}>
            <View style={styles.avtarView}>
              <Avatar.Image size={70} source={{ uri: user.userPhotoUrl }} />
              <View style={{ justifyContent: "space-between", margin: 10 }}>
                <Text
                  variant="titleLarge"
                  style={[styles.title, { width: 190 }]}>
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    source="map-marker-outline"
                    color={theme.colors.ternaryDark}
                    size={25}
                  />
                  <Text
                    variant="titleSmall"
                    style={{ color: theme.colors.ternaryDark }}>
                    {user.country.charAt(0).toUpperCase() +
                      user.country.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
            <IconButton
              icon={"account-edit-outline"}
              size={35}
              iconColor={theme.colors.primaryBright}
              onPress={handleUpdate}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.bioView}>
            <Text variant="titleLarge" style={styles.title}>
              {user.jobTitle ? user.jobTitle : "No job title"}
            </Text>
            <Text variant="titleMedium" style={styles.title}>
              {user.bio
                ? user.bio.charAt(0).toUpperCase() + user.bio.slice(1)
                : "No bio"}
            </Text>
          </View>
          <Divider style={styles.divider} />

          <View>
            <CustomBtn txt={"Reviews"} handlePress={handleReviews} />
          </View>
        </View>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={styles.snackbarStyle}>
          {errorMessage}
        </Snackbar>
      </View>
    </>
  );
};

export default Profile;
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
    },
    avtarView: {
      flexDirection: "row",
      margin: 5,
      justifyContent: "space-between",
    },
    loadingIndicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: height * 0.6, // More dynamic height
    },
    snackbarStyle: {
      backgroundColor: theme.colors.danger,
      borderRadius: theme.borderRadius,
      position: "absolute",
      bottom: 10,
      left: 10,
      right: 10,
    },
    title: {
      color: theme.colors.white,
      // margin:5,
    },
    divider: {
      backgroundColor: theme.colors.secondaryBright,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    bioView: {
      margin: 10,
    },
  });
