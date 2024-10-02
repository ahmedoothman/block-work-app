import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import theme from "../../theme";
import { getPortfolioService } from "../../services/portofolioService";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useEffect, useState } from "react";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import NoDataBox from '../../components/NoData/NoDataBox';

const { height } = Dimensions.get("window");
export default function Portofolio() {
  //{route}
  // const { userId} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [protofolioProjects, setProtofolioProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const { _id, role } = user;
 
  const checkFreelancerRole = role === "freelancer";
  const isEdit=false;
  
     
  useEffect(() => {
    const fetchPortofolioProjects = async () => {
      setIsLoading(true);

      const response = await getPortfolioService(_id);
      // console.log("responseee", response.data.length)
      if (response.status === "success") {
        setProtofolioProjects(response.data);
        
      } else {
        setError(true);
        setErrorMessage(response.message);
        setVisible(true);
        setProtofolioProjects([]);
      }
      setIsLoading(false);
    };
    fetchPortofolioProjects();
  }, [_id]);

  return (
    <View style={styles.container}>
      {/* AddNewButton Box*/}
      {checkFreelancerRole && (
        <View>
          <TouchableOpacity
            style={styles.AddNewBox}
            onPress={() => navigation.navigate("CreatePortofolio",{isEdit})}
            activeOpacity={0.8}
          >
            <AntDesign
              name="pluscircleo"
              size={25}
              color={theme.colors.primaryBright}
            />
            <Text style={styles.AddNewText}>Add New</Text>
          </TouchableOpacity>
        </View>
      )}

      {/*Projects Box*/}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator
            animating={true}
            color={theme.colors.primaryBright}
            size={50}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.ProjectsBox}>
          {protofolioProjects.length?(protofolioProjects.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.projectItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("PortofolioItemDetails",{item,checkFreelancerRole})}
            >
              <Image
                source={{
                  uri: item.files[3],
                }}
                style={styles.image}
              />
              <Text style={styles.ProjectName}>{item.description}</Text>
            </TouchableOpacity>
          ))):( <View style={styles.NoDataContainer}>
                 <NoDataBox Title={"No projects found"} show={false} Massage={"You don't have projects in your protofolio, add some and it will appear here"}/>
               </View>
              )}
        </View>
        </ScrollView>
      )}

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbarStyle}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    position: "relative",
  },
  AddNewBox: {
    margin: 20,
    flexDirection: "row",
    gap: 10,
  },
  AddNewText: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
  },
  ProjectsBox: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:"red",
    flexWrap: "wrap",
  },
  scrollContainer: {
    paddingBottom: 20, 
  },
  projectItem: {
    width: "47%",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  ProjectName: {
    color: theme.colors.primaryBright,
    alignSelf: "center",
    marginTop: 8,
    fontSize: 15,
  },
  snackbarStyle: {
    backgroundColor: "#B31312",
    borderRadius: theme.borderRadius,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.6,
  },
  NoDataContainer: {
    flex: 1,
    justifyContent: 'center',  // Center vertically
    alignItems: 'center',      // Center horizontally
   
  }
});

{
  /*static Design*/
}
{
  /* <View style={styles.ProjectsBox}>
        
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("PortofolioItemDetails")}
        >
          <View>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
              style={styles.image}
            />
            <Text style={styles.ProjectName}>Dwelling Deals</Text>
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("PortofolioItemDetails")}
        >
          <View>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/162622/facebook-login-office-laptop-business-162622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
              style={styles.image}
            />
            <Text style={styles.ProjectName}>Portfolio Dashboard</Text>
          </View>
        </TouchableOpacity>
      </View> */
}
