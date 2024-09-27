import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/freelancer/Profile";
import Balance from "../screens/freelancer/Balance";
import Settings from "../screens/freelancer/Settings";
import DrawerContent from "./DrawerContent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        // statusBarColor: "#0163d2",
        // statusBarColor: "#0163d2",

        headerStyle: {
          // backgroundColor: "#0163d2",
          backgroundColor: "#1E1E1E",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={30}
              style={{ marginRight: 15 }}
              color="#fff"
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 5 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 5 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 5 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#1E1E1E",
        },
      }}
      initialRouteName="Profile"
    >
      <Drawer.Screen name="Profile" component={StackNav} />
      {/* <Drawer.Screen name="Balance" component={StackNav} />
      <Drawer.Screen name="Settings" component={StackNav} /> */}
    </Drawer.Navigator>
  );
};

export default function DrawerNavigator() {
  return <DrawerNav />;
}
