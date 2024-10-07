import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import {
  Avatar,
  Icon,
  ActivityIndicator,
  Snackbar,
  Text,
  IconButton,
  Divider,
} from 'react-native-paper';
import RoundedBox from '../../components/profile/RoundedBox';
import CustomBtn from '../../components/profile/CustomBtn';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const { height } = Dimensions.get('window');
const onDismissSnackBar = () => setVisible(false);

const Profile = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({
    name: user.name,
    jobTitle: user.jobTitle,
    bio: user.bio,
    country: user.country,
    skills: user.skills,
    userPhotoUrl: user.userPhotoUrl,
  });
  const handlePortofolio = () => {
    navigation.navigate('Portofolio', {
      userId: user._id,
    });
  };
  const handleReviews = () => {
    navigation.navigate('Reviews', {
      userId: user._id,
    });
  };
  const handleUpdate = () => {
    navigation.navigate('UpdateProfile', {
      userdata: user,
    });
  };
  useEffect(() => {
    setUserData({
      name: user.name,
      jobTitle: user.jobTitle || 'No job title',
      bio: user.bio || 'No bio',
      country: user.country,
      skills: user.skills || [],
      userPhotoUrl: user.userPhotoUrl,
    });
  }, [user]);
  return (
    <>
      {user && (
        <View style={styles.container}>
          <View>
            <View style={styles.avtarView}>
              <View style={styles.avtarView}>
                <Avatar.Image
                  size={70}
                  source={{ uri: userData.userPhotoUrl }}
                />
                <View style={{ justifyContent: 'space-between', margin: 10 }}>
                  <Text variant='titleLarge' style={styles.title}>
                    {userData.name}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      source='map-marker-outline'
                      color={theme.colors.ternaryDark}
                      size={25}
                    />
                    <Text
                      variant='titleSmall'
                      style={{ color: theme.colors.ternaryDark }}
                    >
                      {userData.country}
                    </Text>
                  </View>
                </View>
              </View>
              <IconButton
                icon={'account-edit-outline'}
                size={35}
                iconColor={theme.colors.primaryBright}
                onPress={handleUpdate}
              />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.bioView}>
              <Text variant='titleLarge' style={styles.title}>
                {userData.jobTitle}
              </Text>
              <Text variant='titleMedium' style={styles.title}>
                {'\n'}
                {userData.bio}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.bioView}>
              <Text variant='titleLarge' style={styles.title}>
                {' '}
                Skills:{' '}
              </Text>
              <View
                style={{ flexDirection: 'row', margin: 5, flexWrap: 'wrap' }}
              >
                {userData.skills.map((s, index) => (
                  <RoundedBox key={index} txt={s} />
                ))}
                {userData.skills.length === 0 && (
                  <Text variant='titleMedium' style={styles.title}>
                    No skills added
                  </Text>
                )}
              </View>
            </View>
            <View>
              <CustomBtn txt={'Portofolio'} handlePress={handlePortofolio} />
              <CustomBtn txt={'Reviews'} handlePress={handleReviews} />
            </View>
          </View>

          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={styles.snackbarStyle}
          >
            {errorMessage}
          </Snackbar>
        </View>
      )}
    </>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryDark,
  },
  avtarView: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6, // More dynamic height
  },
  snackbarStyle: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  title: {
    color: theme.colors.ternaryLight,
    // margin:5,
  },
  divider: {
    backgroundColor: theme.colors.secondaryBright,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  bioView: {
    margin: 10,
  },
});
