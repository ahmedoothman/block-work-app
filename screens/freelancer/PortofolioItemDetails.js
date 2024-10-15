import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { deletePortfolioService } from "../../services/portofolioService";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

export default function PortofolioItemDetails({ route }) {
  const theme = useTheme();
  const styles = createStyles(theme);
  let { item, checkFreelancerRole } = route.params;
  const { title, description, files, _id } = item;
  const [portfolioItem, setPortfolioItem] = useState(item);

  const isEdit = true;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onDismissSnackBar = () => setVisible(false);

  const handleDeletePortoflioItem = async () => {
    setIsLoading(true);
    const response = await deletePortfolioService(_id);
    if (response.status === "success") {
      setVisible(true);
      setMessageType("success");
      setMessage("Portfolio item is deleted successfully");
      setPortfolioItem(null);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setVisible(true);
      setMessageType("error");
      setMessage(response.message);
    }
    setIsLoading(false);
  };

  const position = Animated.divide(scrollX, width);

  return (
    <View style={styles.container}>
      {/* Title and Image View */}
      {portfolioItem ? (
        <>
          <View style={styles.imageGroup}>
            <Text style={styles.label}>{title}</Text>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}>
              {files.map((uri, i) => (
                <View key={i} style={styles.imageContainer}>
                  <Image source={{ uri: uri }} style={styles.image} />
                </View>
              ))}
            </Animated.ScrollView>
          </View>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {files.map((_, i) => {
              const dotScale = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.8, 1.5, 0.8],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={i}
                  style={[styles.dot, { transform: [{ scale: dotScale }] }]}
                />
              );
            })}
          </View>

          {/* Description View */}
          <View style={styles.descriptionGroup}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/* Edit and Delete buttons */}
          {checkFreelancerRole && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("CreatePortofolio", {
                    isEdit,
                    screenTitle: "Update Portofolio",
                    _id,
                    item,
                  });
                }}
                activeOpacity={0.7}>
                <Text style={styles.buttonText}>
                  <AntDesign
                    name="edit"
                    size={18}
                    color={theme.colors.white}
                    style={styles.icon}
                  />{" "}
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleDeletePortoflioItem}>
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.white} />
                ) : (
                  <Text style={styles.buttonText}>
                    <AntDesign
                      name="delete"
                      size={18}
                      color={theme.colors.white}
                      style={styles.icon}
                    />{" "}
                    Delete
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={styles.folderContainer}>
          <Image
            source={require("../../assets/images/blueEmpty.webp")}
            style={styles.folderImage}
          />
          <Text style={styles.noItemMessage}>
            This portfolio item has been deleted.
          </Text>
        </View>
      )}

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={[
          styles.snackbar,
          {
            backgroundColor:
              messageType === "success"
                ? theme.colors.success
                : theme.colors.danger,
          },
        ]}>
        <Text style={styles.snackbarText}>{message}</Text>
      </Snackbar>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      padding: 10,
      position: "relative",
    },
    imageGroup: {
      marginVertical: 20,
      alignItems: "center",
    },
    label: {
      color: theme.colors.white,
      fontSize: 20,
      marginBottom: 10,
      alignSelf: "center",
    },
    imageContainer: {
      width: width * 0.9,
      marginRight: 10,
    },
    image: {
      width: "100%",
      height: width * 0.5,
      borderRadius: 10,
      alignSelf: "center",
    },
    dotsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 10,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      // backgroundColor: "white",
      backgroundColor: theme.colors.primaryBright,
      marginHorizontal: 5,
    },
    description: {
      color: theme.colors.ternaryDark,
      fontSize: 16,
      textAlign: "justify",
    },
    descriptionGroup: {
      marginVertical: 20,
      alignItems: "center",
    },
    folderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.colors.secondaryDark,
      borderRadius: 10,
      marginVertical: 20,
    },
    folderImage: {
      width: 100,
      height: 100,
      marginBottom: 15,
      // tintColor: theme.colors.primaryBright,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginVertical: 40,
    },
    button: {
      backgroundColor: theme.colors.colorTextBlue,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: "bold",
      fontSize: 15,
    },
    icon: {
      alignSelf: "center",
    },
    snackbar: {
      borderRadius: 8,
      position: "absolute",
      bottom: 5,
    },
    snackbarText: {
      color: theme.colors.white,
    },
    noItemMessage: {
      color: theme.colors.white,
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },
  });
