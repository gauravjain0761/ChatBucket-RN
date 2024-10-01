import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { IMAGES } from '../assets/Images'
import { colors } from '../theme/colors'
import { commonFontStyle, hp } from '../theme/fonts'

type Props = {}

const HomeHeader = (props: Props) => {
    let data = [
        { icon: IMAGES.chatIcon, name: 'Chats' },
        { icon: IMAGES.liveIcon, name: 'Live streams' },
        { icon: IMAGES.location, name: 'Locations' }
    ]
    const [selectedTabIndex, setselectedTabIndex] = useState(1)
    return (
        <SafeAreaView>
            <View style={styles.headerMainView}>
                <View style={styles.header}>
                    {data.map((item, index) => {
                        if (selectedTabIndex == index) {
                            return (
                                <TouchableOpacity style={styles.selectedView} key={index} onPress={() => { setselectedTabIndex(index) }}>
                                    <View style={[styles.tabIcon]}>
                                        <Image source={item.icon} style={[styles.iconStyle, { tintColor: colors.white, width: item.icon == IMAGES.location ? 40 : 20, }]} />
                                        <Text style={[styles.tabText]}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } else
                            return (
                                <TouchableOpacity key={index} onPress={() => { setselectedTabIndex(index) }}>
                                    <View style={[styles.tabIcon]}>
                                        <Image source={item.icon} style={[styles.iconStyle, { tintColor: 'rgba(255,255,255,0.6)', width: item.icon == IMAGES.location ? 40 : 20, }]} />
                                    </View>
                                </TouchableOpacity>
                            )
                    })}
                </View>
                <TouchableOpacity style={styles.moreMenu}>
                    <Image source={IMAGES.moreMenu} style={styles.moreMenuStyle} />

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeHeader

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
        paddingVertical: hp(1.5)
    },
    moreMenu: {
        padding: hp(2)
    },
    moreMenuStyle: {
        height: 16, width: 16, resizeMode: 'contain'
    }
})