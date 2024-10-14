import React from 'react';
import { View, Text, Button } from 'react-native';
import useLogout from '../../hooks/useLogout';
import useTheme from "../../hooks/useTheme";
const Settings = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
  const logout = useLogout();

  return (
    <View style={{ padding: 20 }}>
      <Text>Settings</Text>

      {/* Button to trigger the logout function */}
      <Button title='Logout' onPress={logout} />
    </View>
  );
};
const createStyles = (theme) =>
  StyleSheet.create({})
export default Settings;
