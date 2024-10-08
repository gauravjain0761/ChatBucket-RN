import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import EmojiSelector from 'react-native-emoji-selector'
import { commonFontStyle } from '../../theme/fonts'
import { colors } from '../../theme/colors'

type Props = {}

const EmojiKeyboard = (props: Props) => {
    const [selectedTab, setselectedTab] = useState('emoji')
    return (
        <View style={{ height: 195 }}>
            <View style={styles.rowTab}>
                <TouchableOpacity onPress={() => setselectedTab('emoji')}>
                    <Text style={[styles.tabText, selectedTab == 'emoji' ? { ...commonFontStyle(600, 14, colors.mainPurple) } : { undefined }]}>Emojis</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setselectedTab('sticker')}>
                    <Text style={[styles.tabText, selectedTab == 'sticker' ? { ...commonFontStyle(600, 14, colors.mainPurple) } : { undefined }]}>Stickers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setselectedTab('gif')}>
                    <Text style={[styles.tabText, selectedTab == 'gif' ? { ...commonFontStyle(600, 14, colors.mainPurple) } : { undefined }]}>Gifs</Text>
                </TouchableOpacity>
            </View>
            {selectedTab == 'gif' && <View />}
            {selectedTab == 'sticker' && <View />}
            {selectedTab == 'emoji' && <EmojiSelector
                showSearchBar={false}
                showTabs={false}
                showHistory={false}
                showSectionTitles={false}
                columns={10}
                onEmojiSelected={emoji => { console.log(emoji) }}
            />}

        </View>
    )
}

export default EmojiKeyboard

const styles = StyleSheet.create({
    rowTab: {
        flexDirection: 'row',
        alignSelf: 'center',

    },
    tabText: {
        ...commonFontStyle(400, 14, colors.black_23),
        marginHorizontal: 10,
        marginVertical: 10
    }
})