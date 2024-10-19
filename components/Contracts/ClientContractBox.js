import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import theme from '../../theme';
import { formatDate } from '../proposals/ProposalBox';
const ClientContractBox = ({ onPress, contractTitle, status, data }) => {
  return (
    <View style={styles.headertitleContainer}>
      <View style={styles.contractHeader}>
        <Text
          style={[
            styles.headerstatus,
            {
              color:
                status === 'completed'
                  ? theme.colors.success
                  : status === 'pending'
                  ? theme.colors.progress
                  : status == 'cancelled'
                  ? theme.colors.danger
                  : theme.colors.tertiary,
            },
          ]}
        >
          {status}
        </Text>
        <Text
          style={{
            ...styles.headertitle,
            color: theme.colors.ternaryDark,
            fontSize: 12,
          }}
        >
          {formatDate(data.contract.createdDate)}
        </Text>
      </View>
      <Text style={styles.headertitle}>{contractTitle}</Text>
      <View style={styles.contractFooter}>
        <Text
          style={{
            ...styles.headertitle,
            color: theme.colors.ternaryDark,
            fontSize: 16,
            fontStyle: 'italic',
          }}
        >
          ${data.contract.amount}
        </Text>
        <TouchableOpacity style={styles.viewButtonContainer} onPress={onPress}>
          <Text style={styles.viewButtonText}>View</Text>
          <View style={styles.viewButtonImage}>
            <Image
              source={require('../../assets/images/Frame.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headertitleContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    padding: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contractHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  headertitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'regular',
    marginVertical: 5,
  },
  headerstatus: {
    fontSize: 16,
    fontWeight: 'regular',
  },
  viewButtonContainer: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius,
    color: theme.colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    padding: 5,
    width: 'auto',
  },
  viewButtonImage: {
    width: 28,
    height: 28,
  },
  viewButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  contractFooter: {
    backgroundColor: theme.colors.secondaryGray,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ClientContractBox;
