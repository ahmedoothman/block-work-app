import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import theme from '../../theme';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get screen width for responsiveness Nice

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const createdAt = new Date(dateString);
  const timeDiff = Math.abs(now - createdAt);
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hoursDiff < 1) {
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    return minutesDiff === 1 ? '1 minute ago' : `${minutesDiff} minutes ago`;
  } else if (hoursDiff < 24) {
    return hoursDiff === 1 ? '1 hour ago' : `${hoursDiff} hours ago`;
  } else {
    const daysDiff = Math.floor(hoursDiff / 24);
    return daysDiff === 1 ? '1 day ago' : `${daysDiff} days ago`;
  }
};

export default function JobsBox({ jobData, isclient, onDelete, onEdit }) {
  const postingTimeOfJob = formatTimeAgo(jobData.createdAt);
  const navigation = useNavigation();

  const handleDelete = async () => {
    await onDelete(jobData._id);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => {
        isclient
          ? navigation.navigate('ClientJopDetails', {
              jobDetails: jobData,
              postingTimeOfJob: postingTimeOfJob,
            })
          : navigation.navigate('JobsDetails', {
              jobDetails: jobData,
              postingTimeOfJob: postingTimeOfJob,
            });
      }}
    >
      <View style={styles.jobBox}>
        <View style={styles.header}>
          <Text style={styles.timePriceText}>{postingTimeOfJob}</Text>
          {isclient && (
            <Text style={styles.statusText}>Status: {jobData.status}</Text>
          )}
        </View>
        <Text style={styles.titleDescriptionText}>{jobData.title}</Text>
        <Text style={styles.timePriceText}>
          Fixed-price - Entry level - Est. budget: ${jobData.budget}
        </Text>

        <Text style={styles.descriptionText}>
          {jobData.description} <Text style={styles.moreText}>more</Text>
        </Text>

        <View style={styles.skillsBox}>
          <View style={styles.skillsContainer}>
            {jobData.skillsRequired.map((skill, i) => (
              <Text key={i} style={styles.skillsItem}>
                {skill}
              </Text>
            ))}
          </View>
          <View style={styles.arrowRightContainer}>
            <Icon
              name='chevron-thin-right'
              size={25}
              color={theme.colors.primaryBright}
              style={styles.arrowRightIcon}
            />
          </View>
        </View>

        <View style={styles.paymentStarsBox}>
          <View style={styles.paymentBox}>
            <AntDesign
              name='checkcircle'
              size={17}
              color={theme.colors.ternaryDark}
            />
            <Text style={styles.paymentText}>Payment Verified</Text>
          </View>
          <View style={styles.starsBox}>
            {Array.from({ length: 5 }).map((_, index) => (
              <AntDesign
                key={index}
                name='star'
                size={17}
                color={theme.colors.warning}
              />
            ))}
          </View>
        </View>

        <View style={styles.locationProposalsBox}>
          <View style={styles.locationBox}>
            <AntDesign
              name='enviromento'
              size={19}
              color={theme.colors.ternaryDark}
            />
            <Text style={styles.locationText}>{jobData.client.country}</Text>
          </View>
          <View style={styles.proposalsBox}>
            <Text style={styles.proposalsText}>
              Proposals: {jobData.proposalCount}
            </Text>
          </View>
        </View>

        {isclient && (
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}
            >
              <AntDesign name='delete' size={20} color={theme.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onEdit(jobData._id);
              }}
              style={styles.editButton}
            >
              <AntDesign name='edit' size={20} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 10,
  },
  jobBox: {
    width: width * 0.8,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
    alignSelf: 'center',
  },
  timePriceText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    marginBottom: 5,
  },
  titleDescriptionText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusText: {
    // New Status Text Style
    color: theme.colors.primaryBright,
    fontSize: 14,
    marginBottom: 5,
  },
  descriptionText: {
    color: theme.colors.white,
    marginBottom: 10,
  },
  moreText: {
    color: theme.colors.primaryBright,
  },
  skillsBox: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    width: '90%',
  },
  skillsItem: {
    backgroundColor: theme.colors.secondaryBright,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    // marginBottom: 8,
    color: theme.colors.ternaryDark,
  },
  arrowRightContainer: {
    marginVertical: 'auto',
    width: '10%',
  },
  arrowRightIcon: {
    // position: "absolute",
    // right: 10,
    // top: "50%",
  },
  paymentStarsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    color: theme.colors.ternaryDark,
    marginLeft: 5,
  },
  starsBox: {
    flexDirection: 'row',
  },
  locationProposalsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: theme.colors.ternaryDark,
    marginLeft: 5,
  },
  proposalsBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proposalsText: {
    color: theme.colors.ternaryDark,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButton: {
    backgroundColor: theme.colors.primaryDark,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
