import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../../theme';

export default function SearchBox({ placeholder, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <View style={styles.assembler}>
      <View style={styles.Main}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.secondaryBright}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <AntDesign name='search1' size={20} style={styles.searchIconTextBox} />
      </View>
      <View style={styles.buttonP}>
        <TouchableOpacity onPress={handleSearch}>
          <AntDesign name='search1' size={25} style={styles.iconLeft} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assembler: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },

  Main: {
    backgroundColor: theme.colors.white,
    width: 266,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 10,
  },

  searchInput: {
    marginLeft: 10,
    marginTop: 5,
    paddingLeft: 34,
    fontSize: 15.5,
  },

  searchIconTextBox: {
    position: 'absolute',
    top: 9,
    left: 14,
    color: theme.colors.secondaryDark,
  },

  buttonP: {
    height: 38,
    width: 39.2,
    backgroundColor: theme.colors.primaryBright,
    borderWidth: 1,
    borderColor: theme.colors.primaryBright,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  iconLeft: {
    marginRight: 2,
    color: theme.colors.white,
  },
});
