import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import ProposalBox from "../../components/proposals/ProposalBox";
import theme from "../../theme";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import {
  getAllProposalsService,
  getFreelancerProposalsService,
} from "../../services/proposalService";
const { height } = Dimensions.get("window");
const ClientProposals = ({ route }) => {
  const { jopId, jobDetails } = route.params;

  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [count, setcount] = useState(0);
  const onDismissSnackBar = () => setVisible(false);
  useEffect(() => {
    const fetchProposals = async () => {
      setIsLoading(true);
      const response = await getAllProposalsService(jopId);
      if (response.status === "success") {
        setProposals(response.data);
        setcount(response.data.length); // Update count after fetching proposals
      } else {
        setError(true);
        setErrorMessage(response.message);
        setVisible(true);
      }
      setIsLoading(false);
    };
    fetchProposals();
  }, [jopId]);

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.text}>Proposals({count}) client proposels</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : (
          proposals?.map((proposal) => (
            <ProposalBox
              key={proposal._id}
              PropsalData={proposal}
              isClient={true}
              jobDetails={jobDetails}
            />
          ))
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

export default ClientProposals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
  },
  counter: {
    borderRadius: 20,
    padding: 5,
    margin: 5,
    width: 130,
    backgroundColor: theme.colors.secondaryBright,
  },
  text: {
    color: theme.colors.ternaryDark,
    textAlign: "center",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.6, // More dynamic height
  },
  snackbarStyle: {
    backgroundColor: "#B31312",
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
});
