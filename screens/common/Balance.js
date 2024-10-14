import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from "../../hooks/useTheme";
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';
import { getWalletService } from '../../services/walletService';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
export default function Balance() {
    const theme = useTheme();
    const styles = createStyles(theme);
  const navigation = useNavigation();
  const [WalWetService, setWalletService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isActive = true; // to track if the component is still mounted

      const fetchGetWalletService = async () => {
        setLoading(true);
        try {
          const response = await getWalletService();
          if (isActive) {
            if (response.status === 'success') {
              setWalletService(response.data);
            } else {
              setError(true);
              setErrorMessage(response.message);
            }
          }
        } catch (error) {
          if (isActive) {
            setError(true);
            setErrorMessage('Failed to fetch data');
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchGetWalletService();

      return () => {
        isActive = false; // cleanup when the component unmounts
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.balanceHeader}>Overview</Text>
      <View style={styles.balanceparent}>
        {/* //' Total Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <Text style={styles.balance}>$ {WalWetService?.totalBalance}</Text>
        </View>
        {/* //' Pending Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Pending Balance</Text>
          <Text style={styles.balance}>$ {WalWetService?.pendingBalance}</Text>
        </View>
        {/* //'  Available Balance*/}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Available Balance</Text>
          <Text style={styles.balance}>
            $ {WalWetService?.availableBalance}
          </Text>
        </View>
      </View>

      <View style={styles.ChargeWalletBtnContainer}>
        <AppButton
          onPress={() => {
            navigation.navigate('ChargeBalance');
          }}
          buttonTitle={'Charge Wallet'}
          loading={loading}
          bgColor={theme.colors.primaryDark}
        />
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      paddingHorizontal: 20,
    },
    spinnerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.secondaryDark,
    },
    balanceHeader: {
      color: theme.colors.white,
      fontSize: 22,
      fontWeight: "regular",
      marginTop: 20,
    },
    balanceparent: {
      marginVertical: 15,
    },
    balanceContainer: {
      marginVertical: 7,
    },
    balanceTitle: {
      color: theme.colors.primaryBright,
      fontSize: 18,
      fontWeight: "regular",
      marginVertical: 10,
    },
    balance: {
      color: theme.colors.white,
      fontSize: 20,
      fontWeight: "bold",
    },
    ChargeWalletBtnContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 30,
    },
  });
