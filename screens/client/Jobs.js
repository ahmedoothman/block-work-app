import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl, // Import RefreshControl
} from 'react-native';
import React, { useCallback, useState } from 'react';
import theme from '../../theme';
import JobsSearchBar from '../../components/Jobs/JobsSearchBar';
import JobsBox from '../../components/Jobs/JobsBox';
import { getMyJobsService, deleteJobService } from '../../services/jobService';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NoDataBox from '../../components/NoData/NoDataBox';
import Icon from 'react-native-vector-icons/Entypo';
const { height } = Dimensions.get('window');

const Jobs = () => {
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const onDismissSnackBar = () => setVisible(false);

  // Function to fetch jobs
  const fetchJobs = async () => {
    setIsLoading(true);
    const response = await getMyJobsService();
    if (response.status === 'success') {
      const sortedJobs = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobs(sortedJobs);
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
      if (response.status === 'success') {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        setErrorMessage(response.message);
        setVisible(true);
      }
    } catch (error) {
      setErrorMessage('Error deleting the job.');
      setVisible(true);
    }
  };

  const editJob = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    navigation.navigate('UpdateJobForm', { job });
  };

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
      }
    >
      <JobsSearchBar />
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => {
          navigation.navigate('CreateJobForm');
        }}
      >
        <Icon name='circle-with-plus' size={30} color={theme.colors.white} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollContainerStyle}
        contentContainerStyle={styles.scrollContainer}
      >
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : (
          jobs.map((job) => (
            <JobsBox
              key={job._id}
              jobData={job}
              isclient={true}
              onDelete={handleDelete}
              onEdit={editJob}
            />
          ))
        )}
        {jobs.length === 0 && !isLoading && (
          <NoDataBox
            Title={'There Are No Jobs.'}
            Massage={'Jobs you’re actively working on will appear here.'}
            show={false}
            textCenter={true}
          />
        )}
      </ScrollView>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbarStyle}
      >
        {errorMessage}
      </Snackbar>
    </ScrollView>
  );
};

export default Jobs;

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6,
  },
  snackbarStyle: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  createBtn: {
    backgroundColor: theme.colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    padding: 5,
    marginHorizontal: 25,
    marginTop: 10,
    borderRadius: theme.borderRadius,
  },
});
