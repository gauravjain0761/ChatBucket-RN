import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import ButtonPurple from '../../component/ButtonPurple'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../../navigation/screenNames'
import { dispatchAction, useAppDispatch } from '../../redux/hooks'
import { getAsyncToken, getAsyncUserInfo } from '../../utils/asyncStorage'
import { SET_USER_INFO } from '../../redux/actionTypes'
import { setAuthorization } from '../../utils/apiGlobal'
import SplashScreen from 'react-native-splash-screen'
import { resetNavigation } from '../../utils/commonFunction'

type Props = {}

const IntroScreen = (props: Props) => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [loading, setloading] = useState(true)

    useEffect(() => {
        getToken()

    }, [])


    const getToken = async () => {
        let token = await getAsyncToken()
        console.log(token)
        // SplashScreen.hide()
        // setloading(false)
        if (token) {
            let userData = await getAsyncUserInfo()
            dispatchAction(dispatch, SET_USER_INFO, userData)
            await setAuthorization(token?.split(' ')[1])
            resetNavigation(SCREENS.HomeScreen, undefined)
            setTimeout(() => {
                SplashScreen.hide()
                setloading(false)
            }, 2000);
        } else {
            setTimeout(() => {
                SplashScreen.hide()
                setloading(false)
            }, 2000);
        }
    }

    return (
        !loading ? <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <Image source={IMAGES.introImage} style={styles.introImage} />
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    <Text style={styles.titleText}>Stay Connected,</Text>
                    <Text style={styles.titleText}>Stay Close ✌️</Text>
                    <Text style={styles.des}>Instant messages, Calls and more..</Text>
                    <ButtonPurple onPress={() => navigation.navigate(SCREENS.SignupScreen)} title={'Create account'} withRightIcon={true} />
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LoginScreen)} style={styles.loginTextView}>
                        <Text style={styles.bottomText}>Already a user? <Text style={commonFontStyle(500, 14, colors.mainPurple)}>Log in</Text></Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View> : <View />
    )
}

export default IntroScreen

const styles = StyleSheet.create({
    introImage: {
        width: SCREEN_WIDTH - hp(4),
        height: SCREEN_WIDTH - hp(4),
        alignSelf: 'center'
    },
    titleText: {
        ...commonFontStyle(700, 31, colors.black_23),
        textAlign: 'center'
    },
    des: {
        ...commonFontStyle(400, 16, colors.gray_80),
        textAlign: 'center',
        marginBottom: hp(3)
    },
    bottomText: {
        ...commonFontStyle(400, 14, colors.black_23)
    },
    loginTextView: {
        alignSelf: 'center',
        marginTop: hp(2)
    }
})