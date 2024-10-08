import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import theme from "../../theme";

const ReviewBox = ({ photourl, name, rating, comment }) => {
  const rate = Number(rating);
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
            {Array.from({ length: rate }).map((_, index) => (
              <AntDesign
                key={index}
                name="star"
                size={17}
                color={theme.colors.warning}
              />
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default ReviewBox;
