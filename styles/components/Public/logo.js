import { StyleSheet } from "react-native";
export default StyleSheet.create({
    logoContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 15
    },
    logoImage: {
        width: 40,
        height: 40,
        marginRight: 7,
    },
    logoText: {
        fontSize: 28,
        // fontFamily: "Anton", //! under handeling
        fontWeight: 'regular',
        color: "#0096FF"
    },
})