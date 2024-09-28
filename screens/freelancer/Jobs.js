import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import theme from '../../theme';
import JobsSearchBar from '../../components/Jobs/JobsSearchBar';
import JobsBox from '../../components/Jobs/JobsBox';

const Jobs = () => {
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getAllJobsService();
      console.log(response);
    };

    fetchJobs();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: 'black', height: '100%' }}>
      {/* <Text style={{color:"white"}}>Jobs</Text> */}
      <JobsSearchBar />
      <JobsBox />
      <JobsBox />
      <JobsBox />
    </ScrollView>
  );
};

export default Jobs;
