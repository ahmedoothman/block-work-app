import { View, StyleSheet , Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import { Avatar,Icon, ActivityIndicator, Snackbar,Text, IconButton, Divider } from 'react-native-paper';
import { getMeService } from '../../services/userService';
import RoundedBox from '../../components/profile/RoundedBox';
import CustomBtn from '../../components/profile/CustomBtn';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');

 const obj={
  _id: {
    "$oid": "66f6f4704e248d72407cf561"
  },
  role: "freelancer",
  verified: false,
  accountCreatedAt: {
    $date: "2024-09-27T18:07:02.355Z"
  },
  skills: [],
  name: "OthmanAhmed",
  email: "admin1@gmail.com",
  password: "$2a$12$QnGCCCHgYAwQ6P7fusD4aeOEeOOn406gWEBAmwMktHd6cfYTx2oHC",
  phone: "01064568074",
  nationalId: "30004111104651",
  country: "egypt",
  frontIdPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/blockworkcloud.appspot.com/o/users%2F1727460424518_frontIdPhoto.jpg?alt=media&token=dd4ffcf4-1991-45e1-9a1b-bea5295bafaa",
  backIdPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/blockworkcloud.appspot.com/o/users%2F1727460424519_backIdPhoto.jpg?alt=media&token=a153e875-ee7f-4236-943a-3479d4f526ad",
  userPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/blockworkcloud.appspot.com/o/users%2F1727460424519_userPhoto.jpg?alt=media&token=a367423a-c93c-4488-96b0-b7c36908aff2",
  __v: 0
}

const onDismissSnackBar = () => setVisible(false);

const Profile = () => {
  const [user,setUser]=useState()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
const navigation=useNavigation()
const handlePortofolio=()=>{
  navigation.navigate('Portofolio',{
    userId: user._id,
    })
}
const handleReviews=()=>{
  navigation.navigate('Reviews',{
    userId: user._id,
    })
}
const handleUpdate=()=>{
  navigation.navigate('UpdateProfile',{
    userdata: user,
    })
}


  useEffect(()=>{
      const fetchUser= async()=>{
        const response= await getMeService();
        if(response.status==='success'){
          setUser(response.data)

        }else{
          setError(true);
          setErrorMessage(response.message);
          setVisible(true)
          setUser('')
        }
       setIsLoading(false)
      }
      fetchUser()
  });

  return (
    <>
    <View style={styles.container}>
      {isLoading?(
        <View style={styles.loadingIndicator}>
        <ActivityIndicator
          animating={true}
          color={theme.colors.primaryBright}
          size={50}
        />
      </View>
      ):(
        
        <View>
          <View style={styles.avtarView}>
            <View style={styles.avtarView}>
            <Avatar.Image size={70} source={{uri: user.userPhotoUrl}}/>
            <View style={{justifyContent:"space-between",margin:10}}>
             <Text variant='titleLarge' style={styles.title}>{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</Text>
             <View style={{flexDirection:"row"}}>
                <Icon source="map-marker-outline" color={theme.colors.ternaryDark} size={25}/>
                  <Text  variant='titleSmall'style={{color:theme.colors.ternaryDark}}>
                    {user.country.charAt(0).toUpperCase()+ user.country.slice(1) }
                 </Text>
              </View>
            </View>
            </View>
            <IconButton icon={"account-edit-outline"} size={35}  iconColor={theme.colors.primaryBright} onPress={handleUpdate} />
         </View>
         <Divider style={styles.divider} />
         <View style={styles.bioView}>
          <Text variant='titleLarge' style={styles.title}>{user.jobTitle}</Text>
          <Text  variant='titleMedium' style={styles.title}>{'\n'}{user.bio.charAt(0).toUpperCase() + user.bio.slice(1)}</Text>
         </View>
         <Divider style={styles.divider} />
         <View style={styles.bioView}>
         <Text variant='titleLarge' style={styles.title}> Skills: </Text>
         <View style={{flexDirection:'row',margin:5,flexWrap:'wrap'}}>
          {user.skills.map((s,index)=>(<RoundedBox key={index} txt={s}/>))}
         </View>
         </View>
         <View>
         <CustomBtn txt={'Portofolio'} handlePress={handlePortofolio}/>
          <CustomBtn txt={'Reviews'} handlePress={handleReviews}/>
         </View>
         

     </View>
      )}
       <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbarStyle}
      >
        {errorMessage}
      </Snackbar>
     
  </View>
  </>
  );
};

export default Profile;
const styles= StyleSheet.create({
  container:{ 
    flex: 1,
     backgroundColor: theme.colors.secondaryDark,
       },
       avtarView:{
        flexDirection:'row',
        margin:5,
        justifyContent:"space-between"
        
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
      title:{
        color:theme.colors.ternaryLight,
        // margin:5,
      },
      divider:{
         backgroundColor:theme.colors.secondaryBright,
         marginHorizontal:10,
         marginVertical:5
      },
      bioView:{
        margin:10

      }

});