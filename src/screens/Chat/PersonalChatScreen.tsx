import { FlatList, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import GradientView from '../../component/GradientView'
import HomeHeader from '../../component/HomeHeader'
import { AppStyles } from '../../theme/appStyles'
import { hp } from '../../theme/fonts'
import ChatInput from '../../component/PersonalChat/ChatInput'
import SenderMsg from '../../component/PersonalChat/SenderMsg'
import { IMAGES } from '../../assets/Images'
import { dispatchAction, useAppDispatch, useAppSelector } from '../../redux/hooks'
import { SET_SELETED_MESSAGE, SHOW_CHATINPUT_ADD_MODAL, SHOW_EMOJI_MODAL } from '../../redux/actionTypes'
import ChatInputAddModal from '../../component/PersonalChat/ChatInputAddModal'
import ScheduleMessageModal from '../../component/PersonalChat/ScheduleMessageModal'
import ReceiverMessage from '../../component/PersonalChat/ReceiverMessage'
import { colors } from '../../theme/colors'
import PersonalChatHeader from '../../component/PersonalChat/PersonalChatHeader'
import EmojiSelector from 'react-native-emoji-selector'

type Props = {}

const PersonalChatScreen = (props: Props) => {
    const { showChatInputAddModal, selectedMessage } = useAppSelector(e => e.common)
    const [scheduleModal, setscheduleModal] = useState(false)
    const [emojiModal, setemojiModal] = useState(false)
    const dispatch = useAppDispatch()
    const onFocus = useIsFocused()

    useEffect(() => {
        dispatchAction(dispatch, SHOW_EMOJI_MODAL, false)
    }, [onFocus])


    // const checkDate = (item, index) => {
    //     let dateFormat = 'DD MMMM YYYY';
    //     let today = moment().format(dateFormat);
    //     let yesterday = moment().subtract(1, 'days').format(dateFormat);
    //     let currentDate = moment(item?.createdAt).format(dateFormat);
    //     if (index == chatMessageList.length - 1) {
    //       return (
    //         <View style={styles.datesContainer}>
    //           <View style={styles.textLine} />
    //           <View>
    //             <Text style={styles.dateText}>{today === currentDate ? 'Today' : yesterday === currentDate ? 'Yesterday' : currentDate}</Text>
    //           </View>
    //           <View style={styles.textLine} />
    //         </View>
    //       )
    //     } else if (index + 1 <= chatMessageList.length - 1) {
    //       let prevDate = moment(chatMessageList[index + 1].createdAt).format(dateFormat);
    //       if (currentDate !== prevDate) {
    //         return <View style={styles.datesContainer}>
    //           <View style={styles.textLine} />
    //           <View>
    //             <Text style={styles.dateText}>{today === currentDate ? 'Today' : yesterday === currentDate ? 'Yesterday' : currentDate}</Text>
    //           </View>
    //           <View style={styles.textLine} />
    //         </View>
    //       }
    //     }
    //   }

    const fetchMoreData = () => {
        // if (chatMessageList) {
        //   if (chatMessageList.length < allChatMessageCount) {
        //     setloading(true);
        //     getData(page + 1);
        //   }
        // }
    }

    const onSelectMessage = (item: any) => {
        dispatchAction(dispatch, SET_SELETED_MESSAGE, item == selectedMessage ? undefined : item)
    }

    const RenderReactionView = ({ item, index }: any) => {
        return (
            <View style={styles.reactionView}>
                <View style={styles.reactionRow}>
                    <TouchableOpacity style={styles.icon}>
                        <Text style={{ fontSize: 20, color: colors.black }}>😄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Text style={{ fontSize: 20, color: colors.black }}>🤩</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Text style={{ fontSize: 20, color: colors.black }}>🙏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Text style={{ fontSize: 20, color: colors.black }}>💯</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Image style={styles.reactionIcon} source={IMAGES.addReaction} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ elevation: 10, marginLeft: 10, backgroundColor: colors.white, borderRadius: 100 }} >
                    <Image style={{ height: 40, width: 40, }} source={IMAGES.editMessage} />
                </TouchableOpacity>
                <TouchableOpacity style={{ elevation: 10, marginLeft: 10, backgroundColor: colors.white, borderRadius: 100 }} >
                    <Image style={{ height: 40, width: 40, }} source={IMAGES.copyMessage} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={AppStyles.flex}>
            <GradientView>
                <View style={AppStyles.flex}>
                    <SafeAreaView>
                        <PersonalChatHeader />
                    </SafeAreaView>
                    <View style={[AppStyles.bottomWhiteViewWithoutPadding, { flex: 1 }]}>
                        <FlatList
                            inverted
                            data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        {selectedMessage == index && <RenderReactionView />}

                                        <TouchableOpacity activeOpacity={0.7} onPress={() => dispatchAction(dispatch, SET_SELETED_MESSAGE, undefined)} onLongPress={() => onSelectMessage(index)} style={[styles.mainMessageRow, { backgroundColor: selectedMessage == index ? colors.opacity_main_purple_10 : undefined }]}>
                                            {index % 2 == 0 ? <ReceiverMessage /> : <SenderMsg />}
                                            {/* {checkDate(item, index)} */}
                                            {/* {item?.createdBy?._id !== user._id ? <ReciverMsg data={item} /> : <SenderMsg data={item} />} */}
                                        </TouchableOpacity>

                                    </View>
                                )
                            }}
                            // style={{ position: 'relative' }}
                            // contentContainerStyle={{ position: 'relative' }}
                            onEndReached={fetchMoreData}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={() => {
                                return (
                                    <View>
                                        {/* {chatMessageList && loading && (<ActivityIndicator size={'large'} color={colors.black} /> )} */}
                                        <View style={{ height: 50 }} />
                                    </View>
                                );
                            }}
                        />
                    </View>
                    {showChatInputAddModal &&
                        <ChatInputAddModal onPressEmoji={() => dispatchAction(dispatch, SHOW_EMOJI_MODAL, true)} onPressSchedule={() => setscheduleModal(true)} />
                    }
                </View>
            </GradientView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ChatInput />
            </KeyboardAvoidingView>
            {scheduleModal && <ScheduleMessageModal isVisible={scheduleModal} onCloseModal={() => setscheduleModal(false)} />}
        </View>

    )
}

export default PersonalChatScreen

const styles = StyleSheet.create({
    mainMessageRow: {
        paddingVertical: hp(1),
        // position: 'relative',
        // zIndex: 0,
        // zIndex: 9999,
    },
    reactionView: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: -40,
        // left: 8,
        alignSelf: 'center',
        marginBottom: 10


    },
    reactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 10,
        borderRadius: 100
    },
    reactionIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        // margin: 6,
    },
    icon: {
        // height: 25,
        // width: 25,
        resizeMode: 'contain',
        paddingHorizontal: 6,
        height: 40,
        justifyContent: 'center'
    }

})