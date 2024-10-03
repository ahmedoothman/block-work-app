import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Card, Text } from "react-native-paper";
import theme from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../btns/AppButton";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
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
  } = PropsalData;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ClientProposalsDetails", {
      proposal: PropsalData,
      date: createdAt,
      isClient: { isClient },
      jobDetails: jobDetails ,
    });
  };

  return (
    <>
      {/* <TouchableOpacity activeOpacity={0.8} onPress={handlePress}> */}
      <Card style={styles.card}>
        <View style={styles.freelanceContainer}>
          <View style={styles.userImage}>
            <Image
              source={{
                uri: freelancerPhoto,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}></Image>
          </View>
          <Text style={styles.userName}>{freelancerName}</Text>
        </View>

        <Card.Content>
          <View style={styles.View}>
            <Text variant="bodyMedium" style={styles.label}>
              {proposelCoverLetter}
            </Text>
            {/* <Text variant="bodySmall" style={styles.date}>
                {createdAt}
              </Text> */}
          </View>
          {/* <Text variant="bodyMedium" style={styles.date}>
              {status}
            </Text> */}
          <AppButton
            buttonTitle={"View"}
            onPress={handlePress}
            loading={loading}
            marginBottom={1}
            marginX={"auto"}
          />
        </Card.Content>
      </Card>
      {/* </TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({
  View: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  date: {
    color: theme.colors.ternaryDark,
  },
  label: {
    color: theme.colors.white,
    textAlign: "center",
    margin: "auto",
  },
  card: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
  },
  freelanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    marginLeft: 10,
    padding: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  userName: {
    fontSize: 14,
    fontWeight: "regular",
    color: theme.colors.white,
  },
});
