import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useLogout from '../../hooks/useLogout';

const Menu = () => {
  const navigation = useNavigation();
  const logout = useLogout();

  return (
    <View style={styles.container}>
      <View style={styles.menuItems}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Balance')}
        >
          <View style={styles.BalanceBox}>
            <AntDesign name='barschart' color='white' size={30} />
            <Text style={styles.BalanceText}>Balance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('PasswordSettings')}
        >
          <View style={styles.BalanceBox}>
            <AntDesign name='lock1' color='white' size={30} />
            <Text style={styles.BalanceText}>Password Settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={logout}
        style={styles.logoutContainer}
      >
        <View style={styles.LogoutBox}>
          <Entypo name='log-out' color='white' size={27} />
          <Text style={styles.BalanceText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  menuItems: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 5,
    flexGrow: 1,
  },
  BalanceBox: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  BalanceText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 22,
  },
  LogoutBox: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutContainer: {
    marginBottom: 30,
  },
});
