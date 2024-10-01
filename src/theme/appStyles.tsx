import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { hp } from "./fonts";

export const AppStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    mainWhiteContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    purpleMainContainer: {
        flex: 1,
        backgroundColor: colors.mainPurple
    },
    headerBackView: {
        height: 46, width: 46,
        backgroundColor: colors._7A5DCB_purple,
        borderRadius: 46 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: hp(2)
    },
    headerBackIcon: {
        height: 20, width: 20, resizeMode: 'contain',
        transform: [{ rotate: '180deg' }]
    },
    bottomWhiteView: {
        backgroundColor: colors.white,
        padding: hp(3),
        borderTopEndRadius: 20,
        borderTopStartRadius: 20
    },
    bottomWhiteViewWithoutPadding: {
        backgroundColor: colors.white,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20
    },
    chatLogo: {
        height: 97,
        width: 97,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    chatLogo2: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    rightIconTextInput: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
    }
})