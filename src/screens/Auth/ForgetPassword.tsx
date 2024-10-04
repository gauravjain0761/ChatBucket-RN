import { Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { IMAGES } from '../../assets/Images'
import { commonFontStyle, hp } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import Input from '../../component/Input'
import ButtonPurple from '../../component/ButtonPurple'
import { SCREENS } from '../../navigation/screenNames'
import { styles as inputStyle } from '../../component/Input'
import CountryPicker from 'react-native-country-picker-modal'
import { emailCheck, errorToast, mobileNumberCheck } from '../../utils/commonFunction'
import { useAppDispatch } from '../../redux/hooks'
import { onForgetPassword, onRegister } from '../../service/AuthServices'

type Props = {}

const ForgetPassword = (props: Props) => {
    const navigation = useNavigation()
    const [email, setemail] = useState('')
    const [mobile, setmobile] = useState('')
    const [type, settype] = useState('mobile')
    const [country, setcountry] = useState({ cca2: 'IN', name: 'India', callingCode: ['91'] })
    const [isModalVisible, setisModalVisible] = useState(false)
    const dispatch = useAppDispatch()

    const onSignup = () => {
        // navigation.navigate(type == 'mobile' ? SCREENS.MissCallScreen : SCREENS.OTPScreen)


        if (type == 'mobile') {
            if (mobile.trim().length == 0) {
                errorToast('Please enter a valid mobile number')
            } else if (!mobileNumberCheck(mobile.trim())) {
                errorToast('Please enter a valid mobile number')
            } else {
                let obj = {
                    data: {
                        registrationType: 'PHONENUMBER',
                        phoneCode: country?.callingCode[0],
                        phoneNumber: mobile.trim(),
                        email: ''
                    },
                    onSuccess: (res: any) => {
                        navigation.navigate(SCREENS.OTPScreen, { type: 'forget' })
                    }
                }
                dispatch(onForgetPassword(obj))
            }
        } else {
            if (!emailCheck(email.trim())) {
                errorToast('Please enter a valid email')
            } else {
                let obj = {
                    data: {
                        registrationType: 'EMAIL',
                        phoneCode: '',
                        phoneNumber: '',
                        email: email.trim(),
                    },
                    onSuccess: (res: any) => {
                        navigation.navigate(SCREENS.OTPScreen, { type: 'forget' })
                    }
                }
                dispatch(onForgetPassword(obj))
            }
        }
    }


    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.forgetPassInput} style={AppStyles.chatLogo2} />
                </View>
                <Text style={styles.titleText}>Forgot password</Text>
                <Text style={styles.des}>Please enter details below</Text>
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    <View style={styles.rowView}>
                        <TouchableOpacity onPress={() => settype('mobile')} style={[styles.tab]}>
                            <Text style={[type == 'mobile' ? styles.selectedTaBText : styles.tabText]}>Mobile</Text>
                            <View style={[styles.selectedLine, { backgroundColor: type == 'mobile' ? colors.mainPurple : 'transparent' }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => settype('email')} style={[styles.tab]}>
                            <Text style={[type == 'email' ? styles.selectedTaBText : styles.tabText]}>Email</Text>
                            <View style={[styles.selectedLine, { backgroundColor: type == 'email' ? colors.mainPurple : 'transparent' }]} />
                        </TouchableOpacity>
                    </View>
                    {type == 'mobile' ?
                        <View>
                            <Text style={inputStyle.title}>{'Select country'}</Text>
                            <TouchableOpacity onPress={() => setisModalVisible(true)} style={[inputStyle.rowView, { height: 55, marginBottom: hp(2) }]}>
                                <CountryPicker withCallingCode visible={isModalVisible} onClose={() => setisModalVisible(false)} withFlagButton={true} countryCode={country.cca2} withFilter withEmoji={false} onSelect={(country) => { setcountry(country), setisModalVisible(false) }} />
                                <Text style={{ ...commonFontStyle(400, 16, colors.black_23), flex: 1 }}>{country?.name}</Text>
                                <Image source={IMAGES.bottomArrow} style={styles.rightArrow} />
                            </TouchableOpacity>
                            <View>
                                <Text style={inputStyle.title}>{'Enter mobile number'}</Text>
                                <View style={[inputStyle.rowView, { marginBottom: hp(2) }]}>
                                    <Text style={styles.codeText}>+{country.callingCode[0]}</Text>
                                    <View style={styles.verLine} />
                                    <TextInput
                                        value={mobile}
                                        onChangeText={setmobile}
                                        style={inputStyle.inputStyle}
                                        placeholder={'Mobile number'}
                                        keyboardType={'phone-pad'}
                                        placeholderTextColor={colors._CCCCCC_gray}
                                    />
                                </View>
                            </View>
                        </View>
                        :
                        <Input value={email} extraStyle={styles.input} onChangeText={setemail} placeHolder={'Enter email'} title={'Enter your email'} />
                    }
                    <ButtonPurple extraStyle={{ marginBottom: type == 'email' ? hp(6) : hp(0) }} onPress={() => onSignup()} title={'Next'} />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default ForgetPassword

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
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    tabText: {
        ...commonFontStyle(500, 14, colors.black_23),
    },
    selectedTaBText: {
        ...commonFontStyle(600, 14, colors.mainPurple)
    },
    tab: {
        paddingHorizontal: 20,
        marginBottom: hp(3)
    },
    selectedLine: {
        height: 3,
        width: 20,
        backgroundColor: colors.mainPurple,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 8
    },
    rightArrow: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        tintColor: colors.mainPurple
    },
    codeText: {
        ...commonFontStyle(500, 16, colors.gray_80)
    },
    verLine: {
        width: 1,
        marginHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0,0.1)',
        height: 30
    }
})