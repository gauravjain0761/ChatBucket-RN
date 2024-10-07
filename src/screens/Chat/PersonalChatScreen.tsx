import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import GradientView from '../../component/GradientView'
import HomeHeader from '../../component/HomeHeader'
import { AppStyles } from '../../theme/appStyles'
import { hp } from '../../theme/fonts'
import ChatInput from '../../component/ChatInput'
import SenderMsg from '../../component/SenderMsg'

type Props = {}

const PersonalChatScreen = (props: Props) => {


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

    return (
        <GradientView>
            <View style={AppStyles.flex}>
                <SafeAreaView>
                    <HomeHeader type={'personalChat'} />
                </SafeAreaView>
                <View style={[AppStyles.bottomWhiteViewWithoutPadding, { flex: 1 }]}>
                    <FlatList
                        inverted
                        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <SenderMsg />
                                    {/* {checkDate(item, index)} */}
                                    {/* {item?.createdBy?._id !== user._id ?
                  <ReciverMsg data={item} />
                  :
                  <SenderMsg data={item} />} */}
                                </View>
                            )
                        }}
                        onEndReached={fetchMoreData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => {
                            return (
                                <View>
                                    {/* {chatMessageList && loading && (
                  <ActivityIndicator size={'large'} color={colors.black} />
                )} */}
                                    <View style={{ height: 50 }} />
                                </View>
                            );
                        }}
                    />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <ChatInput />
                    </KeyboardAvoidingView>
                </View>
            </View>
        </GradientView>
    )
}

export default PersonalChatScreen

const styles = StyleSheet.create({})