import { Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, Clipboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import Input from '../../component/Input'
import ButtonPurple from '../../component/ButtonPurple'
import { SCREENS } from '../../navigation/screenNames'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { errorToast, passwordCheck, resetNavigation } from '../../utils/commonFunction'
import { onResetPassword, onVerifyUsername } from '../../service/AuthServices'

type Props = {}

const SetNewPassword = (props: Props) => {
    const navigation = useNavigation()
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { user, otpToken } = useAppSelector(e => e.common)
    const dispatch = useAppDispatch()

    const onReset = () => {
        if (!passwordCheck(password.trim())) {
            errorToast('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character')
        } else if (password !== confirmPassword) {
            errorToast('Confirm password does not match')
        } else {
            let data = {
                registrationType: user?.registrationType,
                phoneCode: user?.phoneCode,
                phoneNumber: user?.phoneNumber,
                email: user?.email,
                password: password.trim(), //password,
                token: otpToken,
            }
            let obj = {
                data: data,
                onSuccess: () => {
                    resetNavigation(SCREENS.LoginScreen, undefined)
                }
            }
            dispatch(onResetPassword(obj))

        }
    }

    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.resetPassInput} style={AppStyles.chatLogo2} />
                </View>
                <Text style={styles.titleText}>Set new password</Text>
                <Text style={styles.des}>Password must be at least 8 characters with uppercase, lowercase, numbers & symbols</Text>
            </View>
            <View style={[AppStyles.bottomWhiteView, { paddingBottom: hp(10) }]}>
                <SafeAreaView>
                    <Input RenderRightIcon={() => { return (<Image source={IMAGES.right} style={AppStyles.rightIconTextInput} />) }} value={password} extraStyle={styles.input} onChangeText={setpassword} icon={IMAGES.passwordInput} secureTextEntry={true} placeHolder={'*********'} title={'New password'} />
                    <Input RenderRightIcon={() => { return (<Image source={IMAGES.right} style={AppStyles.rightIconTextInput} />) }} value={confirmPassword} extraStyle={styles.input} onChangeText={setConfirmPassword} icon={IMAGES.passwordInput} secureTextEntry={true} placeHolder={'*********'} title={'Confirm password'} />
                    <ButtonPurple onPress={() => onReset()} title={'Change password'} />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default SetNewPassword

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