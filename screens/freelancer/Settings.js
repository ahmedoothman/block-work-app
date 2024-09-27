import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1E1E1E",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30, color: "white" }}>Settings Page</Text>

      {/* <View style={{ position: "absolute", top: 0, right: 5 }}>
        <Icon name="dots-vertical" size={24} color="white" />
      </View> */}
    </View>
  );
}
