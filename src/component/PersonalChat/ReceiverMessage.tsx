import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../theme/colors'
import { commonFontStyle, hp } from '../../theme/fonts'
import { IMAGES } from '../../assets/Images'

type Props = {}

const ReceiverMessage = (props: Props) => {

    return (
        <View style={styles.mainView}>
            <Text style={styles.simpleMessage}>I'll text you when I arrive.</Text>
            <Text style={styles.timeText}>10:11</Text>
        </View>
    )
}

export default ReceiverMessage

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: colors.gray_f3,
        marginLeft: hp(3),
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        padding: 10,
        maxWidth: '75%',
        alignSelf: 'flex-start',
    },
    simpleMessage: {
        ...commonFontStyle(400, 14, colors.black_23)
    },
    timeText: {
        ...commonFontStyle(400, 12, colors._757575_gray),
        marginTop: 5
    },
    reactionView: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        // top: -40,
        zIndex: 1,
        alignSelf: 'center',
    },
    reactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 10,
    },
    reactionIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginHorizontal: 5
    }
})