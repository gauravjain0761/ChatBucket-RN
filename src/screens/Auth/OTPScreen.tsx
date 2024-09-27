import { Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, Clipboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import Input from '../../compoment/Input'
import ButtonPurple from '../../compoment/ButtonPurple'
import { SCREENS } from '../../navigation/screenNames'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field'

type Props = {}
const CELL_COUNT = 4

const OTPScreen = () => {
    const navigation = useNavigation()
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.otpInput} style={AppStyles.chatLogo2} />
                </View>
                <Text style={styles.titleText}>Enter OTP</Text>
                <Text style={styles.des}>OTP has been sent to exa****@gmail.com</Text>
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View style={[styles.cell, { borderColor: isFocused ? colors.mainPurple : colors._DADADA_gray, backgroundColor: isFocused ? 'rgba(106, 77, 187, 0.07)' : colors.white }]}>
                                <Text
                                    key={index}
                                    style={styles.textStyle}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    <ButtonPurple onPress={() => navigation.navigate(SCREENS.SignupScreen)} title={'Submit'} />
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LoginScreen)} style={styles.loginTextView}>
                        <Text style={styles.bottomText}>Didn’t receive OTP? <Text style={commonFontStyle(500, 14, colors.mainPurple)}>Resend</Text></Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default OTPScreen

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
    cell: {
        width: 60,
        height: 55,
        borderRadius: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors._DADADA_gray,
        // marginHorizontal: hp(2.5),
    },
    codeFieldRoot: {
        marginVertical: hp(4),
        marginHorizontal: hp(4)
        // width
    },
    textStyle: {
        ...commonFontStyle(500, 25, colors.mainPurple),
    },
})