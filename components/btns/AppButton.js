import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import theme from '../../theme';

const AppButton = (props) => {
    const { buttonTitle, onPress } = props;
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        paddingVertical: 10,
        width: 210,
        backgroundColor: theme.colors.colorTextBlue,
        borderRadius: theme.borderRadius,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});
export default AppButton;