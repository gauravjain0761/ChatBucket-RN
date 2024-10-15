import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/colors";
import { hp, commonFontStyle } from "../../theme/fonts";
import { IMAGES } from "../../assets/Images";
import { AppStyles } from "../../theme/appStyles";
import moment from "moment";
import ScheduleDetailModal from "./ScheduleMoreModal";
import ScheduleMoreModal from "./ScheduleMoreModal";

type Props = {
  item: any;
  index?: any;
};

const SenderMsg = ({ item, index }: Props) => {
  const [scheduleMsgModal, setscheduleMsgModal] = useState(false);
  return (
    <View>
      <View style={styles.mainView}>
        {item?.messageType == "TEXT" && (
          <Text style={styles.simpleMessage}>{item?.message}</Text>
        )}
        <View style={styles.bottomRow}>
          <Text style={styles.timeText}>
            {moment(item?.createdAt).format("hh:mm")}
          </Text>
          <Image
            source={IMAGES.checkRead}
            style={[
              styles.checkImage,
              {
                tintColor: item?.readStatus == "READED" ? "#6A4DBB" : "#ABA1CD",
              },
            ]}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setscheduleMsgModal(true)}
        style={styles.schelduleView}
      >
        <Image style={styles.icons} source={IMAGES.clock} />
        <Text style={styles.schelduleText}>
          Scheduled for 10:24 AM on Sept 24
        </Text>
        <Image style={styles.icons} source={IMAGES.moreMenu} />
      </TouchableOpacity>

      {scheduleMsgModal && (
        <ScheduleMoreModal
          isVisible={scheduleMsgModal}
          onCloseModal={() => setscheduleMsgModal(false)}
        />
      )}
    </View>
  );
};

export default SenderMsg;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors._EFEBFC_purple,
    marginRight: hp(3),
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    padding: 10,
    maxWidth: "75%",
    alignSelf: "flex-end",
    minWidth: "20%",
    marginVertical: hp(1),
  },
  simpleMessage: {
    ...commonFontStyle(400, 14, colors.black_23),
  },
  timeText: {
    ...commonFontStyle(400, 12, colors._7A6A90_purple),
    marginTop: 5,
    flex: 1,
    textAlign: "right",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkImage: {
    height: 13,
    width: 13,
    resizeMode: "contain",
    marginLeft: 3,
    marginBottom: -3,
    // tintColor: colors._7A6A90_purple,
  },
  schelduleView: {
    backgroundColor: colors._E7E7E7_gray,
    alignSelf: "flex-end",
    marginBottom: hp(1),
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: hp(3),
  },
  icons: {
    height: 13,
    width: 13,
    resizeMode: "contain",
    tintColor: colors.black_23,
    margin: 8,
  },
  schelduleText: {
    ...commonFontStyle(400, 12, colors.black_23),
  },
});
