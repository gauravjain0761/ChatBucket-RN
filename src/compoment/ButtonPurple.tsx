import { Image, StyleSheet, Text, View, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'
import { commonFontStyle, hp } from '../theme/fonts'
import { IMAGES } from '../assets/Images'

type Props = {
    withRightIcon?: Boolean,
    title: string,
    extraStyle?: ViewStyle,
    onPress?: () => void
}

const ButtonPurple = ({ withRightIcon = false, title, extraStyle, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={() => onPress ? onPress() : {}} style={[styles.btnContainer, { justifyContent: withRightIcon ? 'space-between' : 'center' }, extraStyle]}>
            <Text style={styles.titleText}>{title}</Text>
            {withRightIcon && <Image source={IMAGES.rightArrow} style={styles.rightArrow} />}
        </TouchableOpacity>
    )
}

export default ButtonPurple

const styles = StyleSheet.create({
    btnContainer: {
        height: 55,
        backgroundColor: colors.mainPurple,
        borderRadius: 15,
        paddingHorizontal: hp(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightArrow: {
        height: 19,
        width: 19,
        resizeMode: 'contain'
    },
    titleText: {
        ...commonFontStyle(600, 16, colors.white),
        textAlign: 'center',
    }
})