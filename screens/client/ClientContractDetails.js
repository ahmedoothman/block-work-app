import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import useTheme from "../../hooks/useTheme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import { calcDuration } from '../../utils';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import AppButton from '../../components/btns/AppButton';
import CustomeSnackBar from '../../components/Public/CustomeSnackBar';
import { useNavigation } from '@react-navigation/native';
import { updateContractStatusService } from '../../services/contractService';
import UserBox from '../../components/UserBox/UserBox';

const ClientContractDetails = ({ route }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const navigation = useNavigation();
  const { contract } = route.params;
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const onDismissSnackBar = () => setAlert(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handelContractStatus = async (contractId, jobId, status) => {
    setIsLoading(true);
    const response = await updateContractStatusService(
      contractId,
      jobId,
      contract.freelancer._id,
      status
    );
    if (response.status === 'success') {
      setAlert(true);
      setIsSuccess(true);
      setAlertMessage('work is finished successfully');
      setTimeout(() => {
        navigation.navigate('ReviewForm', {
          userId: contract.freelancer._id,
        });
      }, 2000);
    } else {
      setAlert(true);
      setIsSuccess(false);
      setAlertMessage(response.message);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          {/* //' date_dots_Container */}
          <View style={styles.date_dots_Container}>
            <Text style={styles.dateText}>
              {moment(contract.job.createdAt).format('D MMMM YYYY')}
            </Text>
            <TouchableOpacity onPress={() => {}}>
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
          <Text style={[styles.contractTitle, styles.textColor]}>
            {contract.job.title}
          </Text>
          {/* //' Fixed_price */}
          <Text style={[styles.Fixed_price]}>
            Fixed-price -Entry level-Est.budget:$
            {contract.job.budget}
          </Text>
          {/* //' contractDescription */}
          <Text style={[styles.contractDescription, styles.textColor]}>
            {contract.job.description}
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
              {contract.job.skillsRequired.length > 0 ? (
                contract.job.skillsRequired.map((skill, index) => {
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

          <View style={styles.roleContaienr}>
            <Text style={styles.roleTitle}>Client</Text>
            <UserBox otherUser={contract.client} isMe={true} />
          </View>
          {/* //' ------------Freelancer  */}
          <View style={styles.roleContaienr}>
            <Text style={styles.roleTitle}>Freelancer</Text>
            <UserBox otherUser={contract.freelancer} />
          </View>

          <View style={[styles.price_duration_Contaienr, styles.d_flex_Row]}>
            <View style={[styles.priceContaienr, styles.d_flex_Column]}>
              <Text style={styles.mainTitle}>Price</Text>
              <Text style={styles.price}>${contract.amount.toString()}</Text>
            </View>
            <View style={[styles.durationContaienr, styles.d_flex_Column]}>
              <Text style={styles.mainTitle}>Duration</Text>
              <Text style={styles.duration}>
                {calcDuration(contract.duration)}
              </Text>
            </View>
          </View>

          {/* //' BTNs  */}
          <View style={styles.contractBTNS_Container}>
            <AppButton
              buttonTitle={'complete contract'}
              onPress={() => {
                handelContractStatus(
                  contract._id,
                  contract.job._id,
                  'completed'
                );
              }}
              marginBottom={1}
              marginX={0}
              btnWidth={'50%'}
              paddingY={13}
              paddingX={7}
              textSize={12}
              bgColor={theme.colors.primaryDark}
            />
            <AppButton
              buttonTitle={'cancel contract'}
              onPress={() => {
                handelContractStatus(
                  contract._id,
                  contract.job._id,
                  'cancelled'
                );
              }}
              marginBottom={1}
              marginX={0}
              btnWidth={'50%'}
              paddingY={13}
              paddingX={7}
              textSize={12}
              bgColor={theme.colors.primaryDark}
            />
          </View>
          <Text style={styles.Client_Status}>
            Contract Status:{'  '}
            {contract.status}
          </Text>

          {isLoading && (
            <ActivityIndicator size='large' color={theme.colors.primaryDark} />
          )}
        </View>
      </View>
      <CustomeSnackBar
        visible={alert}
        alertMessage={alertMessage}
        onDismissSnackBar={onDismissSnackBar}
        undoText='Undo'
        undoColor='black'
        bgColor={isSuccess ? theme.colors.success : theme.colors.danger}
        messageColor='#fff'
      />
    </ScrollView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondaryDark,
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    scrollViewContainer: {
      flexGrow: 1, // Allows the ScrollView to expand
    },
    detailsContainer: {
      backgroundColor: theme.colors.secondaryGray,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 10,
      borderRadius: theme.borderRadius,
    },
    date_dots_Container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
      fontWeight: "regular",
      padding: 5,
      marginVertical: 10,
    },
    Fixed_price: {
      color: theme.colors.ternaryDark,
      marginVertical: 10,
      fontSize: 12,
      fontWeight: "regular",
    },
    contractDescription: {
      color: theme.colors.white,
      fontSize: 14,
      fontWeight: "regular",
      marginVertical: 10,
    },
    skillsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 22,
    },
    skillsBox: {
      flexDirection: "row",
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
      fontWeight: "regular",
      color: theme.colors.white,
    },
    userContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 15,
      marginLeft: 10,
    },
    userImage: {
      width: 40,
      height: 40,
    },
    userName: {
      fontSize: 14,
      fontWeight: "regular",
      color: theme.colors.white,
    },
    price_duration_Contaienr: {
      marginVertical: 10,
      width: "95%",
    },
    d_flex_Row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    d_flex_Column: {
      display: "flex",
      flexDirection: "column",
    },
    mainTitle: {
      marginBottom: 10,
      fontSize: 18,
      fontWeight: "regular",
      color: theme.colors.white,
    },
    price: {
      color: theme.colors.ternaryDark,
    },
    duration: {
      color: theme.colors.ternaryDark,
    },
    contractBTNS_Container: {
      marginTop: 20,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: 5,
    },
    Client_Status: {
      fontSize: 12,
      fontWeight: "regular",
      color: theme.colors.ternaryDark,
      marginVertical: 20,
      textAlign: "center",
    },
  });
export default ClientContractDetails;
