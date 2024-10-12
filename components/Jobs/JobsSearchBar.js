import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';
import { categories, skillsEnum } from '../../constants/global/data';

export default function JobsSearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');

  const handleSearch = () => {
    onSearch(searchText, selectedCategory, selectedSkill);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search for jobs'
          placeholderTextColor={theme.colors.secondaryBright}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <AntDesign name='search1' size={20} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label='All Categories' value='All' />
          {categories.map((category) => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedSkill}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedSkill(itemValue)}
        >
          <Picker.Item label='All Skills' value='All' />
          {skillsEnum.map((skill) => (
            <Picker.Item
              key={skill.value}
              label={skill.label}
              value={skill.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 34,
    fontSize: 15.5,
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '45%',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
});
