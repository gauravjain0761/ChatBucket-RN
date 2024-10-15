import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "../ModalWrapper";
import { colors } from "../../theme/colors";
import { commonFontStyle, hp } from "../../theme/fonts";
import ButtonPurple from "../ButtonPurple";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
  onPressDeleteForMe: () => void;
  onPressDeleteForBoth: () => void;
};

const DeleteMessageModal = ({
  isVisible,
  onCloseModal,
  onPressDeleteForBoth,
  onPressDeleteForMe,
}: Props) => {
  const { showChatInputAddModal, selectedMessage, messageList, user } =
    useAppSelector((e) => e.common);
  return (
    <ModalWrapper isVisible={isVisible} onCloseModal={onCloseModal}>
      <View>
        <Text style={styles.title}>Delete message</Text>
        <View style={styles.rowView}>
          <ButtonPurple
            extraStyle={{ flex: 1, backgroundColor: colors.gray_f3 }}
            titleColor={colors.black_23}
            title="Delete for me"
            onPress={onPressDeleteForMe}
          />
          {messageList[selectedMessage].senderId == user.id && (
            <ButtonPurple
              extraStyle={{ flex: 1, backgroundColor: colors._F11010_red }}
              title="Delete for both"
              onPress={onPressDeleteForBoth}
            />
          )}
        </View>
      </View>
    </ModalWrapper>
  );
};

export default DeleteMessageModal;

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 16, colors.black_23),
  },
  rowView: {
    flexDirection: "row",
    gap: hp(2),
    justifyContent: "space-between",
    marginTop: hp(2),
  },
});
