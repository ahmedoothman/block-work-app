import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import useTheme from "../../hooks/useTheme";
 
const Logo = () => {
      const theme = useTheme();
      const styles = createStyles(theme);
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require("../../assets/images/logo.png")}
                style={[styles.logoImage, { color: theme.colors.primaryBright }]}
            />
            <Text style={[styles.logoText, { color: theme.colors.primaryBright }]}>BlockWork</Text>
        </View>
    );
}

const createStyles = (theme) =>
  StyleSheet.create({
    logoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 15,
    },
    logoImage: {
      width: 40,
      height: 40,
      marginRight: 7,
    },
    logoText: {
      fontSize: 28,
      // fontFamily: "Anton", //! under handeling
      fontWeight: "regular",
    },
  });

export default Logo;
