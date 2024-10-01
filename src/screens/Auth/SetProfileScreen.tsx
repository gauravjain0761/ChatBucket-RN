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
import { styles as inputStyle } from '../../component/Input'
import RenderRadioButton from '../../component/RenderRadioButton'
import ImageCropPicker from 'react-native-image-crop-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

type Props = {}

const SetProfileScreen = (props: Props) => {
    const navigation = useNavigation()
    const [userName, setuserName] = useState('')
    const [profileImage, setprofileImage] = useState('')
    const [DOB, setDOB] = useState('')
    const [bio, setbio] = useState('')
    const [gender, setGender] = useState('male')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        setDOB(date)
        hideDatePicker();
    };

    const onChangeImage = () => {
        ImageCropPicker.openPicker({
            cropping: true,
            height: SCREEN_WIDTH,
            width: SCREEN_WIDTH
        }).then(image => {
            console.log(image);
            setprofileImage(image)
        })
    }


    return (
        <View style={AppStyles.purpleMainContainer}>
            <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                <View style={[AppStyles.flex, { justifyContent: 'center' }]}>
                    <Image source={IMAGES.successInput} style={AppStyles.chatLogo2} />
                </View>
                <Text style={styles.titleText}>Setup profile</Text>
                <Text style={styles.des}>Please enter your login details</Text>
            </View>
            <View style={AppStyles.bottomWhiteView}>
                <SafeAreaView>
                    {profileImage.path ?
                        <TouchableOpacity onPress={() => onChangeImage()} style={styles.imageView}>
                            <Image source={{ uri: profileImage.path }} style={styles.imageProfile} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => onChangeImage()} style={styles.imageView}>
                            <Image source={IMAGES.imagePlaceholder} style={styles.imagePlaceholder} />
                            <Image source={IMAGES.updateImage} style={styles.updateImage} />
                        </TouchableOpacity>
                    }

                    <Input value={userName} extraStyle={styles.input} onChangeText={setuserName} icon={IMAGES.userInput} placeHolder={'Eg: William james'} title={'Enter username'} />
                    <Input value={bio} extraStyle={styles.input} textInputStyle={styles.multiLineStyle} onChangeText={setbio} placeHolder={'Write something here..'} title={'Bio (Optional)'} />
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} activeOpacity={1}>
                        <Input editable={false} RenderRightIcon={() => { return (<Image source={IMAGES.calender} style={styles.rightIconTextInput} />) }} value={DOB == '' ? '' : moment(DOB).format('DD/MM/YYYY')} extraStyle={styles.input} onChangeText={setDOB} placeHolder={'DD/MM/YYYY'} title={'Date of birth'} />
                    </TouchableOpacity>
                    <View>
                        <Text style={inputStyle.title}>{'Gender'}</Text>
                        <View style={styles.radioMainView}>
                            <TouchableOpacity onPress={() => setGender('male')} style={styles.radioView}>
                                <RenderRadioButton value={gender == 'male'} />
                                <Text style={styles.radioTitle}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGender('female')} style={styles.radioView}>
                                <RenderRadioButton value={gender == 'female'} />
                                <Text style={styles.radioTitle}>Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGender('no')} style={styles.radioView}>
                                <RenderRadioButton value={gender == 'no'} />
                                <Text style={styles.radioTitle}>Prefer not to say</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ButtonPurple onPress={() => navigation.navigate(SCREENS.HomeScreen)} title={'Done'} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default SetProfileScreen

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
    imageView: {
        backgroundColor: colors.gray_f3,
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imageProfile: {
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
        resizeMode: 'contain'
    },
    imagePlaceholder: {
        height: 33,
        width: 33,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    updateImage: {
        height: 33,
        width: 33,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    multiLineStyle: {
        minHeight: 80,
        textAlignVertical: 'top'
    },
    rightIconTextInput: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    radioTitle: {
        ...commonFontStyle(500, 16, colors.black_23)
    },
    radioMainView: {
        flexDirection: 'row',
        gap: hp(2),
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 5,
        marginBottom: hp(2)
    },
    radioView: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
})