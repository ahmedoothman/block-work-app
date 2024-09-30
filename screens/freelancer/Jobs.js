import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../../theme";
import JobsSearchBar from "../../components/Jobs/JobsSearchBar";
import JobsBox from "../../components/Jobs/JobsBox";
import { getAllJobsService } from "../../services/jobService";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
const { height } = Dimensions.get("window");

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const response = await getAllJobsService();
      if (response.status === "success") {
        setJobs(response.data);
      } else {
        setError(true);
        setErrorMessage(response.message);
        setVisible(true);
        setJobs([]);
      }
      setIsLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <JobsSearchBar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : (
          jobs.map((job) => <JobsBox key={job._id} jobData={job} />)
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

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
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
