import { View, StyleSheet } from 'react-native';
import React from 'react';
import useTheme from "../../hooks/useTheme";
import { Surface, Text } from 'react-native-paper';

export default function RoundedBox({ txt }) {
    const theme = useTheme();
    const styles = createStyles(theme);
  return (
    <Surface style={styles.surface} elevation={4}>
      <Text variant='titleMedium' style={styles.text}>
        {txt}
      </Text>
    </Surface>
  );
}
const createStyles = (theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.ternaryDark,
      textAlign: "center",

      // margin:5
    },
    surface: {
      padding: 5,
      // height: 40,
      paddingHorizontal: 10,
      alignSelf: "flex-start",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.secondaryBright,
      margin: 4,
    },
  });
