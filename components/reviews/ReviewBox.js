import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import useTheme from "../../hooks/useTheme";
import starImgFilled from "../../assets/images/star_filled.png";
import starImgCorner from "../../assets/images/star_corner.png";

const ReviewBox = ({ photourl, name, rating, comment }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const rate = Number(rating);

  const [userRate, setUserRate] = useState(rate);
  const maxRating = [1, 2, 3, 4, 5];
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((num, key) => {
          return (
            <Image
              key={key}
              style={styles.starImgStyle}
              source={num <= userRate ? starImgFilled : starImgCorner}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.RowView}>
          <Avatar.Image size={40} source={{ uri: photourl }} />
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.primaryBright,
              marginHorizontal: 5,
              fontSize: 18,
            }}>
            {name}
          </Text>
        </View>
        <View style={styles.row2View}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.ternaryLight }}>
            {comment}
          </Text>
        </View>
        <View>
          <View style={styles.starsBox}>
            <CustomRatingBar />
            <Text style={styles.rateText}>
              {rating + " / " + maxRating.length}
            </Text>
            {/* {Array.from({ length: rate }).map((_, index) => (
              <AntDesign
                key={index}
                name="star"
                size={17}
                color={theme.colors.warning}
              />
            ))} */}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondaryGray,
      borderRadius: 20,
      margin: 8,
    },
    RowView: {
      flexDirection: "row",
    },
    row2View: {
      flexDirection: "row",
      // justifyContent:'space-between',
      margin: 5,
      flexWrap: "wrap",
    },
    starsBox: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 5,
      padding: 2,
    },
    customRatingBarStyle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    rateText: {
      color: theme.colors.white,
      fontSize: 12,
      fontWeight: "regular",
    },
    starImgStyle: {
      width: 15,
      height: 15,
      resizeMode: "cover",
      marginHorizontal: 3,
    },
  });

export default ReviewBox;
