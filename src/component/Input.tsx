import { Image, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'
import { commonFontStyle, hp } from '../theme/fonts'
import { colors } from '../theme/colors'

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
    editable?: Boolean
}

const Input = ({ value, onChangeText, editable = true, icon, placeHolder, textInputStyle, RenderRightIcon, title, extraStyle, maxLength, multiline = false }: Props) => {
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
                />
                {RenderRightIcon && <RenderRightIcon />}
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
    }
})