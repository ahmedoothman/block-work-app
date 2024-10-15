import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl, // Import RefreshControl
} from "react-native";
import React, { useCallback, useState } from "react";
import useTheme from "../../hooks/useTheme";
import JobsSearchBar from "../../components/Jobs/JobsSearchBar";
import JobsBox from "../../components/Jobs/JobsBox";
import { getMyJobsService, deleteJobService } from "../../services/jobService";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NoDataBox from "../../components/NoData/NoDataBox";
import Icon from "react-native-vector-icons/Entypo";

import { logEvent } from "firebase/analytics";
const { height } = Dimensions.get("window");

const Jobs = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredMessage, setFilteredMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const onDismissSnackBar = () => setVisible(false);

  // Function to fetch jobs
  const fetchJobs = async () => {
    setIsLoading(true);
    const response = await getMyJobsService();
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
    setRefreshing(false); // Stop refreshing after fetching
  };

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [])
  );

  const handleDelete = async (jobId) => {
    try {
      const response = await deleteJobService(jobId);
      if (response.status === "success") {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        setErrorMessage(response.message);
        setVisible(true);
      }
    } catch (error) {
      setErrorMessage("Error deleting the job.");
      setVisible(true);
    }
  };

  const editJob = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    navigation.navigate("UpdateJobForm", { job });
  };

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

  const statusFilter = (status) => {
    if (status === "All") {
      setFilteredJobs(jobs);
    } else {
      const filteredJobs = jobs.filter((job) => job.status === status);
      if (filteredJobs.length === 0) {
        setFilteredMessage(`No jobs found with status "${status}".`);
        setFilteredJobs([]);
      } else {
        setFilteredMessage("");
        setFilteredJobs(filteredJobs);
      }
    }
  };
  //----------------------------------
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing} // Bind the refreshing state
          onRefresh={async () => {
            setRefreshing(true); // Set refreshing to true when pulling down
            await fetchJobs(); // Fetch jobs on refresh
          }}
        />
      }>
      <JobsSearchBar
        searchFilter={searchFilter}
        skillFilter={skillFilter}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        isClient={true}
      />

      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => {
          navigation.navigate("CreateJobForm");
        }}>
        <Icon
          name="circle-with-plus"
          size={30}
          color={theme.colors.whiteTitle}
        />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollContainerStyle}
        contentContainerStyle={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : (
          filteredJobs.map((job) => (
            <JobsBox
              key={job._id}
              jobData={job}
              isclient={true}
              onDelete={handleDelete}
              onEdit={editJob}
            />
          ))
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
    </ScrollView>
  );
};

export default Jobs;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      padding: 10,
    },
    scrollContainerStyle: {
      padding: 0,
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    loadingIndicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: height * 0.6,
    },
    snackbarStyle: {
      backgroundColor: theme.colors.danger,
      borderRadius: theme.borderRadius,
      position: "absolute",
      bottom: 10,
      left: 10,
      right: 10,
    },
    createBtn: {
      backgroundColor: theme.colors.primaryDark,
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      padding: 5,
      marginHorizontal: 25,
      marginTop: 10,
      borderRadius: theme.borderRadius,
    },
  });
