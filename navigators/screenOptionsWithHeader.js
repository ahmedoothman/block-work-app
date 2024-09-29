import { TouchableOpacity, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const screenOptionsWithHeader = (title) => {
  const navigation = useNavigation();
  return {
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerTitle: title,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')} // Navigate to Alert screen
      >
        <View style={{ marginLeft: 10 }}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'white',
            }}
          />
        </View>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Alert')} // Navigate to Alert screen
        style={{ marginRight: 15 }}
      >
        <MaterialCommunityIcons name='bell' size={24} color='white' />
      </TouchableOpacity>
    ),
  };
};

export default screenOptionsWithHeader;
