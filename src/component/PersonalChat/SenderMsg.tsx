import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../theme/colors'
import { hp, commonFontStyle } from '../../theme/fonts'
import { IMAGES } from '../../assets/Images'

type Props = {}

const SenderMsg = (props: Props) => {
    return (
        <View style={styles.mainView}>
            <Text style={styles.simpleMessage}>I'll text you when I arrive.</Text>
            <View style={styles.bottomRow}>
                <Text style={styles.timeText}>10:11</Text>
                <Image source={IMAGES.checkRead} style={styles.checkImage} />
            </View>

        </View>
    )
}

export default SenderMsg

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: colors.mainPurple,
        marginRight: hp(3),
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderTopLeftRadius: 16,
        padding: 10,
        maxWidth: '75%',
        alignSelf: 'flex-end'
    },
    simpleMessage: {
        ...commonFontStyle(400, 14, colors.white)
    },
    timeText: {
        ...commonFontStyle(400, 12, colors._E8D8FF_purple),
        marginTop: 5,
        flex: 1,
        textAlign: 'right'
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkImage: {
        height: 13,
        width: 13,
        resizeMode: 'contain',
        marginLeft: 3,
        marginBottom: -3
    }
})