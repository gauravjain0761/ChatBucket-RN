import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import GradientView from "../../component/GradientView";
import HomeHeader from "../../component/HomeHeader";
import { AppStyles } from "../../theme/appStyles";
import { hp } from "../../theme/fonts";
import ChatInput from "../../component/PersonalChat/ChatInput";
import SenderMsg from "../../component/PersonalChat/SenderMsg";
import { chatWallpaper, IMAGES } from "../../assets/Images";
import {
  dispatchAction,
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";
import {
  DELETE_MESSAGE_MODAL_VISIBLE,
  SET_EDIT_MESSAGE,
  SET_SELETED_MESSAGE,
  SHOW_CHATINPUT_ADD_MODAL,
  SHOW_EMOJI_MODAL,
} from "../../redux/actionTypes";
import ChatInputAddModal from "../../component/PersonalChat/ChatInputAddModal";
import ScheduleMessageModal from "../../component/PersonalChat/ScheduleMessageModal";
import ReceiverMessage from "../../component/PersonalChat/ReceiverMessage";
import { colors } from "../../theme/colors";
import PersonalChatHeader from "../../component/PersonalChat/PersonalChatHeader";
import EmojiSelector from "react-native-emoji-selector";
import moment from "moment";
import { Emit_Event, sendData } from "../../Socket/socket";
import DeleteMessageModal from "../../component/PersonalChat/DeleteMessageModal";

type Props = {};

const PersonalChatScreen = (props: Props) => {
  const { showChatInputAddModal, selectedMessage } = useAppSelector(
    (e) => e.common
  );
  const [scheduleModal, setscheduleModal] = useState(false);
  const [emojiModal, setemojiModal] = useState(false);
  const dispatch = useAppDispatch();
  const onFocus = useIsFocused();
  const { messageList, user, activeChat, deleteMsgModal } = useAppSelector(
    (e) => e.common
  );
  useEffect(() => {
    dispatchAction(dispatch, SHOW_EMOJI_MODAL, false);
  }, [onFocus]);

  useEffect(() => {
    sendData(Emit_Event.READ_MESSAGE, {
      userId: activeChat?.opponentDetails?._id,
    });
    sendData(Emit_Event.CHATS_LIST, {
      userId: activeChat?.opponentDetails?._id,
    });
  }, []);

  const checkDate = (item: any, index: any) => {
    let dateFormat = "DD MMMM YYYY";
    let today = moment().format(dateFormat);
    let yesterday = moment().subtract(1, "days").format(dateFormat);
    let currentDate = moment(item?.createdAt).format(dateFormat);
    if (index == messageList.length - 1) {
      return (
        <View style={styles.datesContainer}>
          <View style={styles.textLine} />
          <View>
            <Text style={styles.dateText}>
              {today === currentDate
                ? "Today"
                : yesterday === currentDate
                ? "Yesterday"
                : currentDate}
            </Text>
          </View>
          <View style={styles.textLine} />
        </View>
      );
    } else if (index + 1 <= messageList.length - 1) {
      let prevDate = moment(messageList[index + 1].createdAt).format(
        dateFormat
      );
      if (currentDate !== prevDate) {
        return (
          <View style={styles.datesContainer}>
            <View style={styles.textLine} />
            <View>
              <Text style={styles.dateText}>
                {today === currentDate
                  ? "Today"
                  : yesterday === currentDate
                  ? "Yesterday"
                  : currentDate}
              </Text>
            </View>
            <View style={styles.textLine} />
          </View>
        );
      }
    }
  };

  const fetchMoreData = () => {
    // if (chatMessageList) {
    //   if (chatMessageList.length < allChatMessageCount) {
    //     setloading(true);
    //     getData(page + 1);
    //   }
    // }
  };

  const onSelectMessage = (item: any) => {
    dispatchAction(
      dispatch,
      SET_SELETED_MESSAGE,
      item == selectedMessage ? undefined : item
    );
  };
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
        {item?.senderId == user?.id && (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => dispatchAction(dispatch, SET_EDIT_MESSAGE, item)}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={IMAGES.editMessage}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.editIcon}>
          <Image
            style={{ height: 40, width: 40 }}
            source={IMAGES.copyMessage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onPressDeleteForMe = (type: any) => {
    sendData(Emit_Event.DELETE_MESSAGE, {
      chatId: messageList[selectedMessage]._id,
      deleteType: type, // SENDER, BOTH
    });
    dispatchAction(dispatch, SET_SELETED_MESSAGE, undefined);
  };
  return (
    <View style={AppStyles.flex}>
      <GradientView>
        <View style={AppStyles.flex}>
          <SafeAreaView>
            <PersonalChatHeader />
          </SafeAreaView>
          <View
            style={[
              AppStyles.bottomWhiteViewWithoutPadding,
              { flex: 1, overflow: "hidden" },
            ]}
          >
            <ImageBackground
              style={AppStyles.flex}
              source={chatWallpaper.mainWallpaper}
            >
              <FlatList
                inverted
                data={messageList}
                keyExtractor={(item, index) => item?._id.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ flex: 1 }}>
                      {selectedMessage == index && (
                        <RenderReactionView item={item} />
                      )}

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          dispatchAction(
                            dispatch,
                            SET_SELETED_MESSAGE,
                            undefined
                          )
                        }
                        onLongPress={() => onSelectMessage(index)}
                        style={styles.mainMessageRow}
                      >
                        {selectedMessage == index && (
                          <View style={styles.selectedView} />
                        )}
                        {item?.senderId !== user?.id ? (
                          <ReceiverMessage item={item} />
                        ) : (
                          <SenderMsg item={item} index={index} />
                        )}

                        {/* {checkDate(item, index)} */}
                      </TouchableOpacity>
                    </View>
                  );
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
            </ImageBackground>
          </View>
          {showChatInputAddModal && (
            <ChatInputAddModal
              onPressEmoji={() =>
                dispatchAction(dispatch, SHOW_EMOJI_MODAL, true)
              }
              onPressSchedule={() => setscheduleModal(true)}
            />
          )}
        </View>
      </GradientView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <ChatInput />
      </KeyboardAvoidingView>
      {scheduleModal && (
        <ScheduleMessageModal
          isVisible={scheduleModal}
          onCloseModal={() => setscheduleModal(false)}
        />
      )}
      {deleteMsgModal && (
        <DeleteMessageModal
          isVisible={deleteMsgModal}
          onCloseModal={() =>
            dispatchAction(dispatch, DELETE_MESSAGE_MODAL_VISIBLE, false)
          }
          onPressDeleteForBoth={() => onPressDeleteForMe("BOTH")}
          onPressDeleteForMe={() => onPressDeleteForMe("SENDER")}
        />
      )}
    </View>
  );
};

export default PersonalChatScreen;

const styles = StyleSheet.create({
  mainMessageRow: {
    // position: 'relative',
    // zIndex: 0,
    // zIndex: 9999,
  },
  editIcon: {
    elevation: 10,
    marginLeft: 10,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  reactionView: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: -40,
    // left: 8,
    alignSelf: "center",
    marginBottom: 10,
  },
  reactionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 10,
    borderRadius: 100,
  },
  reactionIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    // margin: 6,
  },
  icon: {
    // height: 25,
    // width: 25,
    resizeMode: "contain",
    paddingHorizontal: 6,
    height: 40,
    justifyContent: "center",
  },
  selectedView: {
    backgroundColor: colors.opacity_main_purple_10,
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    paddingVertical: hp(1),
  },
});
