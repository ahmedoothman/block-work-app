import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Details from "../../components/proposals/Details";
import useTheme from "../../hooks/useTheme";
import { ScrollView } from "react-native-gesture-handler";

const ClientProposalsDetails = ({ route }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const { proposal, date, isClient, jobDetails } = route.params;
  const {
    freelancer: {
      _id: freelancerid,
      name: freelancerName,
      userPhotoUrl: freelancerPhoto,
    },
    status,
    _id: proposelId,
    coverLetter: proposelCoverLetter,
  } = proposal;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Details
          proposal={proposal}
          date={date}
          isClient={isClient}
          jobDetails={jobDetails}
        />
      </ScrollView>
    </View>
  );
};

export default ClientProposalsDetails;
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      position: "relative",
    },
    scrollContainer: {
      flex: 1,
    },
  });
