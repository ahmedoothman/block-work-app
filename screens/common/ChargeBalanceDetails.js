import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { CreditCardInput } from 'react-native-credit-card-input';
import useTheme from "../../hooks/useTheme";
import { useNavigation } from '@react-navigation/native';
import { chargeWalletService } from '../../services/walletService';
import AppButton from '../../components/btns/AppButton';
const ChargeBalanceDetails = ({ route }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const { amount } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);
  const [isCardValid, setIsCardValid] = useState(false);

  const handleCardChange = async (form) => {
    setCardInfo(form);
    setIsCardValid(form.valid);
  };

  const handlePayment = async () => {
    setLoading(false);
    const response = await chargeWalletService({ amount });
    if (response.status === 'success') {
      navigation.navigate('Balance');
    } else {
      // add alert
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Enter Payment Information</Title>

          <Text style={styles.label}>Card Information</Text>
          <CreditCardInput
            onChange={handleCardChange}
            requiresName
            requiresCVC
            validColor={theme.colors.primaryDark}
            inputContainerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputStyle={styles.input}
          />

          <AppButton
            onPress={handlePayment}
            buttonTitle={'Confirm Payment'}
            // loading={fasle}
            bgColor={theme.colors.primaryDark}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondaryDark,
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      padding: 20,
    },
    title: {
      textAlign: "center",
      color: theme.colors.primaryDark,
      marginBottom: 20,
      fontSize: 24,
    },
    label: {
      fontSize: 16,
      color: theme.colors.secondaryDark,
      marginBottom: 10,
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey,
      marginBottom: 20,
    },
    inputLabel: {
      color: theme.colors.secondaryDark,
      fontSize: 16,
    },
    input: {
      fontSize: 18,
      color: theme.colors.primaryDark,
    },
    button: {
      marginTop: 20,
      backgroundColor: theme.colors.primaryDark,
      color: theme.colors.white,
    },
    buttonContent: {
      paddingVertical: 10,
    },
  });

export default ChargeBalanceDetails;
