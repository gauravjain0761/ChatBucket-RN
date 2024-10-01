import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'

type Props = {
    value: Boolean
}

const RenderRadioButton = ({ value }: Props) => {
    return (
        <View style={[styles.mainRound, { borderColor: value ? colors._7A5DCB_purple : colors._DADADA_gray }]}>
            {value && <View style={styles.innerView} />}
        </View>
    )
}

export default RenderRadioButton

const styles = StyleSheet.create({
    mainRound: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors._DADADA_gray,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerView: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: colors._7A5DCB_purple
    }
})