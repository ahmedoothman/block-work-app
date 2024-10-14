import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import useTheme from "../../hooks/useTheme";
import ContractBtn from '../../components/btns/ContractBtn';
import { useNavigation } from '@react-navigation/native';
import ClientContractBox from '../../components/Contracts/ClientContractBox';
import { getAllClientContract } from '../../services/contractService';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

const Contracts = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [contracts, setContracts] = useState([]);

  // Fetch all client contracts
  const fetchAllClientContracts = async () => {
    setLoading(true);
    const response = await getAllClientContract();
    if (response.status === 'success') {
      setContracts(response.data);
      setError(false); // Reset error state on successful fetch
    } else {
      setError(true);
      setErrorMessage(response.message);
    }
    setLoading(false);
  };

  // useFocusEffect to fetch contracts on screen focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAllClientContracts();
    }, [])
  );

  // Handle refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllClientContracts();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' color={theme.colors.primaryBright} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            <Text style={styles.noDataTitle}>
              There Are No Active Contracts.
            </Text>
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
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    spinnerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.secondaryDark,
    },
    container: {
      flex: 1,
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
      fontWeight: "regular",
      textAlign: "center",
    },
    noDataMessage: {
      color: theme.colors.white,
      fontSize: 14,
      fontWeight: "regular",
      textAlign: "center",
      paddingHorizontal: 15,
      marginVertical: 20,
    },
  });

export default Contracts;
