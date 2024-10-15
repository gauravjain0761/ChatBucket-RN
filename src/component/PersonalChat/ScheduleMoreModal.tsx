import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ModalWrapper from "../ModalWrapper";
import { commonFontStyle, hp } from "../../theme/fonts";
import { colors } from "../../theme/colors";
import { IMAGES } from "../../assets/Images";
import { SHOW_CHATINPUT_ADD_MODAL } from "../../redux/actionTypes";
import { dispatchAction, useAppDispatch } from "../../redux/hooks";

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
};

const ScheduleMoreModal = ({ isVisible, onCloseModal }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ModalWrapper isVisible={isVisible} onCloseModal={onCloseModal}>
      <View>
        <Text style={styles.title}>Scheduled message options</Text>
        <TouchableOpacity onPress={() => {}} style={styles.row}>
          <Image style={styles.imageIcon} source={IMAGES.trash} />
          <Text style={styles.title2}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.row}>
          <Image style={styles.imageIcon} source={IMAGES.editSend} />
          <Text style={styles.title2}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.row}>
          <Image style={styles.imageIcon} source={IMAGES.clock} />
          <Text style={styles.title2}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.row}>
          <Image style={styles.imageIcon} source={IMAGES.sendNow} />
          <Text style={styles.title2}>Send now</Text>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};

export default ScheduleMoreModal;

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 16, colors.black_23),
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // paddingLeft: hp(3),
    paddingVertical: 10,
  },
  imageIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  title2: {
    ...commonFontStyle(400, 16, colors.black_23),
  },
});
