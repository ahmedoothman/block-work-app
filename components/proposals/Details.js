import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import theme from '../../theme';
import { calcDuration } from '../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../btns/AppButton';
import {
  updateProposalService,
  updateProposalStatusService,
} from '../../services/proposalService';
import CustomeSnackBar from '../Public/CustomeSnackBar';
import { useNavigation } from '@react-navigation/native';

const Details = ({ proposal, date, isClient, jobDetails }) => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const onDismissSnackBar = () => setAlert(false);
  const navigation = useNavigation();

  const estimatedPayment = (num) => {
    let decrease = num * 0.1;
    let results = num - decrease;
    return results;
  };

  const manageProposalStatus = async (proposalId, status) => {
    const response = await updateProposalStatusService(proposalId, status);
    setAlert(true);
    if (response.status === 'success') {
      setIsSuccess(true);
      setAlertMessage("Proposal's status has been updated successfully.");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
  };

  const viewFreelancerProfile = () => {
    navigation.navigate('ProfileView', {
      id: proposal?.freelancer?._id,
    });
  };

  useEffect(() => {
    console.log('jobDetails', jobDetails);
    console.log('proposal', proposal.status);
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant='titleLarge' style={styles.title}>
          Your proposed terms
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Proposed Amount: ${proposal?.proposedAmount || 'N/A'}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Duration {calcDuration(proposal?.duration || 0)}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Cover letter
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          {proposal?.coverLetter || 'No cover letter provided.'}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          You’ll receive
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          The estimated payment, after service fees.
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          ${estimatedPayment(proposal?.proposedAmount || 0)}
        </Text>
        <Divider style={styles.Divider} />
        <Text variant='titleLarge' style={styles.title}>
          Jobs details
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          {proposal?.jobPost?.title || 'Job title not available'}
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Category: {proposal?.jobPost?.category || 'N/A'}
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Posted {date || 'N/A'}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Description:
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          {proposal?.jobPost?.description || 'No description available'}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Required skills
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          {proposal?.jobPost?.skillsRequired
            ? `(${proposal.jobPost.skillsRequired[0] || 'N/A'}, ${
                proposal.jobPost.skillsRequired[1] || 'N/A'
              })`
            : 'No skills required listed.'}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Duration {calcDuration(proposal?.jobPost?.duration || 0)}
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Client’s budget: ${proposal?.jobPost?.budget || 'N/A'}
        </Text>
      </Card.Content>

      {isClient && (
        <>
          <View style={styles.freelanceContainer}>
            <TouchableOpacity onPress={viewFreelancerProfile}>
              <View style={styles.userImage}>
                <Image
                  source={{
                    uri: proposal?.freelancer?.userPhotoUrl || '',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.userName}>
              {proposal?.freelancer?.name || 'Unknown Freelancer'}
            </Text>

            <MaterialCommunityIcons
              name='chat-processing'
              size={30}
              color={theme.colors.ternaryDark}
              style={{ marginRight: 0 }}
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  userId: proposal?.freelancer?._id,
                  otherUser: proposal?.freelancer,
                });
              }}
            />
          </View>

          <View style={styles.BtnStatusContainer}>
            {proposal?.status === 'submitted' ? (
              <>
                <AppButton
                  buttonTitle='Accept'
                  onPress={() =>
                    manageProposalStatus(proposal?._id, 'accepted')
                  }
                  btnWidth='40%'
                  marginBottom={1}
                  marginX='auto'
                  paddingY={10}
                  paddingX={10}
                />
                <AppButton
                  buttonTitle='Reject'
                  onPress={() =>
                    manageProposalStatus(proposal?._id, 'rejected')
                  }
                  btnWidth='40%'
                  marginBottom={1}
                  marginX='auto'
                  paddingY={10}
                  paddingX={10}
                />
              </>
            ) : proposal?.status === 'accepted' ? (
              <AppButton
                buttonTitle='Reject'
                onPress={() => manageProposalStatus(proposal?._id, 'rejected')}
                btnWidth='40%'
                marginBottom={1}
                marginX='auto'
                paddingY={10}
                paddingX={10}
              />
            ) : (
              <AppButton
                buttonTitle='Accept'
                onPress={() => manageProposalStatus(proposal?._id, 'accepted')}
                btnWidth='40%'
                marginBottom={1}
                marginX='auto'
                paddingY={10}
                paddingX={10}
              />
            )}
          </View>
          {isLoading && (
            <ActivityIndicator size='large' color={theme.colors.primary} />
          )}
          <CustomeSnackBar
            visible={alert}
            alertMessage={alertMessage}
            onDismissSnackBar={onDismissSnackBar}
            undoText='Undo'
            undoColor='black'
            bgColor={isSuccess ? theme.colors.colorTextBlue : 'red'}
            messageColor='#fff'
          />
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  title: {
    color: theme.colors.ternaryLight,
    marginVertical: 5,
  },
  data: {
    color: theme.colors.ternaryDark,
  },
  Divider: {
    marginVertical: 10,
  },
  freelanceContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  userName: {
    fontSize: 15,
    color: theme.colors.ternaryDark,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.ternaryDark,
    overflow: 'hidden',
  },
  BtnStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Details;
