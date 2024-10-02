import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import ContractBtn from '../../components/btns/ContractBtn';
import { calcDuration } from '../../utils';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ContractDetails = () => {
  // const user = useSelector((state) => state.auth.user);
  const userRole = useSelector((state) => state.auth.user).role;
  const contract = useRoute();
  const {
    status,
    job: { _id, createdAt, skillsRequired, title, description, budget },
    freelancer: {
      name: freelancerName,
      email: freelancerEmail,
      jobTitle: freelancerJobTitle,
      skills: freelancerSkills,
      userPhotoUrl: freelancerUserPhotoUrl,
    },
    client: {
      name: clientName,
      email: clientEmail,
      jobTitle: clientJobTitle,
      skills: clientSkills,
      userPhotoUrl: clientUserPhotoUrl,
    },
    duration,
  } = contract.params;

  // ' Hande date -----------------------------------------------------
  //' - Start -> Handel Scroll Skills Container
  const scrollViewRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [dis, setDis] = useState(0);

  const scrollRight = () => {
    const maxScroll = contentWidth - scrollViewWidth;
    if (dis >= maxScroll) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
      setDis(0);
    } else {
      const newDis = Math.min(dis + 70, maxScroll);
      scrollViewRef.current?.scrollTo({ x: newDis, animated: true });
      setDis(newDis);
    }
  };

  //' - End ->----------------------------------------------------------------------------

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          {/* //' date_dots_Container */}
          <View style={styles.date_dots_Container}>
            <Text style={styles.dateText}>
              {moment(createdAt).format('D MMMM YYYY')}
            </Text>
            {/* //'28 august 2024' */}
            <TouchableOpacity
              onPress={() => {
                console.log('hi');
              }}
            >
              <MaterialCommunityIcons
                name='dots-vertical'
                size={24}
                color={theme.colors.ternaryDark}
                style={{ marginRight: 0 }}
                // onPress={}
              />
            </TouchableOpacity>
          </View>
          {/* //' contractTitle */}
          <Text style={[styles.contractTitle, styles.textColor]}>{title}</Text>
          {/* //' Fixed_price */}
          <Text style={[styles.Fixed_price]}>
            Fixed-price -Entry level-Est.budget:${budget}
          </Text>
          {/* //' contractDescription */}
          <Text style={[styles.contractDescription, styles.textColor]}>
            {description}
          </Text>
          {/* //' skillsContainer */}
          <View style={styles.skillsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              onContentSizeChange={(width) => setContentWidth(width)}
              onLayout={(event) =>
                setScrollViewWidth(event.nativeEvent.layout.width)
              }
              style={styles.skillsBox}
            >
              {skillsRequired.length > 0 ? (
                skillsRequired.map((skill, index) => {
                  return (
                    <Text key={index} style={styles.skillsItem}>
                      {skill}
                    </Text>
                  );
                })
              ) : (
                <>
                  <Text style={styles.skillsItem}>Not Found</Text>
                </>
              )}
            </ScrollView>

            <TouchableOpacity onPress={scrollRight}>
              <Icon
                name='chevron-thin-right'
                size={30}
                color={theme.colors.colorTextBlue}
                style={styles.arrowRightIcon}
                onPress={scrollRight}
              />
            </TouchableOpacity>
          </View>

          {/* //' Client & Freelancer  */}
          {/* //' ------------Client   */}
          <View style={styles.roleContaienr}>
            <Text style={styles.roleTitle}>Client</Text>
            <View style={styles.userContainer}>
              <View style={styles.userImage}>
                <Image
                  source={{
                    uri: clientUserPhotoUrl,
                  }}
                  style={{ width: '100%', height: '100%', borderRadius: 20 }}
                />
              </View>
              <Text style={styles.userName}>{clientName}</Text>
            </View>
          </View>
          {/* //' ------------Freelancer  */}
          <View style={styles.roleContaienr}>
            <Text style={styles.roleTitle}>Freelancer</Text>
            <View style={styles.userContainer}>
              <View style={styles.userImage}>
                <Image
                  source={{
                    uri: freelancerUserPhotoUrl,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                ></Image>
              </View>
              <Text style={styles.userName}>{freelancerName}</Text>
            </View>
          </View>

          {/* //' Price &    Duration  */}
          <View style={[styles.price_duration_Contaienr, styles.d_flex_Row]}>
            <View style={[styles.priceContaienr, styles.d_flex_Column]}>
              <Text style={styles.mainTitle}>Price</Text>
              <Text style={styles.price}>${budget}</Text>
            </View>
            <View style={[styles.durationContaienr, styles.d_flex_Column]}>
              <Text style={styles.mainTitle}>Duration</Text>
              <Text style={styles.duration}>{calcDuration(duration)}</Text>
            </View>
          </View>

          {/* //'  Status  */}

          {userRole == 'freelancer' ? (
            <>
              {/* //' Client_Status */}
              <Text style={styles.Client_Status}>
                Client Status: {status == 1 ? 'closed' : 'not closed yet'}
              </Text>
            </>
          ) : (
            <>
              <View style={styles.close_contract_Container}>
                <ContractBtn
                  bgc={theme.colors.primaryDark}
                  borderColor={theme.colors.primaryDark}
                  textSize={14}
                  textColor={theme.colors.white}
                  fontWeight={'regular'}
                  paddingHorizontal={5}
                  paddingVertical={0}
                  mode={'contained'}
                  onPress={() => {}}
                  clickText={'close contract'}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondaryDark,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  detailsContainer: {
    backgroundColor: theme.colors.secondaryGray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: theme.borderRadius,
  },
  date_dots_Container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    color: theme.colors.ternaryDark,
  },
  textColor: {
    color: theme.colors.white,
  },
  contractTitle: {
    fontSize: 17,
    fontWeight: 'regular',
    padding: 5,
    marginVertical: 10,
  },
  Fixed_price: {
    color: theme.colors.ternaryDark,
    marginVertical: 10,
    fontSize: 11,
    fontWeight: 'regular',
  },
  contractDescription: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'regular',
    marginVertical: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  skillsBox: {
    flexDirection: 'row',
  },
  skillsItem: {
    backgroundColor: theme.colors.secondaryBright,
    color: theme.colors.ternaryDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius,
    marginRight: 8,
  },
  roleContaienr: {
    marginBottom: 20,
  },
  roleTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'regular',
    color: theme.colors.white,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    marginLeft: 10,
  },
  // userImage: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   overflow: "hidden",
  // },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of the width/height to make it circular
    overflow: 'hidden',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    display: 'flex', // Ensure flexbox is applied
  },
  userName: {
    fontSize: 14,
    fontWeight: 'regular',
    color: theme.colors.white,
  },
  price_duration_Contaienr: {
    marginVertical: 10,
    width: '95%',
  },
  d_flex_Row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  d_flex_Column: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'regular',
    color: theme.colors.white,
  },
  price: {
    color: theme.colors.ternaryDark,
  },
  duration: {
    color: theme.colors.ternaryDark,
  },
  close_contract_Container: {
    marginTop: 40,
  },
  Client_Status: {
    fontSize: 12,
    fontWeight: 'regular',
    color: theme.colors.ternaryDark,
    marginVertical: 20,
    textAlign: 'center',
  },
});
export default ContractDetails;
