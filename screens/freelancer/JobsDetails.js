import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import theme from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppButton from '../../components/btns/AppButton';
import { useNavigation } from '@react-navigation/native';

const JobsDetails = ({ route }) => {
  const { jobDetails, postingTimeOfJob } = route.params;
  const { title, description, budget, skillsRequired, proposalCount } =
    jobDetails;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.jobDetailsBox}>
        {/*firstSection*/}
        <View style={styles.borderSection}>
          <Text style={{ color: 'white' }}>{title}</Text>
          <Text style={styles.timePriceText}>{postingTimeOfJob}</Text>
          <View style={styles.PaymentBox}>
            <AntDesign
              name='enviromento'
              size={19}
              color={theme.colors.ternaryDark}
            />
            <Text style={{ color: theme.colors.ternaryDark, marginBottom: 12 }}>
              Worldwide{' '}
            </Text>
          </View>
        </View>
        {/*Second Section*/}
        <View style={styles.borderSection}>
          <Text style={{ color: 'white', marginVertical: 20 }}>
            {description}
          </Text>
        </View>
        {/*Third Section*/}
        <View style={styles.thirdSection}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {/* <AntDesign name="tagso" size={24} color={theme.colors.ternaryDark} /> */}
            <EvilIcons name='tag' size={29} color={theme.colors.ternaryDark} />
            <Text style={{ color: theme.colors.white }}>
              ${budget} {'\n'}
              <Text style={{ color: theme.colors.ternaryDark }}>
                Fixed-price
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 15,
              marginBottom: 20,
            }}
          >
            <AntDesign
              name='bulb1'
              size={20}
              color={theme.colors.ternaryDark}
            />
            <Text style={{ color: theme.colors.white }}>
              Entry level{'\n'}
              <Text style={{ color: theme.colors.ternaryDark }}>
                Experience level
              </Text>{' '}
            </Text>
          </View>
        </View>
        {/*Forth Section*/}
        <View style={styles.borderSection}>
          <Text style={{ color: 'white', marginTop: 20, marginBottom: 20 }}>
            Project Type:{' '}
            <Text style={{ color: theme.colors.ternaryDark }}>
              One-time project
            </Text>
          </Text>
        </View>
        {/*Fifth Section*/}
        <View style={styles.borderSection}>
          <Text
            style={{
              color: 'white',
              marginTop: 20,
              marginBottom: 14,
              fontSize: 16,
            }}
          >
            Skills and Expertise
          </Text>
          <View style={styles.skillsBox}>
            {skillsRequired.map((skill, i) => (
              <Text key={i} style={styles.skillsItem}>
                {skill}
              </Text>
            ))}
            {/* <Text style={styles.skillsItem}>HTML</Text>
            <Text style={styles.skillsItem}>CSS</Text>
            <Text style={styles.skillsItem}>JavaScript</Text> */}
          </View>
        </View>
        {/*Sixth Section*/}
        <View style={styles.lastSection}>
          <Text style={{ color: theme.colors.ternaryDark }}>Proposals:</Text>
          <View style={{ flexDirection: 'row', gap: 7 }}>
            <AntDesign
              name='questioncircleo'
              size={17}
              color={theme.colors.primaryBright}
            />
            <Text style={{ color: theme.colors.ternaryDark, marginBottom: 20 }}>
              {proposalCount} to 50
            </Text>
          </View>
        </View>
        {/*Apply Now Button*/}
        <View style={styles.ApplyBtnView}>
          <AppButton
            buttonTitle={'Apply Now'}
            onPress={() => navigation.navigate('ProposalsForm')}
          />
        </View>
      </View>
    </View>
  );
};

export default JobsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  jobDetailsBox: {
    width: 320,
    height: 400,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
    flex: 1,
  },
  timePriceText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    marginBottom: 7,
    marginTop: 5,
  },

  PaymentBox: {
    flexDirection: 'row',
    gap: 8,
  },
  borderSection: {
    borderBottomColor: theme.colors.secondaryBright,
    borderBottomWidth: 1,
    // marginTop:10
  },
  skillsBox: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  skillsItem: {
    // marginTop: 4,
    backgroundColor: theme.colors.secondaryBright,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    color: theme.colors.ternaryDark,
  },
  lastSection: {
    flexDirection: 'row',
    borderBottomColor: theme.colors.secondaryBright,
    // borderBottomWidth: 1,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  ApplyBtnView: {
    alignItems: 'center',
  },
  thirdSection: {
    borderBottomColor: theme.colors.secondaryBright,
    borderBottomWidth: 1,
    marginTop: 20,
  },
});
