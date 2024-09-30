import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import theme from '../../theme';
import ContractBtn from '../../components/btns/ContractBtn';
import { useNavigation } from '@react-navigation/native';
import ContractBox from '../../components/Contracts/ContractBox';
const Contracts = () => {
  const navigation = useNavigation();

  const [activecontracts, setActivecontracts] = useState([
    { title: 'Build ecommerce...' },
    { title: 'Build dashboard...' },
    { title: 'Fix Error in app..' },
  ]);

  const [archivedContracts, setArchivedContracts] = useState(null);

  const [isActive, setIsActive] = useState(true);
  const [isArchived, setIsArchived] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.btnContaienr}>
        <ContractBtn
          bgc={isActive ? theme.colors.primaryDark : 'transparent'}
          borderColor={theme.colors.primaryDark}
          textSize={14}
          textColor={isActive ? theme.colors.white : theme.colors.colorTextBlue}
          fontWeight={'regular'}
          paddingHorizontal={5}
          paddingVertical={0}
          mode={isActive ? 'contained' : 'outlined'}
          onPress={() => {
            setIsActive(true);
            setIsArchived(false);
          }}
          clickText={'Active'}
        />
        <ContractBtn
          bgc={isArchived ? theme.colors.primaryDark : 'transparent'}
          borderColor={theme.colors.primaryDark}
          textSize={14}
          textColor={
            isArchived ? theme.colors.white : theme.colors.colorTextBlue
          }
          fontWeight={'regular'}
          paddingHorizontal={5}
          paddingVertical={0}
          mode={isArchived ? 'contained' : 'outlined'}
          onPress={() => {
            setIsArchived(true);
            setIsActive(false);
          }}
          clickText={'Archived'}
        />
      </View>

      <View style={styles.headertitleContainer}>
        <Text style={styles.headertitle}>
          {isActive ? 'Active' : 'Archived'} Contracts
        </Text>
      </View>

      {isActive ? (
        // ' in case of there are active Contracts
        activecontracts ? (
          <View style={styles.contractsContainer}>
            {activecontracts.map((contract, index) => {
              return (
                <ContractBox
                  key={index}
                  onPress={() => {
                    navigation.navigate('ContractDetails');
                  }}
                  contractTitle={contract.title}
                />
              );
            })}
          </View>
        ) : (
          // ' in case of there are no active Contracts
          <View style={styles.noDatacontentContainer}>
            <Text style={styles.noDataTitle}>
              There is no active Contracts.
            </Text>
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
        )
      ) : archivedContracts ? (
        // ' in case of there are archived Contracts
        <View style={styles.contentContainer}>
          <Text style={styles.headertitle}>Archived Contracts content</Text>
        </View>
      ) : (
        // ' in case of there are NO archived Contracts
        <View style={styles.noDatacontentContainer}>
          <Text style={styles.noDataTitle}>
            There is no archived Contracts.
          </Text>
          <Text style={styles.noDataMessage}>
            archived Contracts wil appear here.
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 20,
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
