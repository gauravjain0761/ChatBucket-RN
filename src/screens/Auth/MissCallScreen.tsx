import { Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, Clipboard, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import Input from '../../compoment/Input'
import ButtonPurple from '../../compoment/ButtonPurple'
import { SCREENS } from '../../navigation/screenNames'

type Props = {}

const MissCallScreen = (props: Props) => {
    const navigation = useNavigation()
    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.callingInput} style={AppStyles.chatLogo2} />
                </View>
                <Text style={styles.titleText}>Calling..</Text>
                <Text style={styles.des}>+91 8745X XXXXX</Text>
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    <Text style={styles.textBlack}>No need to pick up the call</Text>
                    <Text style={styles.desBlack}>We’ll verify the number automatically</Text>
                    <View style={{ marginVertical: hp(5) }}>
                        <ActivityIndicator size={'large'} color={colors.mainPurple} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LoginScreen)} style={styles.loginTextView}>
                        <Text style={styles.bottomText}>Didn’t receive call? <Text style={commonFontStyle(500, 14, colors.mainPurple)}>Request again</Text></Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default MissCallScreen

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
    bottomText: {
        ...commonFontStyle(400, 14, colors.black_23)
    },
    loginTextView: {
        alignSelf: 'center',
        marginTop: hp(2),
        marginBottom: hp(4)
    },
    textBlack: {
        ...commonFontStyle(500, 18, colors.black_23),
        textAlign: 'center'
    },
    desBlack: {
        ...commonFontStyle(400, 16, colors.black_23),
        textAlign: 'center'
    }
})