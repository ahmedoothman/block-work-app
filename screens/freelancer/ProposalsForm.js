import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { submitProposalService } from "../../services/proposalService";
import { ActivityIndicator, Snackbar } from "react-native-paper";

const ProposalsForm = ({ route }) => {
  const { jobData, postingTimeOfJob } = route.params;
  const { category, description, title, _id } = jobData;

  const navigation = useNavigation();
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedAmount, setProposedAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);
  const ServiceFee = proposedAmount * 0.1;
  const AmountReceived = proposedAmount - ServiceFee;

  const handleApplyBtn = async () => {
    if (!coverLetter || !proposedAmount || !duration) {
      setMessage("Please fill in all fields");
      setVisible(true);
      return;
    }
    const data = {
      coverLetter: coverLetter,
      proposedAmount: +proposedAmount,
      duration: +duration,
    };
    setIsLoading(true);
    try {
      if (duration && proposedAmount && coverLetter) {
        const response = await submitProposalService(_id, data);
        // console.log("responseeeeeee",response);
        console.log(_id, data);
        if (response.status === "success") {
          setSuccess(true);
          // console.log("AAAAAAAAAAA",response.message)
          //!!There is No field message in response !!
          // setMessage(response.message);
          setMessage("Proposal submitted successfully");
          setVisible(true);
          handleResetForm();
          // console.log("Sucessssssss🟢")
          setTimeout(() => {
            navigation.navigate("Proposals");
          }, 2000);
        } else {
          // console.log("Failllllll🔴",response.status)
          setMessage(response.message);
          setVisible(true);
          setSuccess(false);
        }
      }
    } catch (error) {
      console.log("errorrrrr", error);
      setSuccess(false);
      setMessage(error.message);
      setVisible(true);
    }
    setIsLoading(false);
  };

  function handleResetForm() {
    setCoverLetter("");
    setProposedAmount("");
    setDuration("");
  }
  return (
    <ScrollView style={styles.container}>
      {/*Job details Box*/}
      <View style={{ marginTop: 25 }}>
        <View style={styles.jobBox}>
          <Text style={styles.titleDescribtionText}>Job details</Text>
          <Text style={styles.titleDescribtionText}>
            {/* One page website, html5, bootstrap5 */}
            {title}
          </Text>

          {/* Skills Box*/}
          <View style={styles.skillsBox}>
            <Text style={styles.skillsItem}>{category}</Text>
            <Text style={styles.PostingTimeText}>
              Posted {postingTimeOfJob}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.titleDescribtionText}>
              {description} for One page website, Html5, bootstrap5. Same super
              simple page as verum.capital for instance.Landing on full screen
              picture,then 5 sections on black.Same fonts.See screenshots
              included.Fill with lorem ispum
            </Text>
          </View>
        </View>
      </View>

      {/* Terms Box*/}
      <View style={styles.secondBox}>
        {/*Texts Box*/}
        <View style={styles.borderSection}>
          <Text style={styles.titleDescribtionText}>Terms</Text>
          <Text style={styles.titleDescribtionText}>
            What is the full amount you’d like to bid for this job ?
          </Text>
          <Text style={styles.timePriceText}>
            Total amount the client will see on your proposal
          </Text>
          {/* input field Box */}
          <View style={styles.Main}>
            <TextInput
              style={styles.textInput}
              placeholder="$50.0"
              placeholderTextColor={theme.colors.ternaryDark}
              placeholderStyle={{ marginLeft: 10 }}
              value={proposedAmount}
              onChangeText={(value) => setProposedAmount(value)}
            />
          </View>
        </View>
        {/*freelanceServiceFee Section*/}
        <View style={styles.freelanceFeesSection}>
          <Text style={styles.titleDescribtionText}>
            {" "}
            10% Freelancer Service Fee
          </Text>
          <Text style={styles.timePriceText}>-${ServiceFee || 3.5}</Text>
        </View>
        {/*Receive Section*/}
        <View style={styles.receiveFeesSection}>
          <Text style={styles.titleDescribtionText}>You”ll Receive</Text>
          <Text style={styles.timePriceText}>
            The estimated amount you’ll receive after service fee $
            {AmountReceived || 31.5}
          </Text>
        </View>
      </View>

      {/*How long project take section in second screen*/}
      <View style={styles.projectTimeBox}>
        <Text style={styles.titleDescribtionText}>
          How long will this project take?{" "}
        </Text>
        <View style={styles.Main}>
          <TextInput
            style={styles.textInput}
            value={duration}
            onChangeText={(value) => setDuration(value)}
          />
        </View>
      </View>

      {/*Cover Letter Box Section in Second Screen*/}
      <View style={styles.coverLetterBox}>
        <Text style={{ color: "white", fontSize: 14, marginBottom: -6 }}>
          Cover Letter{" "}
        </Text>
        <View style={styles.coverLetterInput}>
          <TextInput
            style={styles.textInput}
            multiline
            value={coverLetter}
            numberOfLines={9}
            //  placeholder="Write your cover letter here..."
            //  placeholderTextColor={theme.colors.ternaryDark}
            textAlignVertical="top"
            onChangeText={(value) => setCoverLetter(value)}
          />
        </View>
      </View>
      <View style={styles.ApplyCancelBtnView}>
        {/* submitProposalService(_id,data) */}
        <TouchableOpacity style={styles.button} onPress={handleApplyBtn}>
          <Text style={styles.buttonText}>
            {isLoading ? "Submitting..." : "Apply Now"}
          </Text>

          {/* // !! UN COMMENT if you want !! */}
          {/* {isLoading && (
          
          <ActivityIndicator
            animating={true}
            color={theme.colors.primaryBright}
            style={styles.loadingIndicator}
            size={30}
          />
     
      )} */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={[
            styles.snackbarStyle,
            { backgroundColor: `${success ? "#388E3C" : "#B31312"}` },
          ]}
        >
          <Text style={{ color: "white" }}>{message}</Text>
        </Snackbar>
      </View>
    </ScrollView>
  );
};
//
export default ProposalsForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  textInput: {
    marginLeft: 10,
    marginTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15.5,
    color: theme.colors.ternaryDark,
  },
  Main: {
    backgroundColor: theme.colors.secondaryBright,

    width: 280,
    height: 34,
    borderWidth: 1,
    borderColor: theme.colors.secondaryBright,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  jobBox: {
    width: 310,
    height: 246,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: 8,
    marginHorizontal: 25,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 10,
  },
  timePriceText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    // marginTop: 8,
    marginBottom: 10,
  },
  PostingTimeText: {
    color: theme.colors.ternaryDark,
    fontSize: 14,
    marginTop: 8,
  },
  titleDescribtionText: {
    marginBottom: 7,
    color: "white",
    fontSize: 14.5,
  },

  skillsBox: {
    flexDirection: "row",
    // gap: 50,
    justifyContent: "space-between",
    position: "relative",
    marginTop: 20,
  },
  skillsItem: {
    marginTop: 4,
    backgroundColor: theme.colors.secondaryBright,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    color: theme.colors.ternaryDark,
  },
  borderSection: {
    borderBottomColor: theme.colors.secondaryBright,
    borderBottomWidth: 1,

    // marginTop:10,

    // marginTop:10
  },
  secondBox: {
    width: 310,
    height: 350,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: 8,
    marginHorizontal: 25,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 10,
  },
  freelanceFeesSection: {
    borderBottomColor: theme.colors.secondaryBright,
    borderBottomWidth: 1,
    marginTop: 15,
    gap: 10,
  },
  receiveFeesSection: {
    borderBottomColor: theme.colors.secondaryBright,
    // borderBottomWidth: 1,
    marginTop: 14,
    gap: 5,
  },
  projectTimeBox: {
    width: 311,
    height: 110,
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: 8,
    marginHorizontal: 25,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 10,
  },
  coverLetterBox: {
    width: 310,
    height: 246,

    borderRadius: 8,
    marginHorizontal: 5,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 10,
  },
  coverLetterInput: {
    backgroundColor: theme.colors.secondaryGray,
    width: 310,
    height: 142,
    borderWidth: 1,
    borderColor: theme.colors.secondaryGray,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  ApplyCancelBtnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    // gap:20,
    // alignItems: 'center',
    // gap:10,
    // marginTop:-10,
  },
  button: {
    marginTop: -48,
    paddingVertical: 7,
    width: 135,
    height: 34,
    backgroundColor: theme.colors.colorTextBlue,
    borderRadius: theme.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  snackbarStyle: {
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 0,
    left: -10,
    right: 0,
    width: "90%",
  },
  loadingIndicator: {
    marginLeft: 150,
    marginTop: -300,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: -350,
    // marginTop:"-70%",
    // marginRight:200,
    // marginHorizontal:'auto',
    // marginVertical:'auto',
    // position:"absolute",
    //  top:10,
    //  left:10,
  },
});
