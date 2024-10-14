import { View, Text } from 'react-native';
import React from 'react';
import useTheme from "../../hooks/useTheme";
const AccountInfoSettings = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
  return (
    <View>
      <Text>AccountInfoSettings</Text>
    </View>
  );
};
const createStyles = (theme) =>
  StyleSheet.create({})
export default AccountInfoSettings;
