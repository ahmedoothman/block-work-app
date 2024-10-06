import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import { Button, Text } from 'react-native-paper';

const NoDataBox = ({ Title, Massage, Onpress, btnTitle, show, textCenter }) => {
  return (
    <View>
      <View style={{ margin: 10 }}>
        <View style={styles.noDatacontentContainer}>
          <Text
            variant='headlineSmall'
            style={[
              styles.noDataTitle,
              textCenter ? { textAlign: 'center' } : {},
            ]}
          >
            {Title}
          </Text>
          <Text variant='titleMedium' style={styles.noDataMessage}>
            {Massage}
          </Text>
          {show ? (
            <Button style={styles.btn} mode='contained' onPress={Onpress}>
              {btnTitle}
            </Button>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noDatacontentContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 50,
  },
  noDataTitle: {
    color: theme.colors.ternaryLight,
  },
  noDataMessage: {
    color: theme.colors.ternaryDark,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  btn: {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.ternaryLight,
  },
});

export default NoDataBox;
