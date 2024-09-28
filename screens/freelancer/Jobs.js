import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { getAllJobsService } from '../../services/jobService';

const Jobs = () => {
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getAllJobsService();
      console.log(response);
    };
    /* 
    note: to who will work on this task, 
    of course you will create component that the map will work on , when press on it to open the deatils of the job
    you pass the whole job object to the component and show the details of the job instead of just 
    pass the id and make a request to get the job details again
    */
    fetchJobs();
  }, []);
  return (
    <View>
      <Text>Jobs</Text>
    </View>
  );
};

export default Jobs;
