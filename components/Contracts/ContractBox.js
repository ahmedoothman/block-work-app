import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import theme from "../../theme";

const ContractBox = ({ onPress, contractTitle }) => {
  return (
    <View style={styles.headertitleContainer}>
      <Text style={styles.headertitle}>{contractTitle}</Text>
      <TouchableOpacity style={styles.imagecontainer} onPress={onPress}>
        <Image
          source={require("../../assets/images/Frame.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headertitleContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    padding: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headertitle: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "regular",
  },
  imagecontainer: {
    backgroundColor: theme.colors.primaryDark,
    color: "red",
    width: 38,
    height: 38,
    padding: 5,
    borderRadius: theme.borderRadius,
  },
});

export default ContractBox;
