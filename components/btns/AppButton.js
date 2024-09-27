import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

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
        backgroundColor: "#1354C0",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
});
export default AppButton;