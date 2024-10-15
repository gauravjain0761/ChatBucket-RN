import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import { commonFontStyle, hp, SCREEN_WIDTH } from "../theme/fonts";
import { IMAGES } from "../assets/Images";
import { AppStyles } from "../theme/appStyles";
import RenderUserIcon from "./RenderUserIcon";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../navigation/screenNames";
import { Emit_Event, sendData, socket } from "../Socket/socket";
import { dispatchAction, useAppDispatch } from "../redux/hooks";
import {
  ACTIVE_CHAT,
  SET_MESSAGES,
  SET_SELETED_MESSAGE,
} from "../redux/actionTypes";
import moment from "moment";
import { dayPipe } from "../utils/commonFunction";

type Props = {
  showTime?: Boolean;
  data: any;
};

const ChatListItem = ({ showTime = true, data }: Props) => {
  const navigation = useNavigation();
  let item = data?.item;
  const dispatch = useAppDispatch();

  const onOpenChat = () => {
    dispatchAction(dispatch, ACTIVE_CHAT, item);
    dispatchAction(dispatch, SET_MESSAGES, []);
    dispatchAction(dispatch, SET_SELETED_MESSAGE, undefined);
    navigation.navigate(SCREENS.PersonalChatScreen);
  };

  return (
    <TouchableHighlight
      onPress={() => onOpenChat()}
      underlayColor={colors.white}
    >
      <View style={styles.rowView}>
        <RenderUserIcon url={item?.opponentDetails?.image} size={50} />
        <View style={AppStyles.flex}>
          <View style={styles.rowInner}>
            <View style={AppStyles.flex}>
              <Text style={styles.title}>{item?.opponentDetails?.name}</Text>
            </View>
            {showTime && (
              <Text style={styles.timeText}>
                {dayPipe(item?.lastMessage?.createdAt)}
              </Text>
            )}
          </View>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {item?.lastMessage?.message}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    gap: 15,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    resizeMode: "cover",
  },
  title: {
    ...commonFontStyle(600, 16, colors.black_23),
  },
  lastMessage: {
    ...commonFontStyle(400, 14, colors.gray_80),
    marginTop: 3,
  },
  timeText: {
    ...commonFontStyle(400, 13, colors._B1B1B1_gray),
  },
  rowInner: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
