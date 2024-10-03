import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import theme from "../../theme";
import { calcDuration } from "../../utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppButton from "../btns/AppButton";
import {
  updateProposalService,
  updateProposalStatusService,
} from "../../services/proposalService";
import CustomeSnackBar from "../Public/CustomeSnackBar";
import { useNavigation } from "@react-navigation/native";

const Details = ({ proposal, date, isClient, jobDetails }) => {
  const [loading, setLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

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

  console.log("proposal", proposal);
  console.log("jobDetails", jobDetails);

  const handlePress = async (
    proposalId,
    status,
    acceptLoading,
    rejectLoading
  ) => {
    const proposalStatus = { status: status };
    if (acceptLoading) {
      setAcceptLoading(true);
      setRejectLoading(false);
    } else {
      setAcceptLoading(false);
      setRejectLoading(true);
    }
    const response = await updateProposalService(proposalId, proposalStatus);
    setAlert(true);
    if (response.status == "success") {
      console.log("response.data==> ", response);
      setIsSuccess(true);
      setAlertMessage(response.data);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      console.log("Error response.data==> ", response);
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setAcceptLoading(false);
    setRejectLoading(false);
  };

  return (
    <Card style={styles.card}>
      {isClient ? (
        <Card.Content>
          <Text variant="titleLarge" style={styles.detailsHeadTitle}>
            Your proposed terms
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.detailsData, { marginVertical: 10 }]}>
            proposed Amount: ${proposal.proposedAmount}
          </Text>
          <Text variant="titleMedium" style={styles.detailsData}>
            How do you want to be paid?
          </Text>
          <Text variant="titleMedium" style={styles.detailsSubData}>
            By project
          </Text>
          <View style={{ marginVertical: 15 }}>
            <Text variant="titleMedium" style={styles.detailsData}>
              You’ll receive
            </Text>
            <Text variant="titleMedium" style={styles.detailsSubData}>
              The estimated payment, after service fees: $
              {estimatedPayment(proposal.proposedAmount)}
            </Text>
          </View>
          <Divider style={styles.Divider} />
          <Text variant="titleLarge" style={styles.detailsHeadTitle}>
            Jobs details
          </Text>
          <Text variant="titleMedium" style={styles.detailsData}>
            {jobDetails.description}
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.detailsSubData, { marginLeft: 10 }]}>
            {jobDetails.category}
          </Text>
          <Text variant="titleMedium" style={styles.detailsSubData}>
            {/* Posted {calcDuration(jobDetails.duration)} */}
            Posted {date}
          </Text>
          {/* <Text variant="titleMedium" style={styles.title}>
            Cover letter
          </Text> */}
          {/* <Text variant="titleMedium" style={styles.data}>
            {proposal.coverLetter}
          </Text> */}
          <Text variant="titleMedium" style={styles.title}>
            Only new freelancers
          </Text>
          <View style={styles.freelanceContainer}>
            <View style={styles.userImage}>
              <Image
                source={{
                  uri: proposal.freelancer.userPhotoUrl,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                }}
              />
            </View>
            <Text style={styles.userName}>{proposal.freelancer.name}</Text>

            <MaterialCommunityIcons
              name="chat-processing"
              size={30}
              color={theme.colors.ternaryDark}
              style={{ marginRight: 0 }}
              onPress={() => {
                console.log("got to chat");
                navigation.navigate("ChatScreen", {
                  userId: proposal.freelancer._id,
                  fromUser: proposal.freelancer,
                });
              }}
            />
          </View>
          <View style={styles.BtnStatusContainer}>
            {proposal.status == "submitted" ? (
              <>
                <AppButton
                  buttonTitle={"Accept"}
                  onPress={() => {
                    const acceptLoading = true;
                    const rejectLoading = false;
                    handlePress(
                      proposal._id,
                      proposal.status,
                      acceptLoading,
                      rejectLoading
                    );
                  }}
                  loading={acceptLoading}
                  btnWidth={"40%"}
                  marginBottom={1}
                  marginX={"auto"}
                  paddingY={10}
                  paddingX={10}
                />
                <AppButton
                  buttonTitle={"Reject"}
                  onPress={() => {
                    const acceptLoading = false;
                    const rejectLoading = true;
                    handlePress(
                      proposal._id,
                      proposal.status,
                      acceptLoading,
                      rejectLoading
                    );
                  }}
                  loading={rejectLoading}
                  btnWidth={"40%"}
                  marginBottom={1}
                  marginX={"auto"}
                  paddingY={10}
                  paddingX={10}
                />
              </>
            ) : proposal.status == "accepted" ? (
              <AppButton
                buttonTitle={"Reject"}
                onPress={() => {
                  const acceptLoading = false;
                  const rejectLoading = true;
                  handlePress(
                    proposal._id,
                    proposal.status,
                    acceptLoading,
                    rejectLoading
                  );
                }}
                loading={rejectLoading}
                btnWidth={"40%"}
                marginBottom={1}
                marginX={"auto"}
                paddingY={10}
                paddingX={10}
              />
            ) : (
              <AppButton
                buttonTitle={"Accept"}
                onPress={() => {
                  const acceptLoading = true;
                  const rejectLoading = false;
                  handlePress(
                    proposal._id,
                    proposal.status,
                    acceptLoading,
                    rejectLoading
                  );
                }}
                loading={acceptLoading}
                btnWidth={"40%"}
                marginBottom={1}
                marginX={"auto"}
                paddingY={10}
                paddingX={10}
              />
            )}
          </View>
          <CustomeSnackBar
            visible={alert}
            alertMessage={alertMessage}
            onDismissSnackBar={onDismissSnackBar}
            undoText="Undo"
            undoColor="black"
            bgColor={isSuccess ? theme.colors.colorTextBlue : "red"}
            messageColor="#fff"
          />
        </Card.Content>
      ) : (
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Your proposed terms
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            proposed Amount: ${proposal.proposedAmount}
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            Duration {calcDuration(proposal.duration)}
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            Cover letter
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            {proposal.coverLetter}
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            You’ll receive
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            The estimated payment, after service fees.
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            ${estimatedPayment(proposal.proposedAmount)}
          </Text>
          <Divider style={styles.Divider} />
          <Text variant="titleLarge" style={styles.title}>
            Jobs details
          </Text>
          {/* thre is no title in {the jopPost is not object} */}
          <Text variant="titleMedium" style={styles.title}>
            {proposal.jobPost.title}
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            Category: {proposal.jobPost.category}
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            Posted {date}
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            Description:
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            {" "}
            {proposal.jobPost.description}{" "}
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            {" "}
            Required skills
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            ( {proposal.jobPost.skillsRequired[0]},{" "}
            {proposal.jobPost.skillsRequired[1]} )
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            Duration {calcDuration(proposal.jobPost.duration)}
          </Text>
          <Text variant="titleMedium" style={styles.data}>
            Client’s budget: ${proposal.jobPost.budget}
          </Text>
          <Text variant="titleMedium" style={styles.title}>
            Only new freelancers
          </Text>
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
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

  detailsHeadTitle: {
    fontSize: 19,
    fontWeight: "regular",
    color: theme.colors.ternaryLight,
    marginBottom: 10,
  },
  detailsData: {
    color: theme.colors.ternaryLight,
    fontSize: 14,
    fontWeight: "regular",
  },
  detailsSubData: {
    color: theme.colors.ternaryDark,
    fontSize: 12,
    fontWeight: "regular",
  },
  freelanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
    padding: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  userName: {
    fontSize: 14,
    fontWeight: "regular",
    color: theme.colors.white,
  },
  BtnStatusContainer: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Details;
