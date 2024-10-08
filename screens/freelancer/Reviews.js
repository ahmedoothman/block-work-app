import React, { useEffect, Dimensions, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ReviewBox from "../../components/reviews/ReviewBox";
import theme from "../../theme";
import { getReviewsService } from "../../services/reviewService";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import NoDataBox from "../../components/NoData/NoDataBox";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// const { height } = Dimensions.get('window');
const Reviews = ({ route }) => {
  const { userId, isMe, user } = route.params;
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handleNoDataBtn = () => {
    navigation.goBack();
  };

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const response = await getReviewsService(userId);
  //     if (response.status === "success") {
  //       setReviews(response.data);
  //     } else {
  //       setError(true);
  //       setErrorMessage(response.message);
  //       setVisible(true);
  //       setReviews([]);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchReviews();
  // }, []);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    const response = await getReviewsService(userId);
    if (response.status === "success") {
      setReviews(response.data);
    } else {
      setError(true);
      setErrorMessage(response.message);
      setVisible(true);
      setReviews([]);
    }
    setIsLoading(false);
  }, [userId]);

  // Use useFocusEffect to refetch reviews when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, [fetchReviews])
  );

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      {isMe == false && (
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

      <ScrollView style={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : reviews.length ? (
          reviews.map((review, i) => (
            <ReviewBox
              key={i}
              rating={review.rating}
              name={review.reviewer.name}
              photourl={review.reviewer.userPhotoUrl}
              comment={review.comment}
            />
          ))
        ) : (
          <NoDataBox
            Title={"No reviews found"}
            Onpress={handleNoDataBtn}
            Massage={" clients reviews will appear here"}
            btnTitle={"Back to Profile"}
            show={true}
          />
        )}
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbarStyle}>
        {errorMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    position: "relative",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //  height: height * 0.6, // More dynamic height
  },
  snackbarStyle: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  leaveReviewContainer: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    padding: 15,
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

export default Reviews;
