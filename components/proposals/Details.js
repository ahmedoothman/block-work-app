import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import useTheme from "../../hooks/useTheme";
import { calcDuration } from "../../utils";
import AppButton from "../btns/AppButton";
import { updateProposalStatusService } from "../../services/proposalService";
import CustomeSnackBar from "../Public/CustomeSnackBar";
import { useNavigation } from "@react-navigation/native";
import UserBox from "../UserBox/UserBox";

const Details = ({ proposal, date, isClient }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const onDismissSnackBar = () => setAlert(false);
  const navigation = useNavigation();

  const estimatedPayment = (num) => {
    let decrease = num * 0.1;
    let results = num - decrease;
    return results;
  };

  const manageProposalStatus = async (proposalId, status) => {
    setIsLoading(true); // Show loading indicator
    const response = await updateProposalStatusService(proposalId, status);
    setIsLoading(false); // Hide loading indicator after response
    setAlert(true);
    if (response.status === "success") {
      setIsSuccess(true);
      setAlertMessage("Proposal's status has been updated successfully.");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          Your proposed terms
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          Proposed Amount: ${proposal?.proposedAmount || "N/A"}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Duration {calcDuration(proposal?.duration || 0)}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Cover letter
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          {proposal?.coverLetter || "No cover letter provided."}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          You’ll receive
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          The estimated payment, after service fees.
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          ${estimatedPayment(proposal?.proposedAmount || 0)}
        </Text>
        <Divider style={styles.Divider} />
        <Text variant="titleLarge" style={styles.title}>
          Jobs details
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          {proposal?.jobPost?.title || "Job title not available"}
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          Category: {proposal?.jobPost?.category || "N/A"}
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          Posted {date || "N/A"}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Description:
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          {proposal?.jobPost?.description || "No description available"}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Required skills
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          {proposal?.jobPost?.skillsRequired
            ? `(${proposal.jobPost.skillsRequired[0] || "N/A"}, ${
                proposal.jobPost.skillsRequired[1] || "N/A"
              })`
            : "No skills required listed."}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Duration {calcDuration(proposal?.jobPost?.duration || 0)}
        </Text>
        <Text variant="titleMedium" style={styles.data}>
          Client’s budget: ${proposal?.jobPost?.budget || "N/A"}
        </Text>
      </Card.Content>

      {isClient && (
        <>
          <UserBox otherUser={proposal?.freelancer} />
          {isLoading && (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          )}
          <View style={styles.BtnStatusContainer}>
            {proposal?.status === "submitted" ? (
              <>
                <AppButton
                  buttonTitle="Accept"
                  onPress={() =>
                    manageProposalStatus(proposal?._id, "accepted")
                  }
                  btnWidth="40%"
                  marginBottom={1}
                  marginX="auto"
                  paddingY={10}
                  paddingX={10}
                  disabled={isLoading} // Disable button during loading
                />
                <AppButton
                  buttonTitle="Reject"
                  onPress={() =>
                    manageProposalStatus(proposal?._id, "rejected")
                  }
                  btnWidth="40%"
                  marginBottom={1}
                  marginX="auto"
                  paddingY={10}
                  paddingX={10}
                  disabled={isLoading} // Disable button during loading
                />
              </>
            ) : proposal?.status === "accepted" ? (
              <AppButton
                buttonTitle="Reject"
                onPress={() => manageProposalStatus(proposal?._id, "rejected")}
                btnWidth="40%"
                marginBottom={1}
                marginX="auto"
                paddingY={10}
                paddingX={10}
                disabled={isLoading} // Disable button during loading
              />
            ) : (
              <AppButton
                buttonTitle="Accept"
                onPress={() => manageProposalStatus(proposal?._id, "accepted")}
                btnWidth="40%"
                marginBottom={1}
                marginX="auto"
                paddingY={10}
                paddingX={10}
                disabled={isLoading} // Disable button during loading
              />
            )}
          </View>

          <CustomeSnackBar
            visible={alert}
            alertMessage={alertMessage}
            onDismissSnackBar={onDismissSnackBar}
            undoText="Undo"
            undoColor="black"
            bgColor={isSuccess ? theme.colors.success : theme.colors.danger}
            messageColor="#fff"
          />
        </>
      )}
    </Card>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.secondaryGray,
      borderRadius: theme.borderRadius,
      margin: 10,
      paddingVertical: 10,
      paddingBottom: 20,
    },
    title: {
      color: theme.colors.ternaryLight,
      marginVertical: 5,
    },
    data: {
      color: theme.colors.ternaryDark,
    },
    Divider: {
      marginVertical: 10,
    },
    BtnStatusContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginVertical: 10,
    },
  });

export default Details;
