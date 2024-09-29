import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import ProposalBox from '../../components/proposals/ProposalBox';
import theme from '../../theme';

const Proposals = () => {
  var obj={
    status: "submitted",
    _id: "66f889e3f3d43d1de8fd497e",
    jobPost: {
        _id: "66efebf039b30b4a54569601",
        title: "Frontend Developer Needed"
    },
    freelancer: "66f8837ef3d43d1de8fd4976",
    coverLetter: "I am an experienced developer",
    proposedAmount: 1200,
    duration: 2,
    createdAt: "2024-09-28T22:57:39.595Z",
    __v:0,
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.counter}><Text style={styles.text} >Proposals(13)</Text></View>
      
      <ProposalBox  PropsalData={obj}/>
      <ProposalBox PropsalData={obj}/>
      <ProposalBox PropsalData={obj}/>
      <ProposalBox PropsalData={obj}/> 
      <ProposalBox PropsalData={obj}/>
      <ProposalBox PropsalData={obj}/>
      <ProposalBox PropsalData={obj}/>
      <ProposalBox PropsalData={obj}/>


      </ScrollView>
     
    </View>
  );
};

export default Proposals;

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
  },
  counter:{
     borderRadius:20,
     padding:5,
     margin:5,  
     width:130,
     backgroundColor:theme.colors.secondaryBright
  },
  text:{
    color:theme.colors.ternaryDark,
    textAlign:"center"
  }
});