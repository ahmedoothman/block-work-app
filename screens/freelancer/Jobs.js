import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import theme from "../../theme";
import JobsSearchBar from "../../components/Jobs/JobsSearchBar";
import JobsBox from "../../components/Jobs/JobsBox";
import NoDataBox from "../../components/NoData/NoDataBox";

import { getAllJobsService } from "../../services/jobService";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
const { height } = Dimensions.get("window");

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredMessage, setFilteredMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Added for refresh control
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  // Function to fetch jobs
  const fetchJobs = async () => {
    setIsLoading(true);
    const response = await getAllJobsService();
    if (response.status === "success") {
      const sortedJobs = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobs(sortedJobs);
      setFilteredJobs(sortedJobs);
    } else {
      setError(true);
      setErrorMessage(response.message);
      setVisible(true);
      setJobs([]);
    }
    setIsLoading(false);
  };

  // Fetch jobs when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchJobs();
      return () => {
        setJobs([]);
      };
    }, [])
  );

  // Handle pull-to-refresh action
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobs().finally(() => setRefreshing(false)); // Ensure refreshing state is reset after fetching
  }, []);

  //----------------Filtration ------------------
  //' filter search by => {budget , title}
  const searchFilter = (searchText) => {
    if (searchText.length === 0) {
      setFilteredJobs(jobs);
      setFilteredMessage("");
      return;
    }

    const filteredJobs = jobs.filter((job) => {
      const titleMatches = job.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const budgetMatches =
        job.budget && job.budget.toString().includes(searchText.trim());

      return titleMatches || budgetMatches;
    });

    if (filteredJobs.length === 0) {
      setFilteredMessage(
        `No jobs found for "${searchText}". Try adjusting the job title or budget.`
      );
      setFilteredJobs(filteredJobs);
    } else {
      setFilteredMessage("");
      setFilteredJobs(filteredJobs);
    }
  };

  const skillFilter = (skill) => {
    if (skill == "All") {
      setFilteredJobs(jobs);
      return;
    } else {
      const jobsMatchingSkills = jobs.filter((job) =>
        job.skillsRequired.includes(skill)
      );

      if (jobsMatchingSkills.length == 0) {
        setFilteredMessage(
          `The skill "${skill}" is currently not available. Please select a different skills or check back later.`
        );
        setFilteredJobs(jobsMatchingSkills);
      } else {
        setFilteredMessage("");
        setFilteredJobs(jobsMatchingSkills);
      }
    }
  };

  const categoryFilter = (category) => {
    if (category == "All") {
      setFilteredJobs(jobs);
      return;
    } else {
      const selectedCategory = jobs.filter((job) => job.category === category);
      if (selectedCategory.length == 0) {
        setFilteredJobs(selectedCategory);
        setFilteredMessage(
          `The category "${category}" is currently not available. Please select a different category or check back later.`
        );
      } else {
        setFilteredMessage("");
        setFilteredJobs(selectedCategory);
      }
    }
  };
  //----------------------------------
  return (
    <View style={styles.container}>
      <JobsSearchBar
        searchFilter={searchFilter}
        skillFilter={skillFilter}
        categoryFilter={categoryFilter}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Bind refresh state
            onRefresh={onRefresh} // Trigger refresh action
            tintColor={theme.colors.primaryBright}
          />
        }>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : (
          filteredJobs.map((job) => <JobsBox key={job._id} jobData={job} />)
        )}

        {filteredJobs.length === 0 && !isLoading && (
          <NoDataBox
            Title={"There Are No Jobs."}
            Massage={
              filteredMessage.length > 0
                ? filteredMessage
                : "Jobs you’re actively working on will appear here."
            }
            show={false}
            textCenter={true}
          />
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
    backgroundColor: theme.colors.secondaryDark,
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
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
});
