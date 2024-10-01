import { Image, StyleSheet, FlatList, SafeAreaView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import GradientView from '../../component/GradientView'
import { AppStyles } from '../../theme/appStyles'
import HomeHeader from '../../component/HomeHeader'
import { IMAGES } from '../../assets/Images'
import SearchInput from '../../component/SearchInput'
import { hp } from '../../theme/fonts'
import { SwipeListView } from 'react-native-swipe-list-view'
import ChatListItem from '../../component/ChatListItem'
import { colors } from '../../theme/colors'


type Props = {}

const ContactsScreen = (props: Props) => {
    const [search, setsearch] = useState('')

    const listViewData = Array(20)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

    return (
        <GradientView>
            <SafeAreaView style={AppStyles.flex}>
                <HomeHeader type={'contact'} />
                <View style={[AppStyles.bottomWhiteViewWithoutPadding, { flex: 1, paddingVertical: hp(2) }]}>
                    <View style={styles.searchView}>
                        <SearchInput value={search} onChangeText={setsearch} />
                    </View>
                    <FlatList
                        data={listViewData}
                        renderItem={({ item, index }) => (
                            <ChatListItem showTime={false} />
                        )}

                        ListFooterComponent={() => (
                            <View style={{ height: 70 }} />
                        )}
                    />
                </View>
            </SafeAreaView>
        </GradientView>
    )
}

export default ContactsScreen

const styles = StyleSheet.create({
    searchView: {
        paddingHorizontal: hp(2)
    },
})