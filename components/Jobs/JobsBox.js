import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import theme from "../../theme";
import Icon from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window'); // Get screen width for responsiveness Nice


const formatTimeAgo = (dateString) => {
  const now = new Date();
  const createdAt = new Date(dateString);
  const timeDiff = Math.abs(now - createdAt);
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hoursDiff < 1) {
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    return minutesDiff === 1 ? "1 minute ago" : `${minutesDiff} minutes ago`;
  } else if (hoursDiff < 24) {
    return hoursDiff === 1 ? "1 hour ago" : `${hoursDiff} hours ago`;
  } else {
    const daysDiff = Math.floor(hoursDiff / 24);
    return daysDiff === 1 ? "1 day ago" : `${daysDiff} days ago`;
  }
};

export default function JobsBox({ jobData }) {
  const postingTimeOfJob = formatTimeAgo(jobData.createdAt);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("JobsDetails", {
          jobDetails: jobData,
          postingTimeOfJob: postingTimeOfJob,
        })
      }>
      <View style={styles.jobBox}>
        <Text style={styles.timePriceText}>{postingTimeOfJob}</Text>
        <Text style={styles.titleDescriptionText}>{jobData.title}</Text>
        <Text style={styles.timePriceText}>
          Fixed-price - Entry level - Est. budget: ${jobData.budget}
        </Text>
        <Text style={styles.descriptionText}>
          {jobData.description} <Text style={styles.moreText}>{"\n"}more</Text>
        </Text>

        {/* Skills Box */}
        <View style={styles.skillsBox}>
          {jobData.skillsRequired.map((skill, i) => (
            <Text key={i} style={styles.skillsItem}>
              {skill}
            </Text>
          ))}
          <Icon
            name="chevron-thin-right"
            size={20}
            color={theme.colors.primaryBright}
            style={styles.arrowRightIcon}
          />
        </View>

        {/* Payment and Stars Box */}
        <View style={styles.paymentStarsBox}>
          <View style={styles.paymentBox}>
            <AntDesign
              name="checkcircle"
              size={17}
              color={theme.colors.ternaryDark}
            />
            <Text style={styles.paymentText}>Payment Verified</Text>
          </View>
          <View style={styles.starsBox}>
            {Array.from({ length: 5 }).map((_, index) => (
              <AntDesign
                key={index}
                name="star"
                size={17}
                color={theme.colors.warning}
              />
            ))}
          </View>
        </View>

        {/* Location and Proposals Box */}
        <View style={styles.locationProposalsBox}>
          <View style={styles.locationBox}>
            <AntDesign
              name="enviromento"
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  jobBox: {
    width: width * 0.8,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
    alignSelf: "center",
  },
  timePriceText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    marginBottom: 5,
  },
  titleDescriptionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    color: "white",
    marginBottom: 10,
  },
  moreText: {
    color: theme.colors.primaryBright,
  },
  skillsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  skillsItem: {
    backgroundColor: theme.colors.secondaryBright,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    color: theme.colors.ternaryDark,
  },
  arrowRightIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
  },
  paymentStarsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentText: {
    color: theme.colors.ternaryDark,
    marginLeft: 5,
  },
  starsBox: {
    flexDirection: "row",
  },
  locationProposalsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: theme.colors.ternaryDark,
    marginLeft: 5,
  },
  proposalsBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  proposalsText: {
    color: theme.colors.ternaryDark,
  },
});
