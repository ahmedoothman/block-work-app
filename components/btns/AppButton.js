import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import theme from '../../theme';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// <ActivityIndicator animating={true} color={MD2Colors.red800} /> :
const AppButton = (props) => {
  const {
    buttonTitle,
    onPress,
    loading,
    marginBottom,
    marginX,
    btnWidth,
    paddingY,
    paddingX,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          marginBottom: marginBottom || 20,
          marginHorizontal: marginX || 0,
          width: btnWidth || 210,
          paddingVertical: paddingY || 10,
          paddingHorizontal: paddingX || 15,
        },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.white} />
      ) : (
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,

    backgroundColor: theme.colors.colorTextBlue,
    paddingVertical: 10,
    width: 210,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default AppButton;
