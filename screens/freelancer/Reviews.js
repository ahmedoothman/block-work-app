import React, { useEffect, useState,Dimensions } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import ReviewBox from '../../components/reviews/ReviewBox';
import theme from '../../theme';
import { getReviewsService } from '../../services/reviewService';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import NoDataBox from '../../components/NoData/NoDataBox';
import { useNavigation } from '@react-navigation/native';
// const { height } = Dimensions.get('window');

const Reviews = ({route}) => {
  const {userId}=route.params;
  const [reviews,setReviews]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation=useNavigation()
  const OthmanId="66f6f4704e248d72407cf561"; //to test api bc there is no reviews with my id 
  const handleNoDataBtn=()=>{
    navigation.goBack();
  }

  useEffect(()=>{
    const fetchReviews=async()=>{
        const response=await getReviewsService(userId);
        if(response.status==='success'){
            setReviews(response.data);
        }else{
            setError(true);
            setErrorMessage(response.message);
            setVisible(true);
            setReviews([]);
        }
        setIsLoading(false);
    }
    fetchReviews()
  })

  const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {isLoading?(
                    <View style={styles.loadingIndicator}>
                    <ActivityIndicator
                      animating={true}
                      color={theme.colors.primaryBright}
                      size={50}
                    />
                  </View>
                ):( reviews.length?
                    (reviews.map((review,i)=>(<ReviewBox key={i} rating={review.rating} name={review.reviewer.name} photourl={review.reviewer.userPhotoUrl} comment={review.comment}/>))
                ):(
                 <NoDataBox Title={"No reviews found"} Onpress={handleNoDataBtn} Massage={" clients reviews will appear here"} btnTitle={"Back to Profile"}/>
                )  
                )
                  }
            </ScrollView>
                <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        style={styles.snackbarStyle}
                    >
                        {errorMessage}
               </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondaryDark,
        position: 'relative',
      },
      loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      //  height: height * 0.6, // More dynamic height
      },
      snackbarStyle: {
        backgroundColor: theme.colors.danger,
        borderRadius: theme.borderRadius,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
      },
      scrollContainer: {
        flex: 1,
      },
})

export default Reviews;
