import { View,  StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../theme';
import { Surface, Text } from 'react-native-paper';

export default function RoundedBox({txt}) {
  return ( 
        <Surface style={styles.surface} elevation={4}>
            <Text variant='titleMedium' style={styles.text}>{txt}</Text>
         </Surface>
    
  )
}
const styles= StyleSheet.create({
    text:{
        color:theme.colors.ternaryDark,
      textAlign:"center",

        // margin:5
    },
    surface: {
        padding: 5,
        // height: 40,
        width: 70,
        alignSelf:'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:70,
      backgroundColor:theme.colors.secondaryBright,
      margin:4,
      },
});