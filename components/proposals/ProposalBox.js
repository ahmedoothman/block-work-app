import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper';
import theme from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric',  month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  

export default function ProposalBox({PropsalData}) {
const createdAt=formatDate(PropsalData.createdAt);

const navigation =useNavigation();

const handlePress=()=>{
    navigation.navigate('ProposalsDetails',{
        proposal: PropsalData,
       date:createdAt,
      })
    
}

return (
<>
<TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
<Card style={styles.card}> 
    <Card.Content>
        <View style={styles.View}>
            <Text variant="bodyMedium" style={styles.label}>
              {PropsalData.jobPost.title}
            </Text>
            <Text  variant="bodySmall" style={styles.date}>{createdAt}</Text>
        </View>
        <Text variant="bodyMedium" style={styles.date}>{PropsalData.status} </Text>
    </Card.Content>
</Card>
</TouchableOpacity>
</>
  )
}


const styles=StyleSheet.create({
    View:{
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    date:{
      color:theme.colors.ternaryDark,

    },
    label:{
        color:theme.colors.white
    },
    card:{
      backgroundColor:theme.colors.secondaryGray,
      borderRadius:theme.borderRadius,
      margin:10

    }

});