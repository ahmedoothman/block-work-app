import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import logoStyle from '../../styles/components/Public/logo';

const Logo = () => {
    return (
        <View style={logoStyle.logoContainer}>
            <Image
                source={require("../../assets/images/logo.png")}
                style={[logoStyle.logoImage, { color: "#0096FF" }]}
            />
            <Text style={[logoStyle.logoText]}>BlockWork</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Logo;
