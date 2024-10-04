import { Image, StyleSheet, Text, TouchableOpacity, TextInput, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { commonFontStyle, hp } from '../theme/fonts'
import { colors } from '../theme/colors'
import { IMAGES } from '../assets/Images'

type Props = {
    value: any,
    onChangeText: any,
    icon?: any,
    placeHolder: string,
    title: string,
    extraStyle?: ViewStyle,
    maxLength?: number,
    RenderRightIcon?: any,
    multiline?: Boolean,
    textInputStyle?: ViewStyle,
    editable?: Boolean,
    secureTextEntry?: Boolean
}

const Input = ({ value, secureTextEntry = false, onChangeText, editable = true, icon, placeHolder, textInputStyle, RenderRightIcon, title, extraStyle, maxLength, multiline = false }: Props) => {
    const [passwordHide, setpasswordHide] = useState(true);
    return (
        <View style={extraStyle}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rowView}>
                {icon && <Image source={icon} style={styles.icon} />}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.inputStyle, textInputStyle]}
                    maxLength={maxLength}
                    placeholder={placeHolder}
                    placeholderTextColor={colors._CCCCCC_gray}
                    multiline={multiline}
                    editable={editable}
                    secureTextEntry={secureTextEntry ? passwordHide : false}
                />
                {RenderRightIcon && <RenderRightIcon />}
                {secureTextEntry &&
                    <TouchableOpacity onPress={() => setpasswordHide(!passwordHide)}>
                        <Image source={passwordHide ? IMAGES.view : IMAGES.hide} style={styles.imageView} />
                    </TouchableOpacity>
                }
            </View>

        </View>
    )
}

export default Input

export const styles = StyleSheet.create({
    title: {
        ...commonFontStyle(400, 16, colors.black_23)
    },
    inputStyle: {
        flex: 1,
        height: 55,
        ...commonFontStyle(400, 16, colors.black_23),
    },
    rowView: {
        borderWidth: 1,
        borderColor: colors._DADADA_gray,
        borderRadius: 15,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    icon: {
        height: 20, width: 20, resizeMode: 'contain',
        marginHorizontal: 10
    },
    imageView: {
        width: 20,
        height: 55,
        resizeMode: 'contain',
        marginLeft: 12,
        tintColor: colors._CCCCCC_gray,
    },
})