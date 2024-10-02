import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProposalBox from '../../components/proposals/ProposalBox';
import theme from '../../theme';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { getFreelancerProposalsService } from '../../services/proposalService';
import NoDataBox from '../../components/NoData/NoDataBox';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');
const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [count, setcount] = useState(0);

  const onDismissSnackBar = () => setVisible(false);
 const navigation=useNavigation()
 const handleNoData=()=>{
  navigation.navigate('Jobs')
 }
  useEffect(() => {
    const fetchProposals = async () => {
      const response = await getFreelancerProposalsService();
      if (response.status === 'success') {
        setProposals(response.data);
        setcount(proposals.length);
      } else {
        setError(true);
        setErrorMessage(response.message);
        setVisible(true);
        setProposals([]);
      }
      setIsLoading(false);
    };
    fetchProposals();
  });

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.text}>Proposals({count})</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primaryBright}
              size={50}
            />
          </View>
        ) : ( proposals?
          (proposals.map((proposal) => (
            <ProposalBox key={proposal._id} PropsalData={proposal} />
          ))):(
            <NoDataBox Title={"No propsal found"} Onpress={handleNoData} Massage={"Your proposals willl appear here "} show={true} btnTitle={"Apply for jobs"} />
          )
        )}
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbarStyle}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
};

export default Proposals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  counter: {
    borderRadius: 20,
    padding: 5,
    margin: 5,
    width: 130,
    backgroundColor: theme.colors.secondaryBright,
  },
  text: {
    color: theme.colors.ternaryDark,
    textAlign: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6, // More dynamic height
  },
  snackbarStyle: {
    backgroundColor: '#B31312',
    borderRadius: theme.borderRadius,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});
