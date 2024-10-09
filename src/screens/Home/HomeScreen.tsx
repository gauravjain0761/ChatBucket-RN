import { Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradientView from '../../component/GradientView'
import { AppStyles } from '../../theme/appStyles'
import HomeHeader from '../../component/HomeHeader'
import { IMAGES } from '../../assets/Images'
import SearchInput from '../../component/SearchInput'
import { hp } from '../../theme/fonts'
import { SwipeListView } from 'react-native-swipe-list-view'
import ChatListItem from '../../component/ChatListItem'
import { colors } from '../../theme/colors'
import { Emit_Event, sendData, socket, socketConnect } from '../../Socket/socket'
import { useAppDispatch } from '../../redux/hooks'
import StoryButton from '../../component/StoryButton'
import { useFocusEffect } from '@react-navigation/native'

type Props = {}

const HomeScreen = (props: Props) => {
    const [search, setsearch] = useState('')
    const dispatch = useAppDispatch()
    const listViewData = Array(20)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

    useEffect(() => {
        socketConnect(dispatch, (flag: any) => {
            console.log(flag)
            if (flag) {
                // socket.emit(Emit_Event.CHATS_HISTORY_LIST)
            }
        });

    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                sendData(Emit_Event.CHATS_HISTORY_LIST)
                // socket.emit(Emit_Event.CHATS_HISTORY_LIST, (res: any) => {
                //     console.log(res)
                // })
            }, 500);
        }, [])
    );


    const renderHiddenItem = ({ item, rowMap }: any) => (
        <View style={styles.hiddenRow}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => { }}
            >
                <Image source={IMAGES.deleteIcon} style={styles.deleetIcon} />
            </TouchableOpacity>
        </View>
    );

    return (
        <GradientView>
            <SafeAreaView style={AppStyles.flex}>
                <HomeHeader type={'home'} />
                <View style={[AppStyles.bottomWhiteViewWithoutPadding, { flex: 1, paddingVertical: hp(2) }]}>
                    <View style={styles.searchView}>
                        <SearchInput value={search} onChangeText={setsearch} />
                    </View>
                    <SwipeListView
                        data={listViewData}
                        renderItem={(data, rowMap) => (
                            <ChatListItem />
                        )}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-80}
                        leftOpenValue={0}
                        disableRightSwipe={false}
                        ListFooterComponent={() => (
                            <View style={{ height: 70 }} />
                        )}
                    />
                    <StoryButton />
                </View>
            </SafeAreaView>
        </GradientView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    searchView: {
        paddingHorizontal: hp(2)
    },
    hiddenRow: {
        // alignItems: 'flex-end',
        backgroundColor: colors.mainPurple,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: hp(2),
    },
    deleteButton: {
        // width: 100,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    deleetIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    }
})