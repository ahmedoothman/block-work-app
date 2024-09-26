import { View, Text } from 'react-native';
import React from 'react';
import theme from '../../theme';
const SignIn = () => {
  return (
    <View>
      <Text style={{ color: theme.colors.primary }}>SignIn</Text>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.secondary,
          padding: 10,
          margin: 10,
          width: 150,
          borderRadius: theme.borderRadius,
        }}
      >
        <Text>Don't have an account?</Text>
        <Text style={{ color: theme.colors.primary }}>Sign Up</Text>
      </View>
    </View>
  );
};

export default SignIn;
