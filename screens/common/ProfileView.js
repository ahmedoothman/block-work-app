import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../../theme";
import {
  Avatar,
  Icon,
  Snackbar,
  Text,
  IconButton,
  Divider,
} from "react-native-paper";
import RoundedBox from "../../components/profile/RoundedBox";
import CustomBtn from "../../components/profile/CustomBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserService } from "../../services/userService";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const { height } = Dimensions.get("window");
const onDismissSnackBar = () => setVisible(false);
const ProfileView = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  // Get id and role from route params
  const { id, isMe } = route.params;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserService(id);
      if (response.status === "success") {
        setUser(response.data);
      } else {
        setError(true);
        setErrorMessage(response.message);
        setVisible(true);
      }
    };
    fetchUser();
  }, []);

  const handlePortofolio = () => {
    navigation.navigate("Portofolio", {
      userId: id,
    });
  };

  const handleReviews = () => {
    navigation.navigate("Reviews", {
      userId: id,
      isMe,
      user,
    });
  };

  return (
    <>
      <View style={styles.container}>
        {user !== null ? (
          <>
            <View>
              <View style={styles.avtarView}>
                <View style={styles.avtarView}>
                  <Avatar.Image size={70} source={{ uri: user.userPhotoUrl }} />
                  <View style={{ justifyContent: "space-between", margin: 10 }}>
                    <Text
                      variant="titleLarge"
                      style={[styles.title, { width: 250 }]}>
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
              </View>
              <Divider style={styles.divider} />
              <View style={styles.bioView}>
                <Text variant="titleLarge" style={styles.title}>
                  {user.jobTitle ? user.jobTitle : "No job title"}
                </Text>
                <Text variant="titleMedium" style={styles.title}>
                  {"\n"}
                  {user.bio
                    ? user.bio.charAt(0).toUpperCase() + user.bio.slice(1)
                    : "No bio"}
                </Text>
              </View>
              <Divider style={styles.divider} />
              {user.role === "freelancer" && (
                <View style={styles.bioView}>
                  <Text variant="titleLarge" style={styles.title}>
                    {" "}
                    Skills:{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 5,
                      flexWrap: "wrap",
                    }}>
                    {user.skills.map((s, index) => (
                      <RoundedBox key={index} txt={s} />
                    ))}
                  </View>
                </View>
              )}
              <View>
                {user.role === "freelancer" && (
                  <CustomBtn
                    txt={"Portofolio"}
                    handlePress={handlePortofolio}
                  />
                )}
                <View style={styles.reviewContainer}>
                  <CustomBtn
                    txt={"Reviews"}
                    marginBottom={"0"}
                    handlePress={handleReviews}
                  />
                  {!isMe && (
                    <View style={styles.leaveReviewContainer}>
                      <TouchableOpacity
                        style={styles.createReviews}
                        onPress={() => {
                          navigation.navigate("ReviewForm", {
                            user: user,
                            isMe,
                          });
                        }}>
                        {/* <Ionicon name="pencil-outline" size={20} color="#fff" /> */}
                        <MaterialIcons
                          name="rate-review"
                          size={22}
                          color={theme.colors.white}
                        />
                      </TouchableOpacity>
                      <Text style={styles.btnText}> Leave a Review</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              style={styles.snackbarStyle}>
              {errorMessage}
            </Snackbar>
          </>
        ) : (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
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
    color: theme.colors.ternaryLight,
  },
  divider: {
    backgroundColor: theme.colors.secondaryBright,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  bioView: {
    margin: 10,
  },
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  leaveReviewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  createReviews: {
    backgroundColor: theme.colors.primaryDark,
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 12,
    color: theme.colors.white,
  },
});
