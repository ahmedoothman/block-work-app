import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", justifyContent: "center", alignItems: "center" }}>
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ fontSize: 30, color: "white" }}>Profile Page</Text>
    </View>
  </View>
  );
};

export default Profile;
