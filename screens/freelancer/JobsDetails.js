import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import theme from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';
import { calcDuration } from '../../utils';
import UserBox from '../../components/UserBox/UserBox';
const JobsDetails = ({ route }) => {
  const { jobDetails, postingTimeOfJob } = route.params;
  const {
    title,
    description,
    budget,
    skillsRequired,
    proposalCount,
    duration,
  } = jobDetails;

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView style={styles.jobDetailsBox}>
        {/* First Section */}
        <View style={styles.borderSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.timePriceText}>{postingTimeOfJob} </Text>
          <View style={styles.paymentBox}>
            <AntDesign
              name='enviromento'
              size={19}
              color={theme.colors.ternaryDark}
            />
            <Text style={styles.locationText}>Worldwide</Text>
          </View>
        </View>
        {/* Second Section */}
        <View style={styles.borderSection}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        {/* Third Section */}
        <View style={styles.thirdSection}>
          <View style={styles.infoRow}>
            <EvilIcons name='tag' size={29} color={theme.colors.ternaryDark} />
            <Text style={styles.budgetText}>
              ${budget} {'\n'}
              <Text style={styles.subText}>Fixed-price</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <EvilIcons
              name='calendar'
              size={29}
              color={theme.colors.ternaryDark}
            />
            <Text style={styles.budgetText}>
              {calcDuration(duration)} {'\n'}
              <Text style={styles.subText}>Duration</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <AntDesign
              name='bulb1'
              size={20}
              color={theme.colors.ternaryDark}
            />
            <Text style={styles.budgetText}>
              Entry level{'\n'}
              <Text style={styles.subText}>Experience level</Text>
            </Text>
          </View>
        </View>
        {/* Fourth Section */}
        <View style={styles.borderSection}>
          <Text style={styles.projectTypeText}>
            Project Type: <Text style={styles.subText}>One-time project</Text>
          </Text>
        </View>
        {/* Fifth Section */}
        <View style={styles.borderSection}>
          <Text style={styles.sectionTitle}>Skills and Expertise</Text>
          <View style={styles.skillsBox}>
            {skillsRequired.map((skill, i) => (
              <Text key={i} style={styles.skillsItem}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
        <UserBox otherUser={jobDetails.client} isMe={true} />
        {/* Sixth Section */}
        <View style={styles.lastSection}>
          <Text style={styles.subText}>Proposals:</Text>
          <View style={styles.proposalsRow}>
            <AntDesign
              name='questioncircleo'
              size={17}
              color={theme.colors.primaryBright}
            />
            <Text style={styles.proposalsCount}>{proposalCount}</Text>
          </View>
        </View>
        {/*Apply Now Button in Job Details Page */}
        <View style={styles.applyBtnView}>
          <AppButton
            buttonTitle={'Apply Now'}
            onPress={() =>
              navigation.navigate('ProposalsForm', {
                jobData: jobDetails,
                postingTimeOfJob: postingTimeOfJob,
              })
            }
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default JobsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.secondaryDark,
    height: '100%',
  },
  jobDetailsBox: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    flex: 1,
    padding: 16,
  },
  title: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  timePriceText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    marginVertical: 5,
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationText: {
    color: theme.colors.ternaryDark,
    marginLeft: 5,
  },
  descriptionText: {
    color: theme.colors.white,
    marginVertical: 15,
  },
  thirdSection: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryBright,
    marginVertical: 20,
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  budgetText: {
    color: theme.colors.white,
    marginLeft: 8,
  },
  subText: {
    color: theme.colors.ternaryDark,
  },
  projectTypeText: {
    color: theme.colors.white,
    marginVertical: 15,
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 16,
    marginVertical: 10,
  },
  skillsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  skillsItem: {
    backgroundColor: theme.colors.secondaryBright,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    color: theme.colors.ternaryDark,
  },
  lastSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  proposalsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proposalsCount: {
    color: theme.colors.ternaryDark,
    marginLeft: 5,
  },
  applyBtnView: {
    alignItems: 'center',
    marginTop: 20,
  },
});
