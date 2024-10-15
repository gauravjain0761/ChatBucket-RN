import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../redux/hooks";
import FastImage from "react-native-fast-image";
import { IMAGES } from "../assets/Images";

type Props = {
  size: any;
  url?: any;
  activeOpacity?: any;
  userId?: any;
};

const RenderUserIcon = ({
  size,
  url,
  activeOpacity,
  userId = undefined,
}: Props) => {
  const navigation = useNavigation();
  const {} = useAppSelector((e) => e.common);
  let isUrl = url !== undefined && url !== "" && url.includes("https");

  let styles = StyleSheet.create({
    userImage: {
      height: size,
      width: size,
      borderRadius: size / 2,
    },
  });

  const onOpenUserDetail = () => {
    // if (userId !== undefined && userId !== user._id) {
    //   navigation.navigate(screenName.indiansDetails, { userId: userId });
    // }
  };

  return (
    <TouchableOpacity
      disabled={userId === undefined ? true : false}
      activeOpacity={activeOpacity}
      onPress={() => onOpenUserDetail()}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={
          isUrl
            ? { uri: url, priority: FastImage.priority.normal }
            : IMAGES.userImage
        }
        style={styles.userImage}
      />
    </TouchableOpacity>
  );
};

export default RenderUserIcon;

const styles = StyleSheet.create({});
