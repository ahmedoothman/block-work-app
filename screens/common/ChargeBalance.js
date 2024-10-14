import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../../theme';
import InputField from '../../components/inputs/auth/InputField';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';
const ChargeBalance = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const handlePayment = () => {
    navigation.navigate('ChargeBalanceDetails', { amount: amount });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputFieldTitle}>Amount</Text>
        <InputField
          value={`$${amount}`}
          placeholder={'$0.00'}
          isPassword={false}
          onChange={(value) => {
            const numericValue = value.replace(/[^0-9.]/g, '');
            setAmount(numericValue);
          }}
          isUpload={false}
          bgColor={theme.colors.ternaryDark}
          valueColor={theme.colors.secondaryDark}
          paddingVertical={7}
          isNumeric={true}
        />
      </View>
      <View style={styles.ChargeWalletBtnContainer}>
        <AppButton
          onPress={handlePayment}
          buttonTitle={'Charge Wallet'}
          // loading={fasle}
          bgColor={theme.colors.primaryDark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondaryDark,
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    // backgroundColor: "red",
    width: '95%',
    marginHorizontal: 'auto',
    marginTop: 50,
  },
  inputFieldTitle: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'regular',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  ChargeWalletBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});
export default ChargeBalance;
