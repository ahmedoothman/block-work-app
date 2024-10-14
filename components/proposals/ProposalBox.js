import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Card, Text } from 'react-native-paper';
import theme from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../btns/AppButton';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default function ProposalBox({ PropsalData, isClient, jobDetails }) {
  const createdAt = formatDate(PropsalData.createdAt);
  const [loading, setLoading] = useState(false);
  const {
    freelancer: {
      _id: freelancerid,
      name: freelancerName,
      userPhotoUrl: freelancerPhoto,
    },
    status,
    _id: proposelId,
    coverLetter: proposelCoverLetter,
    jobPost: { title: jopTitle },
  } = PropsalData;

  const navigation = useNavigation();

  const handlePress = (isClient) => {
    if (isClient) {
      navigation.navigate('ClientProposalsDetails', {
        proposal: PropsalData,
        date: createdAt,
        isClient: isClient,
        jobDetails: jobDetails,
      });
    } else {
      navigation.navigate('ProposalsDetails', {
        proposal: PropsalData,
        date: createdAt,
      });
    }
  };

  return isClient ? (
    <Card style={styles.card}>
      <View style={styles.freelanceContainer}>
        <View style={styles.userImage}>
          <Image
            source={{ uri: freelancerPhoto }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
          />
        </View>
        <Text style={styles.userName}>{freelancerName}</Text>
      </View>

      <Card.Content>
        <View style={styles.View}>
          <Text variant='bodyMedium' style={styles.label}>
            {proposelCoverLetter}
          </Text>
        </View>
        <AppButton
          buttonTitle='View'
          onPress={() => {
            handlePress(true);
          }}
          loading={loading}
          style={styles.appButton}
          marginY={1}
          marginX={'auto'}
          marginBottom={1}
        />
      </Card.Content>
    </Card>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        handlePress(false);
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.View}>
            <Text variant='bodyMedium' style={styles.label}>
              {jopTitle}
            </Text>
            <Text variant='bodySmall' style={styles.date}>
              {createdAt}
            </Text>
          </View>

          <Text
            variant='bodyMedium'
            style={{
              color:
                status === 'submitted'
                  ? theme.colors.primaryBright
                  : status === 'accepted'
                  ? theme.colors.success
                  : theme.colors.danger,
            }}
          >
            {status}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  date: {
    color: theme.colors.ternaryDark,
  },
  label: {
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
    padding: 10,
  },
  freelanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    marginLeft: 10,
    padding: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'regular',
    color: theme.colors.white,
  },
});
