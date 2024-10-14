import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import useTheme from "../../hooks/useTheme";
const ContractBtn = ({
  bgc,
  borderColor,
  textSize,
  textColor,
  fontWeight,
  paddingHorizontal,
  paddingVertical,
  mode,
  onPress,
  clickText,
  loading,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Button
      style={[
        styles.Btn,
        {
          backgroundColor: bgc,
          borderColor: borderColor,
          width: "auto",
        },
      ]}
      labelStyle={{ fontSize: textSize, fontWeight: fontWeight }}
      textColor={textColor}
      contentStyle={{
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
      }}
      mode={mode}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.white} />
      ) : (
        clickText
      )}
    </Button>
  );
};

const createStyles = (theme) => StyleSheet.create({});

export default ContractBtn;
