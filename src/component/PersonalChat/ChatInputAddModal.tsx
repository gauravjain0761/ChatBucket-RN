import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets/Images'
import { SHOW_CHATINPUT_ADD_MODAL } from '../../redux/actionTypes'
import { dispatchAction, useAppDispatch } from '../../redux/hooks'
import { colors } from '../../theme/colors'
import { commonFontStyle, hp } from '../../theme/fonts'

type Props = {
    onPressSchedule?: () => void,
    onPressEmoji?: () => void
}

const ChatInputAddModal = ({ onPressSchedule, onPressEmoji }: Props) => {
    const dispatch = useAppDispatch()

    return (
        <TouchableOpacity onPress={() => dispatchAction(dispatch, SHOW_CHATINPUT_ADD_MODAL, false)} activeOpacity={1} style={styles.chatAddMOdal}>
            <ImageBackground source={IMAGES.blurView} style={styles.backImage} >
                <View style={styles.innerModal}>
                    <TouchableOpacity onPress={() => { dispatchAction(dispatch, SHOW_CHATINPUT_ADD_MODAL, false), onPressSchedule() }} style={styles.row}>
                        <Image style={styles.imageIcon} source={IMAGES.clock} />
                        <Text style={styles.title}>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { dispatchAction(dispatch, SHOW_CHATINPUT_ADD_MODAL, false), onPressEmoji() }} style={styles.row}>
                        <Image style={styles.imageIcon} source={IMAGES.emoji} />
                        <Text style={styles.title}>Emojis</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default ChatInputAddModal

const styles = StyleSheet.create({
    chatAddMOdal: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    backImage: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    innerModal: {
        backgroundColor: colors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: hp(2.5),
        marginBottom: hp(1.5),
        bottom: 0,
        alignSelf: 'flex-start',
        paddingVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: hp(3),
        paddingRight: hp(8),
        paddingVertical: 10
    },
    imageIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    title: {
        ...commonFontStyle(400, 16, colors.black_23)
    }
})