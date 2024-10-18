import { TouchableOpacity, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import theme from '../theme';
const screenOptionsWithHeader = (title,showIcon=true) => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  return {
    headerStyle: { backgroundColor: theme.colors.secondaryDark },
    headerTintColor: theme.colors.white,
    headerTitle: title,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Image
            source={{
              uri: user.userPhotoUrl
                ? user.userPhotoUrl
                : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.white,
            }}
          />
        </View>
      </TouchableOpacity>
    ),
    headerRight: showIcon? () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Messages');
        }} // Navigate to Alert screen
        style={{ marginRight: 15 }}
      >
        <MaterialCommunityIcons
          name='message-text-outline'
          size={24}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    ):null,
  };
};

export default screenOptionsWithHeader;
