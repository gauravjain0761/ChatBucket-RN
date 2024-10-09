import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'
import { commonFontStyle, hp, SCREEN_WIDTH } from '../theme/fonts'
import { IMAGES } from '../assets/Images'
import { AppStyles } from '../theme/appStyles'
import RenderUserIcon from './RenderUserIcon'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../navigation/screenNames'
import { Emit_Event, sendData, socket } from '../Socket/socket'

type Props = {
    showTime?: Boolean
}

const ChatListItem = ({ showTime = true }: Props) => {
    const navigation = useNavigation();


    const onOpenChat = () => {
        // sendData(Emit_Event.CHAT_LISTS, {
        //     userId: '66ffa2daa6ae0c5151807bdd'
        // })
        // console.log(socket)
        socket.emit(
            "CHATS_LIST",
            {
                userId: "66ffa2daa6ae0c5151807bdd",
            },
            (res: any) => {
                // navigation.navigate(SCREENS.PersonalChatScreen)
                console.log("CHAT_LIST Res:", res);
            }
        );

    }

    return (
        <TouchableHighlight onPress={() => onOpenChat()} underlayColor={colors.white}>
            <View style={styles.rowView}>
                <RenderUserIcon size={50} />
                <View style={AppStyles.flex}>
                    <View style={styles.rowInner}>
                        <View style={AppStyles.flex}>
                            <Text style={styles.title}>Gyllinton</Text>
                        </View>
                        {showTime && <Text style={styles.timeText}>9:01 am</Text>}
                    </View>
                    <Text numberOfLines={1} style={styles.lastMessage}>I don't know what you're </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default ChatListItem

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: hp(2),
        paddingVertical: hp(2),
        gap: 15,
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        resizeMode: 'cover'
    },
    title: {
        ...commonFontStyle(600, 16, colors.black_23)
    },
    lastMessage: {
        ...commonFontStyle(400, 14, colors.gray_80),
        marginTop: 3,
    },
    timeText: {
        ...commonFontStyle(400, 13, colors._B1B1B1_gray)
    },
    rowInner: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})