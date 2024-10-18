import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import theme from "../../theme";
import { categories, skillsEnum } from "../../constants/global/data";
import { Dropdown } from "react-native-element-dropdown";
export default function JobsSearchBar({
  searchFilter,
  skillFilter,
  categoryFilter,
  statusFilter,
  isClient,
}) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [status, setStatus] = useState("All");

  const handleSearch = () => {
    searchFilter(searchText);
  };

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
    if (categoryFilter) {
      categoryFilter(itemValue);
    }
  };

  const handleSkillChange = (itemValue) => {
    setSelectedSkill(itemValue);
    if (skillFilter) {
      skillFilter(itemValue);
    }
  };
  const statusOptions = [
    { label: "All", value: "All" },
    { label: "completed", value: "completed" },
    { label: "in-progress", value: "in-progress" },
    { label: "open", value: "open" },
  ];

  const handleStatusChange = (itemValue) => {
    setStatus(itemValue);
    if (skillFilter) {
      statusFilter(itemValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title or Budget"
          placeholderTextColor={theme.colors.secondaryBright}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <AntDesign name="search1" size={20} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <View
          style={[
            styles.pickerWrapper,
            isClient === true ? { width: "48%" } : { width: "48%" },
          ]}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => {
              handleCategoryChange(itemValue);
            }}>
            <Picker.Item label="All Categories" value="All" />
            {categories.map((category) => (
              <Picker.Item
                key={category.value}
                label={category.label}
                value={category.value}
              />
            ))}
          </Picker>
        </View>
        <View
          style={[
            styles.pickerWrapper,
            isClient === true ? { width: "48%" } : { width: "48%" },
          ]}>
          <Picker
            value="Add skills"
            selectedValue={selectedSkill}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => {
              handleSkillChange(itemValue);
            }}>
            <Picker.Item label="All Skills" value="All" />
            {skillsEnum.map((skill) => (
              <Picker.Item
                key={skill.value}
                label={skill.label}
                value={skill.value}
              />
            ))}
          </Picker>
        </View>
        {isClient && (
          <View
            style={[
              styles.pickerWrapper,
              isClient === true ? { width: "50%" } : { width: "48%" },
            ]}>
            <Dropdown
              data={statusOptions}
              placeholder={"status"}
              labelField="label"
              valueField="value"
              value={status}
              placeholderStyle={{ color: theme.colors.ternaryDark }}
              selectedTextStyle={{ color: theme.colors.secondaryGray }}
              onChange={(item) => {
                handleStatusChange(item.value);
              }}
              style={styles.dropdown}
              maxHeight={200}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.ternaryLight,
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.ternaryLight,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 10,
    fontSize: 14,
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    borderRadius: 10,
    padding: 5,
    rowGap: 5,
  },
  pickerWrapper: {
    // borderWidth: 1,
    // borderColor: theme.colors.primaryDark,
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    backgroundColor: theme.colors.ternaryLight,
    borderRadius: 10,
    height: "auto",
  },
  pickerItem: {
    color: "red",
  },
  dropdown: {
    backgroundColor: theme.colors.ternaryLight,
    borderRadius: 5,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 2,
    padding: 10,
    color: theme.colors.ternaryDark,
  },
});
