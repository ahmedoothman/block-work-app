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
import PasswordSettings from "../screens/common/PasswordSettings";
import Portofolio from "../screens/freelancer/Portofolio";
import UpdateProfile from "../screens/freelancer/UpdateProfile";
import ClientUpdateProfile from "../screens/client/CientUpdateProfile";
import Reviews from "../screens/freelancer/Reviews";
import CreatePortofolio from "../screens/freelancer/CreatePortofolio";
import PortofolioItemDetails from "../screens/freelancer/PortofolioItemDetails";
import ContractDetails from "../screens/freelancer/ContractDetails";
import ProposalsDetails from "../screens/freelancer/ProposalsDetails";
import theme from "../theme";
import CreateJobForm from "../screens/client/CreateJobForm";
import UpdateJobForm from "../screens/client/UpadteJobForm";
import ClientJopDetails from "../screens/client/ClientJopDetails";
import ClientProposals from "../screens/client/ClientProposals";
import ClientProposalsDetails from "../screens/client/ClientProposalsDetails";
import Balance from "../screens/common/Balance";
import ChargeBalance from "../screens/common/ChargeBalance";
import ChargeBalanceDetails from "../screens/common/ChargeBalanceDetails";

import ProfileView from "../screens/common/ProfileView";
import ClientContractDetails from "../screens/client/ClientContractDetails";
import ReviewForm from "../screens/common/ReviewForm";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      {/* //' Auth Screens */}
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
      {/*//' Freelancers Screen */}
      <Stack.Screen
        name="FreelancerBase"
        component={FreelancerBase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobsDetails"
        component={JobsDetails}
        options={{
          title: "Job Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          // headerRight: () => (
          //   <MaterialCommunityIcons
          //     name="dots-vertical"
          //     size={24}
          //     color="white"
          //     style={{ marginRight: 10 }}
          //   />
          // ),
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
         
        }}
      />
      <Stack.Screen
        name="ProposalsDetails"
        component={ProposalsDetails}
        options={{
          title: "Proposal Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />
      <Stack.Screen
        name="ProposalsForm"
        component={ProposalsForm}
        options={{
          title: "Submit Proposal",
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
         
        }}
      />
      <Stack.Screen
        name="CreatePortofolio"
        component={CreatePortofolio}
        options={{
          title: "Create Portofolio",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          title: "Reviews",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: "Update Profile",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />

      <Stack.Screen
        name="ClientUpdateProfile"
        component={ClientUpdateProfile}
        options={{
          title: "Update Profile",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />
      <Stack.Screen
        name="PortofolioItemDetails"
        component={PortofolioItemDetails}
        options={{
          title: "Portofolio Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          
        }}
      />

      {/*//' Client Screen */}
      <Stack.Screen
        name="ClientBase"
        component={ClientBase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientJopDetails"
        component={ClientJopDetails}
        options={{
          title: "Job Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />
      <Stack.Screen
        name="ClientProposals"
        component={ClientProposals}
        options={{
          title: "Job Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />
      <Stack.Screen
        name="ClientProposalsDetails"
        component={ClientProposalsDetails}
        options={{
          title: "Proposals Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />
      <Stack.Screen
        name="CreateJobForm"
        component={CreateJobForm}
        options={{
          title: "Create Job",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />

      <Stack.Screen
        name="UpdateJobForm"
        component={UpdateJobForm}
        options={{
          title: "Update Job",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />

      <Stack.Screen
        name="ClientContractDetails"
        component={ClientContractDetails}
        options={{
          title: "Contracts Details",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          
        }}
      />

      {/*//' Common Screen */}
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "Chats",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          
        }}
      />

      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          title: "Balance",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />

      <Stack.Screen
        name="PasswordSettings"
        component={PasswordSettings}
        options={{
          title: "Change Password",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          
        }}
      />
      <Stack.Screen
        name="ChargeBalance"
        component={ChargeBalance}
        options={{
          title: "Charge Balance",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
         
        }}
      />

      <Stack.Screen
        name="ChargeBalanceDetails"
        component={ChargeBalanceDetails}
        options={{
          title: "Charge Balance Details",
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { fontSize: 15 },
          headerTintColor: "white",
         
        }}
      />

      <Stack.Screen
        name="ProfileView"
        component={ProfileView}
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { fontSize: 15 },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ReviewForm"
        component={ReviewForm}
        options={{
          title: "Review Form",
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { fontSize: 15 },
          headerTintColor: "white",
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
    </Stack.Navigator>
  );
};

export default StackNavigator;
