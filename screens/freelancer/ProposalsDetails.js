import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Details from '../../components/proposals/Details';
import theme from '../../theme';
import { ScrollView } from 'react-native-gesture-handler';

const ProposalsDetails = ({route}) => {
  const { proposal, date } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Details proposal={proposal} date={date}/>
      </ScrollView>
      
    </View>
  );
};

export default ProposalsDetails;
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.secondaryDark,     
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
  },
});
