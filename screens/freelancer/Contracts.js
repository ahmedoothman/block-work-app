import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import theme from '../../theme';
import ContractBtn from '../../components/btns/ContractBtn';
import { useNavigation } from '@react-navigation/native';
import ClientContractBox from '../../components/Contracts/ClientContractBox';
import { getAllFreelancerContract } from '../../services/contractService';
import { ActivityIndicator } from 'react-native-paper';

const Contracts = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [contracts, setContracts] = useState([]);

  // Function to fetch contracts
  const fetchAllFreelancerContracts = async () => {
    setLoading(true);
    const response = await getAllFreelancerContract();
    if (response.status === 'success') {
      const sortedContracts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setContracts(sortedContracts);
    } else {
      setError(true);
      setErrorMessage(response.message);
    }
    setLoading(false);
  };

  // Fetch contracts on component mount
  useEffect(() => {
    fetchAllFreelancerContracts();
  }, []);

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllFreelancerContracts().finally(() => {
      setRefreshing(false);
    });
  }, []);

  // ---------------------------------------------

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' color={theme.colors.primaryBright} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primaryBright}
        />
      }
    >
      {contracts.length > 0 ? (
        <View style={styles.contractsContainer}>
          {contracts.map((contract, index) => {
            return (
              <ClientContractBox
                key={index}
                onPress={() => {
                  navigation.navigate('ContractDetails', {
                    contract: contract,
                  });
                }}
                contractTitle={contract.job.title}
                status={contract.status}
                data={contract}
              />
            );
          })}
        </View>
      ) : (
        // ' in case of there are no active Contracts
        <View style={styles.noDatacontentContainer}>
          <Text style={styles.noDataTitle}>There Are No Active Contracts.</Text>
          <Text style={styles.noDataMessage}>
            Contracts you’re actively working on will appear here.
          </Text>
          <View>
            <ContractBtn
              bgc={theme.colors.primaryDark}
              borderColor={theme.colors.primaryDark}
              textSize={14}
              textColor={theme.colors.white}
              fontWeight={'regular'}
              paddingHorizontal={5}
              paddingVertical={0}
              mode={'contained'}
              onPress={() => {
                navigation.navigate('Jobs');
              }}
              clickText={'Search for new projects'}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondaryDark,
  },
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contractsContainer: {
    // marginVertical: 10,
  },
  noDatacontentContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  noDataTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'regular',
    textAlign: 'center',
  },
  noDataMessage: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'regular',
    textAlign: 'center',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
});

export default Contracts;
