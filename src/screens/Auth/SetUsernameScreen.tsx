import { Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, Clipboard, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import Input from '../../component/Input'
import ButtonPurple from '../../component/ButtonPurple'
import { SCREENS } from '../../navigation/screenNames'

type Props = {}

const SetUsernameScreen = (props: Props) => {
    const navigation = useNavigation()
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.usernameInput} style={AppStyles.chatLogo2} />
                </View>
                <Text style={styles.titleText}>Set username</Text>
                <Text style={styles.des}>Please enter details below</Text>
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    <Input value={userName} extraStyle={styles.input} onChangeText={setuserName} icon={IMAGES.userInput} placeHolder={'Username'} title={'Enter username'} RenderRightIcon={() => { return (<Image source={IMAGES.wrong} style={AppStyles.rightIconTextInput} />) }} />
                    <View style={styles.notAvailableView}>
                        <Text style={styles.titleRed}>Username not available</Text>
                        <Text style={styles.titleTextAvailable}>Try for : ItsWilliam_23, William023, William23</Text>
                    </View>
                    <Input RenderRightIcon={() => { return (<Image source={IMAGES.right} style={AppStyles.rightIconTextInput} />) }} value={password} extraStyle={styles.input} onChangeText={setpassword} icon={IMAGES.passwordInput} placeHolder={'*********'} title={'Enter password'} />
                    <Input RenderRightIcon={() => { return (<Image source={IMAGES.right} style={AppStyles.rightIconTextInput} />) }} value={confirmPassword} extraStyle={styles.input} onChangeText={setConfirmPassword} icon={IMAGES.passwordInput} placeHolder={'*********'} title={'Confirm password'} />
                    <ButtonPurple onPress={() => navigation.navigate(SCREENS.SetProfileScreen)} title={'Create account'} />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default SetUsernameScreen

const styles = StyleSheet.create({
    titleText: {
        ...commonFontStyle(700, 31, colors.white),
        textAlign: 'center'
    },
    des: {
        ...commonFontStyle(400, 16, colors.white),
        textAlign: 'center',
        marginBottom: hp(4)
    },
    input: {
        marginBottom: hp(2)
    },
    notAvailableView: {
        backgroundColor: colors._FFF4F4_red,
        borderRadius: 15,
        padding: hp(2),
        marginBottom: hp(2)
    },
    titleRed: {
        ...commonFontStyle(500, 16, colors._DB1515_red)
    },
    titleTextAvailable: {
        ...commonFontStyle(400, 16, colors.black_23),
        marginTop: 5
    }
})