import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { submitProposalService } from "../../services/proposalService";
import { ActivityIndicator, Snackbar } from "react-native-paper";

const ProposalsForm = ({ route }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { jobData, postingTimeOfJob } = route.params;
  const { category, description, title, _id } = jobData;

  const navigation = useNavigation();
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedAmount, setProposedAmount] = useState("");
  const [duration, setDuration] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messageType, setMessageType] = useState(""); // success or error
  const [message, setMessage] = useState("");

  const onDismissSnackBar = () => setVisible(false);
  const feesRate = 0.05;
  const ServiceFee = Math.round(proposedAmount * feesRate);
  const AmountReceived = proposedAmount - ServiceFee;

  const handleApplyBtn = async () => {
    if (!coverLetter || !proposedAmount || !duration) {
      setVisible(true);
      setMessageType("error");
      setMessage("All fields are required");
      return;
    }
    const data = {
      coverLetter,
      proposedAmount: +proposedAmount,
      duration: +duration,
    };

    setIsLoading(true);
    const response = await submitProposalService(_id, data);
    if (response.status === "success") {
      setVisible(true);
      setMessageType("success");
      setMessage("Proposal submitted successfully");
      handleResetForm();
      setTimeout(() => {
        navigation.navigate("FreelancerBase");
      }, 2000);
    } else {
      setVisible(true);
      setMessageType("error");
      setMessage(response.message);
    }
    setIsLoading(false);
  };

  function handleResetForm() {
    setCoverLetter("");
    setProposedAmount("");
    setDuration("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.jobBox}>
        <Text style={styles.title}>Job details</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.skillsBox}>
          <Text style={styles.skill}>{category}</Text>
          <Text style={styles.postingTime}>Posted {postingTimeOfJob}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            What is the full amount you’d like to bid for this job?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="$50.0"
            value={proposedAmount}
            onChangeText={setProposedAmount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.feeGroup}>
          <Text style={styles.label}>5% Freelancer Service Fee</Text>
          <Text style={styles.fee}>-${ServiceFee || 50 * feesRate}</Text>
        </View>
        <View style={styles.feeGroup}>
          <Text style={styles.label}>You’ll Receive</Text>
          <Text style={styles.fee}>
            ${AmountReceived || 50 * (feesRate - 1)}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>How long will this project take?</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cover Letter</Text>
          <TextInput
            style={styles.coverLetterInput}
            multiline
            value={coverLetter}
            onChangeText={setCoverLetter}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleApplyBtn}>
          {isLoading ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.buttonText}>Apply Now</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={[
          styles.snackbar,
          {
            backgroundColor:
              messageType === "success"
                ? theme.colors.success
                : theme.colors.danger,
          },
        ]}>
        <Text style={styles.snackbarText}>{message}</Text>
      </Snackbar>
    </ScrollView>
  );
};

export default ProposalsForm;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme.colors.secondaryDark,
    },
    jobBox: {
      backgroundColor: theme.colors.secondaryGray,
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
    },
    title: {
      color: theme.colors.whiteTitle,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    description: {
      color: theme.colors.ternaryDark,
      fontSize: 14,
      marginTop: 10,
    },
    skillsBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    skill: {
      backgroundColor: theme.colors.secondaryBright,
      padding: 5,
      borderRadius: 8,
      color: theme.colors.ternaryDark,
    },
    postingTime: {
      color: theme.colors.ternaryDark,
    },
    formSection: {
      backgroundColor: theme.colors.secondaryGray,
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
    },

    label: {
      color: theme.colors.whiteTitle,
      fontSize: 14,
      marginBottom: 5,
    },
    input: {
      backgroundColor: theme.colors.thirdBright,
      borderRadius: 8,
      padding: 10,
      color: theme.colors.thirdTernary,
    },
    coverLetterInput: {
      backgroundColor: theme.colors.thirdBright,
      borderRadius: 8,
      padding: 10,
      height: 100,
      textAlignVertical: "top",
      color: theme.colors.thirdTernary,
    },
    feeGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    fee: {
      color: theme.colors.ternaryDark,
      fontSize: 14,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 20,
    },
    button: {
      backgroundColor: theme.colors.colorTextBlue,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: "bold",
      fontSize: 15,
    },
    snackbar: {
      borderRadius: 8,
    },
    snackbarText: {
      color: theme.colors.white,
    },
  });
