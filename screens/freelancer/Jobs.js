
import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../../theme";
import JobsSearchBar from "../../components/Jobs/JobsSearchBar";
import JobsBox from "../../components/Jobs/JobsBox";
import { getAllJobsService } from "../../services/jobService";
import { ActivityIndicator, Snackbar } from "react-native-paper";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await getAllJobsService();
        setJobs(response.data);
      } catch (error) {
        setError(error);
        setVisible(true);
        setIsLoading(false);
        setJobs([]);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <JobsSearchBar />
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        )}
        {jobs.map((job) => (
          <JobsBox key={job._id} jobData={job} />
        ))}
      </ScrollView>

      {error && (
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={styles.snackbarStyle}
        >
          {error.message}
        </Snackbar>
      )}
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
  },
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  snackbarStyle: {
    backgroundColor: "#B31312",
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
