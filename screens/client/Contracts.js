import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import theme from '../../theme';
import ContractBtn from '../../components/btns/ContractBtn';
import { useNavigation } from '@react-navigation/native';
import ClientContractBox from '../../components/Contracts/ClientContractBox';
import { getAllClientContract } from '../../services/contractService';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
const Contracts = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [contracts, setContracts] = useState([]);

  // ---------------------------------------------
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const fetchAllClientContracts = async () => {
        const response = await getAllClientContract();
        if (response.status === 'success') {
          setContracts(response.data);
        } else {
          setError(true);
          setErrorMessage(response.message);
        }
        setLoading(false);
      };
      fetchAllClientContracts();
    }, [])
  );

  // ---------------------------------------------

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' color={theme.colors.primaryBright} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {contracts.length > 0 ? (
        <View style={styles.contractsContainer}>
          {contracts.map((contract, index) => {
            return (
              <ClientContractBox
                key={index}
                onPress={() => {
                  navigation.navigate('ClientContractDetails', {
                    contract: contract,
                  });
                }}
                contractTitle={contract.job.title}
              />
            );
          })}
        </View>
      ) : (
        // ' in case of there are no active Contracts
        <View style={styles.noDatacontentContainer}>
          <Text style={styles.noDataTitle}>There Are No Active Contracts.</Text>
          <Text style={styles.noDataMessage}>
            Contracts you’re actively work on wil appear here.
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
    </View>
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
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  btnContaienr: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginVertical: 25,
  },
  contractsContainer: {
    // marginVertical: 10,
  },

  headertitleContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  headertitle: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: 'regular',
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
