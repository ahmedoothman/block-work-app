import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    signUpParent: {
        borderWidth: 2, // Outer border width for the outline
        borderColor: 'red', // Outline color
        borderRadius: 15, // Rounded corners for the outline
        padding: 5,
        margin: "auto",
        // width: "80%",
        height: "50%",
        justifyContent: 'center',
        backgroundColor: "red"
    },
    scrollView: {
        padding: 2, // Padding to prevent content from touching the inner border
    },
    scrollViewContent: {
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // width: '100%',
    },
    signUpChild: {
        // width: '100%',
        // // padding: 10,
        // backgroundColor: "teal",
        // // marginHorizontal: 5,
        // // marginVertical: 10,
        // borderRadius: 15,
        // alignItems: 'center',// Rounded corners for the outline
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    headerImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        borderRadius: 10,
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
        justifyContent: "center",
        marginBottom: 20,
        // backgroundColor: "teal"
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 20,
    },
    createButton: {
        marginTop: 20,
    }, centerBtn: {
        margin: "auto"
    },
})