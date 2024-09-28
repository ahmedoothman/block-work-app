import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import theme from '../../theme';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const data = {
  skillsRequired: ['HTML', 'CSS', 'JavaScript'],
  isActive: true,
  _id: '66efeab99658f051ec26c270',
  client: null,
  title: 'Frontend Developer Needed',
  description:
    'This is the project that we were speaking about that.I’m going to go ahead and just...',
  budget: 1500,
  category: 'Web Development',
  createdAt: '2024-09-22T10:00:25.699Z',
  __v: 0,
  proposalCount: 15,
};
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
const postingTimeOfJob = formatTimeAgo(data.createdAt);
// console.log("eeeeeeeeeee",postingTimeOfJob);

export default function JobsBox() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('JobsDetails', {
          jobDetails: data,
          postingTimeOfJob: postingTimeOfJob,
        })
      }
    >
      <View style={{ marginTop: 25 }}>
        <View style={styles.jobBox}>
          <Text style={styles.timePriceText}>{postingTimeOfJob}</Text>
          <Text style={styles.titleDescribtionText}>{data.title}</Text>
          <Text style={styles.timePriceText}>
            Fixed-price -Entry level-Est.budget: ${data.budget}
          </Text>
          <Text style={styles.titleDescribtionText}>
            {data.description} <Text style={styles.moreText}>{'\n'}more</Text>
          </Text>
          {/* Skills Box*/}
          <View style={styles.skillsBox}>
            {data.skillsRequired.map((skill, i) => (
              <Text key={i} style={styles.skillsItem}>
                {skill}
              </Text>
            ))}
            {/* <Text style={styles.skillsItem}>HTML</Text>
            <Text style={styles.skillsItem}>CSS</Text>
            <Text style={styles.skillsItem}>JavaScript</Text> */}
            <Icon
              name='chevron-thin-right'
              size={20}
              color={theme.colors.primaryBright}
              style={styles.arrowRigthIcon}
            />
          </View>
          {/*payment and Stars Box*/}
          <View style={styles.paymentStarsBox}>
            {/*Payment Box*/}
            <View style={styles.PaymentBox}>
              <AntDesign
                name='checkcircle'
                size={17}
                color={theme.colors.ternaryDark}
              />
              <Text style={{ color: theme.colors.ternaryDark }}>
                Payment Verified{' '}
              </Text>
            </View>
            {/*Stars Box*/}
            <View style={styles.StarsBox}>
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

          {/*Location and proposals Box*/}
          <View style={styles.LocationProposalsBox}>
            {/*Location Box*/}
            <View style={styles.PaymentBox}>
              <AntDesign
                name='enviromento'
                size={19}
                color={theme.colors.ternaryDark}
              />
              <Text style={{ color: theme.colors.ternaryDark }}>
                United States{' '}
              </Text>
            </View>
            {/*proposals Box*/}
            <View style={styles.StarsBox}>
              <Text style={{ color: theme.colors.ternaryDark }}>
                Proposals: {data.proposalCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  jobBox: {
    width: 310,
    height: 290,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: 8,
    marginHorizontal: 25,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  timePriceText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    marginBottom: 7,
  },
  titleDescribtionText: {
    marginBottom: 7,
    color: 'white',
  },
  moreText: {
    color: theme.colors.primaryBright,
  },
  skillsBox: {
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
  },
  skillsItem: {
    marginTop: 4,
    backgroundColor: theme.colors.secondaryBright,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    color: theme.colors.ternaryDark,
  },
  arrowRigthIcon: {
    position: 'absolute',
    right: 61,
    top: 9,
  },
  paymentStarsBox: {
    marginTop: 23,
    color: theme.colors.ternaryDark,
    flexDirection: 'row',
    gap: 20,
  },
  PaymentBox: {
    flexDirection: 'row',
    gap: 8,
  },
  StarsBox: {
    flexDirection: 'row',
  },
  LocationProposalsBox: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 39,
  },
});
