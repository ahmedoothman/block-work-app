import React from 'react';
import { StyleSheet, View, } from 'react-native';
import theme from '../../theme';
import { Button,Text } from 'react-native-paper';

const NoDataBox = ({Title,Massage,Onpress,btnTitle}) => {
    return (
        <View style={{margin:10}}>
             <View style={styles.noDatacontentContainer}>
            <Text variant='headlineSmall' style={styles.noDataTitle}>
              {Title}
            </Text>
            <Text  variant='titleMedium' style={styles.noDataMessage}>
              {Massage}
            </Text>
            <View>
             <Button style={styles.btn} mode='contained' onPress={Onpress}>{btnTitle}</Button>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({

    noDatacontentContainer: {
        backgroundColor: theme.colors.secondaryGray,
        borderRadius: theme.borderRadius,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems:'center',
        marginTop:150
      },
      noDataTitle: {
        color: theme.colors.ternaryLight,
       
      },
      noDataMessage: {
        color: theme.colors.ternaryDark,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginVertical: 15,
      },
      btn:{
        backgroundColor:theme.colors.primaryDark,
        color:theme.colors.ternaryLight,
      }
})

export default NoDataBox;
