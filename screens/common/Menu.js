import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import useLogout from "../../hooks/useLogout";
// import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../store/theme_slice";
import useTheme from "../../hooks/useTheme";
const Menu = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = useLogout();

  const mode = useSelector((state) => state.themeMode.mode);
  const [isDark, setIsDark] = useState(mode === "dark");
  const handelThemeMode = () => {
    setIsDark(mode === "dark");
    dispatch(changeMode());
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuItems}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Balance")}>
          <View style={styles.BalanceBox}>
            <AntDesign name="barschart" color={theme.colors.white} size={30} />
            <Text style={styles.BalanceText}>Balance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("PasswordSettings")}>
          <View style={styles.BalanceBox}>
            <AntDesign name="lock1" color={theme.colors.white} size={30} />
            <Text style={styles.BalanceText}>Password Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={handelThemeMode}>
          <View style={styles.BalanceBox}>
            {isDark === true ? (
              <>
                <MaterialIcons
                  name="light-mode"
                  color={theme.colors.primaryBright}
                  size={30}
                />
                <Text style={styles.BalanceText}>Change To Dark Mode</Text>
              </>
            ) : (
              <>
                <MaterialIcons
                  name="dark-mode"
                  color={theme.colors.white}
                  size={30}
                />
                <Text style={styles.BalanceText}>Change To Light Mode</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={logout}
        style={styles.logoutContainer}>
        <View style={styles.LogoutBox}>
          <Entypo name="log-out" color={theme.colors.white} size={27} />
          <Text style={styles.BalanceText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryDark,
      padding: 10,
    },
    menuItems: {
      marginTop: 25,
      marginBottom: 25,
      marginLeft: 5,
      flexGrow: 1,
    },
    BalanceBox: {
      flexDirection: "row",
      gap: 15,
      marginBottom: 40,
      alignItems: "center",
    },
    BalanceText: {
      color: theme.colors.white,
      alignSelf: "center",
      fontSize: 20,
    },
    LogoutBox: {
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    logoutContainer: {
      marginBottom: 30,
    },
  });
