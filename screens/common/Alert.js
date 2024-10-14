import { View, Text } from 'react-native'
import React from 'react'
import useTheme from "../../hooks/useTheme";
export default function Alert() {
    const theme = useTheme();
    const styles = createStyles(theme);
  return (
    <View>
      <Text>Alert</Text>
    </View>
  )
}

const createStyles = (theme) =>
  StyleSheet.create({})