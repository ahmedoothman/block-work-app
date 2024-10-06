import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';

const CustomBtn = ({ handlePress, txt }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text
            variant='headlineSmall'
            style={{ color: theme.colors.colorTextBlue, marginBottom: 5 }}
          >
            {' '}
            {txt}{' '}
          </Text>
          <Icon
            name='arrow-forward-ios'
            color={theme.colors.colorTextBlue}
            size={25}
          ></Icon>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomBtn;
