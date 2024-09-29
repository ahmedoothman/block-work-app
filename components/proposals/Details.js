import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider,Text } from 'react-native-paper';
import theme from '../../theme';

const Details = ({proposal,date}) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
            <Text variant="titleLarge" style={styles.title}>Your proposed terms</Text>
            <Text variant="titleMedium" style={styles.data}>Client’s budget: ${proposal.proposedAmount}</Text> 
            <Text variant="titleMedium" style={styles.title}>How do you want to be paid?</Text>
            <Text variant="titleMedium" style={styles.data}>By project</Text>
            <Text variant="titleMedium" style={styles.title}>You’ll receive </Text>
            <Text variant="titleMedium" style={styles.data}>The estimated payment, after service fees.</Text>
            <Text variant="titleMedium" style={styles.data}> ${proposal.proposedAmount}</Text>
            <Divider style={styles.Divider}/>
            <Text variant="titleLarge" style={styles.title}>Jobs details</Text>
            <Text variant="titleMedium" style={styles.title}>{proposal.jobPost.title} </Text> 
            <Text variant="titleMedium" style={styles.data}>Full Stack Development</Text>
            <Text variant="titleMedium" style={styles.data}>Posted {date}</Text>
            <Text variant="titleMedium" style={styles.title}> {proposal.jobPost.title} here is the 
            website link. http://imsmanagement.eu/</Text>
            <Text variant="titleMedium" style={styles.title}>Only new freelancers</Text>



            

            
            
        </Card.Content>
      </Card>
    );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:theme.colors.secondaryGray,
        borderRadius:theme.borderRadius,
        margin:10,
      },
      title:{
        color:theme.colors.ternaryLight,
        marginVertical:5
      },
      data:{
        color:theme.colors.ternaryDark,
  
      },
      Divider:{
        marginVertical:10
      }
})

export default Details;
