import React from 'react';
import { View, Text, Button } from 'react-native';
import useLogout from '../../hooks/useLogout';

const Settings = () => {
  const logout = useLogout();

  return (
    <View style={{ padding: 20 }}>
      <Text>Settings</Text>

      {/* Button to trigger the logout function */}
      <Button title='Logout' onPress={logout} />
    </View>
  );
};

export default Settings;
