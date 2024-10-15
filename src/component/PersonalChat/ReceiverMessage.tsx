import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { commonFontStyle, hp } from "../../theme/fonts";
import { IMAGES } from "../../assets/Images";
import moment from "moment";

type Props = {
  item: any;
};

const ReceiverMessage = ({ item }: Props) => {
  return (
    <View style={styles.mainView}>
      {item?.messageType == "TEXT" && (
        <Text style={styles.simpleMessage}>{item?.message}</Text>
      )}
      <Text style={styles.timeText}>
        {moment(item?.createdAt).format("hh:mm")}
      </Text>
    </View>
  );
};

export default ReceiverMessage;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
    marginLeft: hp(3),
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 10,
    maxWidth: "75%",
    alignSelf: "flex-start",
    marginVertical: hp(1),
  },
  simpleMessage: {
    ...commonFontStyle(400, 14, colors.black_23),
  },
  timeText: {
    ...commonFontStyle(400, 12, colors._757575_gray),
    marginTop: 5,
  },
  reactionView: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    // top: -40,
    zIndex: 1,
    alignSelf: "center",
  },
  reactionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 10,
  },
  reactionIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
});
