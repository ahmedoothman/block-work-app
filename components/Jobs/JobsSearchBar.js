import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import theme from "../../theme";

export default function JobsSearchBar() {
  return (
    <View style={styles.asembler}>
      <View style={styles.Main}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs"
          placeholderTextColor={theme.colors.secondaryBright}
          placeholderStyle={{ marginLeft: 10 }}
        ></TextInput>

        <AntDesign
          name="search1"
          size={20}
          style={styles.searchIconTextBox}
        ></AntDesign>
      </View>
      <View style={styles.buttonP}>
        <TouchableOpacity>
          <AntDesign
            name="search1"
            size={25}
            style={styles.iconLeft}
          ></AntDesign>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  asembler: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },

  Main: {
    backgroundColor: theme.colors.white,
    width: 266,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 10,
  },

  searchInput: {
    marginLeft: 10,
    marginTop: 5,
    paddingLeft: 34,
    fontSize: 15.5,
  },
  searchIconTextBox: {
    position: "absolute",
    top: 9,
    left: 14,
    color: theme.colors.secondaryDark,
  },

  buttonP: {
    height: 38,
    width: 39.2,
    backgroundColor: theme.colors.primaryDark,
    borderWidth: 1,
    borderColor: theme.colors.primaryDark,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  iconLeft: {
    marginRight: 2,
    color: theme.colors.white,
  },

 
});
