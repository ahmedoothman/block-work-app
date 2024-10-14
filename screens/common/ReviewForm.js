import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import theme from "../../theme";
import starImgFilled from "../../assets/images/star_filled.png";
import starImgCorner from "../../assets/images/star_corner.png";
import InputField from "../../components/inputs/auth/InputField";
import AppButton from "../../components/btns/AppButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserBox from "../../components/UserBox/UserBox";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomeSnackBar from "../../components/Public/CustomeSnackBar";
import { addReviewService } from "../../services/reviewService";
import { getUserService } from "../../services/userService";
const ReviewForm = () => {
  const navigation = useNavigation();
  const { userId, isMe } = useRoute().params;
  const [user, setUser] = useState({
    name: "",
    userPhotoUrl:
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account",
  });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const commentMaxLength = 200;
  const maxRating = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserService(userId);
      if (response.status === "success") {
        setUser(response.data);
      }
    };
    fetchUser();
  }, []);

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={key}
              onPress={() => setRating(item)}>
              <Image
                style={styles.starImgStyle}
                source={item <= rating ? starImgFilled : starImgCorner}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onDismissSnackBar = () => setAlert(false);

  const submitReview = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    const review = {
      reviewee: user._id,
      comment: comment,
      rating: rating,
    };
    const response = await addReviewService(review);
    setAlert(true);
    if (response.status == "success") {
      setIsSuccess(true);
      setAlertMessage("Review Added Successfully");
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setLoading(false);
    clearInputs();
  };

  function clearInputs() {
    setRating(0);
    setComment("");
  }

  const validateInputs = () => {
    setAlert(false);
    setAlertMessage("");
    if (rating <= 0 || rating > 5) {
      setAlert(true);
      setAlertMessage("Please provide a rating between 1 and 5.");
      setLoading(false);
      return false;
    }
    if (!comment.trim()) {
      setAlert(true);
      setAlertMessage("Comment cannot be empty.");
      setLoading(false);
      return false;
    }

    if (comment.trim().length < 4) {
      setAlert(true);
      setAlertMessage("Comment must be at least 4 characters long.");
      setLoading(false);
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.headerTitle}>Add Review</Text>

        <UserBox otherUser={user} isMe={isMe} />

        <View style={styles.formContainer}>
          <View style={styles.rateContainer}>
            <Text style={styles.inputTitle}>Rate</Text>
            <View style={styles.ratingBarContainer}>
              <CustomRatingBar />
              <Text style={styles.rateText}>
                {rating + " / " + maxRating.length}
              </Text>
            </View>
          </View>

          <View style={styles.commentContainer}>
            <Text style={styles.inputTitle}>Comment</Text>
            <TextInput
              value={comment}
              onChangeText={(value) => {
                if (value.length > commentMaxLength) {
                  setAlert(true);
                  setIsSuccess(false);
                  setAlertMessage(
                    `Maximum character limit is ${commentMaxLength}.`
                  );
                } else {
                  setAlert(false);
                  setComment(value);
                }
              }}
              placeholder={"Leave a comment"}
              style={styles.textInput}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={"top"}
              placeholderTextColor={theme.colors.ternaryDark}
            />
            <Text style={styles.charCount}>
              {comment.length}/{commentMaxLength}
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <AppButton
              buttonTitle={"Submit Review"}
              onPress={() => {
                submitReview();
              }}
              loading={loading}
              bgColor={theme.colors.primaryDark}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    padding: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 15,
    width: "95%",
    marginHorizontal: "auto",
  },
  rateContainer: {
    marginVertical: 15,
  },
  inputTitle: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "regular",
    marginLeft: 5,
    paddingVertical: 10,
  },
  ratingBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },

  rateText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "regular",
  },
  customRatingBarStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginHorizontal: 5,
  },

  commentContainer: {
    marginVertical: 15,
    position: "relative",
  },
  textInput: {
    padding: 10,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.white,
    color: theme.colors.secondaryGray,
    height: 180,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: "regular",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  charCount: {
    position: "absolute",
    right: 10,
    bottom: 5,
    color: theme.colors.secondaryGray,
    fontSize: 12,
  },
});

export default ReviewForm;
