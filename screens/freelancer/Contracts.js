import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../../theme";
import ContractBtn from "../../components/btns/ContractBtn";
import { useNavigation } from "@react-navigation/native";
import ContractBox from "../../components/Contracts/ContractBox";
import { getAllFreelancerContract } from "../../services/contractService";
import { ActivityIndicator } from "react-native-paper";
const Contracts = () => {
  const navigation = useNavigation();

  const [isActive, setIsActive] = useState(true);
  const [isArchived, setIsArchived] = useState(false);

  const [activecontracts, setActivecontracts] = useState();
  const [archivedContracts, setArchivedContracts] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchAllFreelancerContracts = async () => {
      const response = await getAllFreelancerContract();
      if ((response.status = "success")) {
        //' set just the active contracts to the  [activecontracts state]
        const activeContractsList = response.data.filter(
          (contract) => contract.job.isActive == true
        );
        setActivecontracts(activeContractsList);
        //' set just the archived contracts to the  [archivedContracts state]
        const archivedContractsList = response.data.filter(
          (contract) => contract.job.isActive == false
        );
        setArchivedContracts(archivedContractsList);
      } else {
        console.log("error ->", response.message);
        setError(true);
        setErrorMessage(response.message);
      }
      setLoading(false);
    };
    fetchAllFreelancerContracts();
  }, []);

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primaryBright} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.btnContaienr}>
        <ContractBtn
          bgc={isActive ? theme.colors.primaryDark : "transparent"}
          borderColor={theme.colors.primaryDark}
          textSize={14}
          textColor={isActive ? theme.colors.white : theme.colors.colorTextBlue}
          fontWeight={"regular"}
          paddingHorizontal={5}
          paddingVertical={0}
          mode={isActive ? "contained" : "outlined"}
          onPress={() => {
            setIsActive(true);
            setIsArchived(false);
          }}
          clickText={"Active"}
        />
        <ContractBtn
          bgc={isArchived ? theme.colors.primaryDark : "transparent"}
          borderColor={theme.colors.primaryDark}
          textSize={14}
          textColor={
            isArchived ? theme.colors.white : theme.colors.colorTextBlue
          }
          fontWeight={"regular"}
          paddingHorizontal={5}
          paddingVertical={0}
          mode={isArchived ? "contained" : "outlined"}
          onPress={() => {
            setIsArchived(true);
            setIsActive(false);
          }}
          clickText={"Archived"}
        />
      </View>

      <View style={styles.headertitleContainer}>
        <Text style={styles.headertitle}>
          {isActive ? "Active" : "Archived"} Contracts
        </Text>
      </View>

      {isActive ? (
        // ' in case of there are active Contracts
        activecontracts?.length > 0 ? (
          <View style={styles.contractsContainer}>
            {activecontracts?.map((contract, index) => {
              return (
                <ContractBox
                  key={index}
                  onPress={() => {
                    navigation.navigate("ContractDetails", contract);
                  }}
                  jopTitle={contract.job.title}
                />
              );
            })}
          </View>
        ) : (
          // ' in case of there are no active Contracts
          <View style={styles.noDatacontentContainer}>
            <Text style={styles.noDataTitle}>
              There is no active Contracts.
            </Text>
            <Text style={styles.noDataMessage}>
              Contracts you’re actively work on wil appear here.
            </Text>
            <View>
              <ContractBtn
                bgc={theme.colors.primaryDark}
                borderColor={theme.colors.primaryDark}
                textSize={14}
                textColor={theme.colors.white}
                fontWeight={"regular"}
                paddingHorizontal={5}
                paddingVertical={0}
                mode={"contained"}
                onPress={() => {
                  navigation.navigate("Jobs");
                }}
                clickText={"Search for new projects"}
              />
            </View>
          </View>
        )
      ) : archivedContracts?.length > 0 ? (
        // ' in case of there are archived Contracts
        // <View style={styles.contentContainer}>
        //   <Text style={styles.headertitle}>Archived Contracts content</Text>
        // </View>
        <View style={styles.contractsContainer}>
          {archivedContracts?.map((contract, index) => {
            return (
              <ContractBox
                key={index}
                onPress={() => {
                  navigation.navigate("ContractDetails");
                }}
                contractTitle={contract.title}
              />
            );
          })}
        </View>
      ) : (
        // ' in case of there are NO archived Contracts
        <View style={styles.noDatacontentContainer}>
          <Text style={styles.noDataTitle}>
            There is no archived Contracts.
          </Text>
          <Text style={styles.noDataMessage}>
            archived Contracts wil appear here.
          </Text>
          <View>
            <ContractBtn
              bgc={theme.colors.primaryDark}
              borderColor={theme.colors.primaryDark}
              textSize={14}
              textColor={theme.colors.white}
              fontWeight={"regular"}
              paddingHorizontal={5}
              paddingVertical={0}
              mode={"contained"}
              onPress={() => {
                navigation.navigate("Jobs");
              }}
              clickText={"Search for new projects"}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.secondaryDark,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
    paddingHorizontal: 20,
  },
  btnContaienr: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginVertical: 25,
  },
  contractsContainer: {
    // marginVertical: 10,
  },

  headertitleContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  headertitle: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: "regular",
  },

  noDatacontentContainer: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  noDataTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: "regular",
    textAlign: "center",
  },
  noDataMessage: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "regular",
    textAlign: "center",
    paddingHorizontal: 15,
    marginVertical: 20,
  },
});

export default Contracts;
