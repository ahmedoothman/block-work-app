import { StyleSheet } from "react-native";
export default StyleSheet.create({
    inputContaienr: {
        width: "100%",
        marginVertical: 10,
        // backgroundColor: "red",
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        borderRadius: 15,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,

        width: "100%",
        overflow: 'hidden',

        paddingVertical: 11,
        paddingHorizontal: 10,



    },

    icon: {
        position: 'absolute',
        right: 10, // Position the icon to the right end
        top: "50%", // Start at the vertical center
        transform: [{ translateY: -12 }], // Adjust the icon up by half its height (adjust this value based on your icon size)
        zIndex: 1,
    },



    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },



    photoButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    photoButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Anton',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "teal"
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 20,
    },
    createButton: {
        marginTop: 20,
    },
})