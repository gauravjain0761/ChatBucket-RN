import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'
import { hp } from '../theme/fonts'

type Props = {}

const ChatInput = (props: Props) => {
    return (
        <View style={styles.mainView}>
            <Text>ChatInput</Text>
        </View>
    )
}

export default ChatInput

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: colors.white,
        borderTopColor: colors.gray_f3,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: hp(3)
    }
})