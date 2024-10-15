import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme/colors";
import { commonFontStyle, hp } from "../../theme/fonts";
import { IMAGES } from "../../assets/Images";
import {
  dispatchAction,
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";
import {
  SET_EDIT_MESSAGE,
  SET_SELETED_MESSAGE,
  SHOW_CHATINPUT_ADD_MODAL,
  SHOW_EMOJI_MODAL,
} from "../../redux/actionTypes";
import EmojiSelector from "react-native-emoji-selector";
import EmojiKeyboard from "./EmojiKeyboard";
import { Emit_Event, sendData } from "../../Socket/socket";

type Props = {};

const ChatInput = (props: Props) => {
  const dispatch = useAppDispatch();
  const { showChatInputAddModal, showEmojiModal } = useAppSelector(
    (e) => e.common
  );
  const { activeChat, editMessage } = useAppSelector((e) => e.common);
  const showAddModal = () => {
    dispatchAction(dispatch, SHOW_EMOJI_MODAL, false);
    dispatchAction(dispatch, SHOW_CHATINPUT_ADD_MODAL, !showChatInputAddModal);
  };
  const [message, setmessage] = useState("");

  const onPressSend = () => {
    if (editMessage) {
      sendData(Emit_Event.SEND_EDITED_MESSAGE, {
        chatId: editMessage?._id,
        message: message.trim(),
        messageType: "TEXT", // TEXT, IMAGE, VIDEO, MUSIC, LOCATION, DOCUMENT
      });
      dispatchAction(dispatch, SET_SELETED_MESSAGE, undefined);
    } else {
      sendData(Emit_Event.SEND_MESSAGE, {
        userId: activeChat?.opponentDetails?._id,
        message: message.trim(),
        messageType: "TEXT", // TEXT, IMAGE, VIDEO, MUSIC, LOCATION, DOCUMENT
      });
    }
    setmessage("");
  };

  useEffect(() => {
    if (editMessage) {
      setmessage(editMessage?.message);
    }
  }, [editMessage]);

  const onPressMicrophone = () => {};

  return (
    <View style={styles.mainView}>
      <SafeAreaView>
        <View style={styles.rowInput}>
          <View style={styles.inputView}>
            <TouchableOpacity
              onPress={() => showAddModal()}
              style={styles.clickView}
            >
              <Image
                source={IMAGES.chatInputAdd}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Write your message"
              style={styles.textInput}
              placeholderTextColor={colors._B5B5B5_gray}
              onFocus={() => dispatchAction(dispatch, SHOW_EMOJI_MODAL, false)}
              value={message}
              onChangeText={setmessage}
            />
            <TouchableOpacity style={styles.clickView}>
              <Image
                source={IMAGES.chatInputPin}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              message.length !== 0 ? onPressSend() : onPressMicrophone()
            }
            style={styles.voiceView}
          >
            <Image
              source={
                message.length == 0 ? IMAGES.microphone : IMAGES.sendButton
              }
              style={
                message.length == 0
                  ? { width: 25, height: 25 }
                  : { width: 18, height: 18 }
              }
            />
          </TouchableOpacity>
        </View>

        {showEmojiModal && <EmojiKeyboard />}
      </SafeAreaView>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
    borderTopColor: colors.gray_f3,
    borderTopWidth: 1,
  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: hp(2.5),
    gap: 10,
  },
  inputView: {
    backgroundColor: colors.gray_f3,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textInput: {
    ...commonFontStyle(400, 14, colors.black_23),
    flex: 1,
    height: 50,
  },
  clickView: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceView: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: colors.mainPurple,
  },
  rowTab: {},
});
