import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'
import { IMAGES } from '../assets/Images'
import { commonFontStyle } from '../theme/fonts'

type Props = {
    value: string,
    onChangeText: (text: string) => void,
}

const SearchInput = ({ value, onChangeText }: Props) => {
    return (
        <View style={styles.searchView}>
            <Image source={IMAGES.searchIcon} style={styles.searchIcon} />
            <TextInput value={value} onChangeText={onChangeText}
                placeholder='Search on ChatBucket'
                placeholderTextColor={colors._B5B5B5_gray}
                style={styles.textInput}
            />
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray_f3,
        borderRadius: 15
    },
    searchIcon: {
        height: 17,
        width: 17,
        resizeMode: 'contain',
        marginHorizontal: 10
    },
    textInput: {
        height: 50,
        ...commonFontStyle(400, 14, colors.black_23),
        flex: 1,
        paddingRight: 10
    }
})