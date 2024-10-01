import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import ButtonPurple from '../../component/ButtonPurple'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../../navigation/screenNames'

type Props = {}

const IntroScreen = (props: Props) => {
    const navigation = useNavigation()
    return (
        <View style={AppStyles.purpleMainContainer}>
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
        </View>
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