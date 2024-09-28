
import { View, Text,ScrollView } from 'react-native';
import React from 'react';
import theme from '../../theme';
import JobsSearchBar from "../../components/Jobs/JobsSearchBar"
import JobsBox from "../../components/Jobs/JobsBox"

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
    <ScrollView style={{backgroundColor:"black" , height:"100%"}}>
      {/* <Text style={{color:"white"}}>Jobs</Text> */}
      <JobsSearchBar/>
      <JobsBox/>
      <JobsBox/>
      <JobsBox/>
    
    </ScrollView>
  );
};

export default Jobs;
