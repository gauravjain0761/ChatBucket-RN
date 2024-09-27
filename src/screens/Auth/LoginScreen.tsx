import { Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import Input from '../../compoment/Input'
import ButtonPurple from '../../compoment/ButtonPurple'
import { SCREENS } from '../../navigation/screenNames'

type Props = {}

const LoginScreen = (props: Props) => {
    const navigation = useNavigation()
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.logoChat} style={AppStyles.chatLogo} />
                </View>
                <Text style={styles.titleText}>Welcome back!</Text>
                <Text style={styles.des}>Please enter your login details</Text>
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    <Input value={userName} extraStyle={styles.input} onChangeText={setuserName} icon={IMAGES.userInput} placeHolder={'Eg: James_43'} title={'Enter username'} />
                    <Input value={password} extraStyle={styles.input} onChangeText={setpassword} icon={IMAGES.passwordInput} placeHolder={'*********'} title={'Enter password'} />
                    <ButtonPurple onPress={() => navigation.navigate(SCREENS.SignupScreen)} title={'Login'} />
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LoginScreen)} style={styles.loginTextView}>
                        <Text style={styles.bottomText}><Text style={commonFontStyle(500, 14, colors.mainPurple)}>Forgot password?</Text></Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>

    )
}

export default LoginScreen

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
    bottomText: {
        ...commonFontStyle(400, 14, colors.black_23)
    },
    loginTextView: {
        alignSelf: 'center',
        marginTop: hp(2)
    }
})