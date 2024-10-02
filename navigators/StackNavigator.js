import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ResetPasswordScreen from "../screens/auth/ResetPasword";
import FreelancerBase from "../screens/freelancer/FreelancerBase";
import ClientBase from "../screens/client/ClientBase";
import JobsDetails from "../screens/freelancer/JobsDetails";
import ProposalsForm from "../screens/freelancer/ProposalsForm";

import ChatScreen from "../screens/common/ChatScreen";
import Balance from "../screens/common/Balance";
import PasswordSettings from "../screens/common/PasswordSettings";
import Portofolio from "../screens/freelancer/Portofolio";
import CreatePortofolio from "../screens/freelancer/CreatePortofolio";
import PortofolioItemDetails from "../screens/freelancer/PortofolioItemDetails";
import ContractDetails from "../screens/freelancer/ContractDetails";
import ProposalsDetails from "../screens/freelancer/ProposalsDetails";
import theme from "../theme";

import ChargeBalance from "../screens/freelancer/ChargeBalance";
import ChargeBalanceDetails from "../screens/freelancer/ChargeBalanceDetails";


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          title: false,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FreelancerBase"
        component={FreelancerBase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientBase"
        component={ClientBase}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "Chats",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="JobsDetails"
        component={JobsDetails}
        options={{
          title: "Job Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ContractDetails"
        component={ContractDetails}
        options={{
          title: "Contract Details",
          // headerStyle: { backgroundColor: theme.colors.secondaryGray },
          headerStyle: { backgroundColor: "black" },
          headerTintColor: theme.colors.white,
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
              onPress={() => {
                console.log("hi");
              }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ProposalsDetails"
        component={ProposalsDetails}
        options={{
          title: "Proposal Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ProposalsForm"
        component={ProposalsForm}
        options={{
          title: "Submit Proposal",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Alert"
        // component={Alert}
        component={Portofolio}
        options={{
          title: "Alert",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
      {/*pressing on portofoilo button in profile*/}
      <Stack.Screen
        name="Portofolio"
        component={Portofolio}
        options={{
          title: "Portofolio",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreatePortofolio"
        component={CreatePortofolio}
        options={{
          title: "Create Portofolio",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PortofolioItemDetails"
        component={PortofolioItemDetails}
        options={{
          title: "Portofolio Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          title: "Balance",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="PasswordSettings"
        component={PasswordSettings}
        options={{
          title: "Change Password",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name='ChargeBalance'
        component={ChargeBalance}
        options={{
          title: 'Charge Balance',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name='ChargeBalanceDetails'
        component={ChargeBalanceDetails}
        options={{
          title: 'Charge Balance Details',
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { fontSize: 15 },
          headerTintColor: 'white',
          headerRight: () => (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='white'
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
