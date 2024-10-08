import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { IMAGES } from '../../assets/Images'
import { colors } from '../../theme/colors'
import { commonFontStyle, hp } from '../../theme/fonts'
import { useNavigation } from '@react-navigation/native'
import { AppStyles } from '../../theme/appStyles'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import RenderUserIcon from '../RenderUserIcon'
type Props = {}

const PersonalChatHeader = (props: Props) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { showChatInputAddModal, selectedMessage } = useAppSelector(e => e.common)

    return (
        <SafeAreaView>
            {!selectedMessage ?
                <View style={[styles.headerMainView, { paddingLeft: 0 }]}>
                    <View style={[styles.header, { gap: 0 }]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackView}>
                            <Image source={IMAGES.rightArrow} style={styles.headerBackIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.header}>
                            <TouchableOpacity>
                                <RenderUserIcon size={50} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ ...commonFontStyle(600, 16, colors.white) }}>Alice</Text>
                                <Text style={{ ...commonFontStyle(500, 14, colors.white) }}>Online</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={[styles.header, { gap: 0 }]}>
                        <TouchableOpacity>
                            <Image source={IMAGES.Phone} style={{ height: 40, width: 26, tintColor: colors.white, marginLeft: hp(2), resizeMode: 'contain', }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={IMAGES.Videocamera} style={{ height: 40, width: 26, tintColor: colors.white, marginLeft: hp(2), resizeMode: 'contain', }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.moreMenu]}>
                            <Image source={IMAGES.moreMenu} style={styles.moreMenuStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={[styles.headerMainView, { paddingLeft: 0 }]}>
                    <View style={[styles.header, { gap: 0 }]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackView}>
                            <Image source={IMAGES.rightArrow} style={styles.headerBackIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.header}>

                            <View>
                                <Text style={{ ...commonFontStyle(600, 16, colors.white) }}>Delivered</Text>
                                <Text style={{ ...commonFontStyle(500, 14, colors.white) }}>10:12 AM</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={[styles.header, { gap: 0 }]}>
                        <TouchableOpacity>
                            <Image source={IMAGES.replyMessage} style={{ height: 40, width: 26, tintColor: colors.white, marginLeft: hp(2), resizeMode: 'contain', }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={IMAGES.pinMessage} style={{ height: 40, width: 23, tintColor: colors.white, marginLeft: hp(2), resizeMode: 'contain', }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={IMAGES.replyMessage} style={{
                                height: 40, width: 26, tintColor: colors.white, marginLeft: hp(2), resizeMode: 'contain', transform: [
                                    { scaleX: -1 }
                                ]
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.moreMenu]}>
                            <Image source={IMAGES.deleteMessage} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>

                    </View>
                </View>
            }

        </SafeAreaView>
    )
}

export default PersonalChatHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    selectedView: {
        backgroundColor: colors._7155C3_purple,
        paddingVertical: 10, paddingHorizontal: 25, borderRadius: 50
    },
    tabIcon: {
        flexDirection: 'row', alignItems: 'center', gap: 10
    },
    iconStyle: {
        height: 20, width: 20, resizeMode: 'contain'
    },
    tabText: {
        ...commonFontStyle(500, 16, colors.white)
    },
    headerMainView: {
        paddingLeft: hp(2),
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: hp(1.5),
        height: hp(9)
    },
    moreMenu: {
        padding: hp(2)
    },
    moreMenuStyle: {
        height: 16, width: 16, resizeMode: 'contain'
    },
    headerBackView: {
        height: 18 + hp(2), width: 18 + hp(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBackIcon: {
        height: 20, width: 20, resizeMode: 'contain',
        transform: [{ rotate: '180deg' }]
    },
})