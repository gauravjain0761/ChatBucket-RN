import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Clipboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppStyles } from "../../theme/appStyles";
import { IMAGES } from "../../assets/Images";
import { commonFontStyle, hp, SCREEN_WIDTH } from "../../theme/fonts";
import { colors } from "../../theme/colors";
import Input from "../../component/Input";
import ButtonPurple from "../../component/ButtonPurple";
import { SCREENS } from "../../navigation/screenNames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { errorToast, passwordCheck } from "../../utils/commonFunction";
import { onVerifyUsername } from "../../service/AuthServices";

type Props = {};

const SetUsernameScreen = (props: Props) => {
  const navigation = useNavigation();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, otpToken } = useAppSelector((e) => e.common);
  const [validateUsername, setvalidateUsername] = useState(undefined);
  const dispatch = useAppDispatch();
  const [suggetionList, setsuggetionList] = useState("");

  const onCreateAccount = () => {
    // navigation.navigate(SCREENS.SetProfileScreen)
    if (userName.trim().length == 0) {
      errorToast("Please enter a valid username");
    } else if (validateUsername == false) {
      errorToast("Username is not available");
    } else if (!passwordCheck(password.trim())) {
      errorToast(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else if (password !== confirmPassword) {
      errorToast("Confirm password does not match");
    } else {
      let data = {
        registrationType: user?.registrationType,
        phoneCode: user?.phoneCode,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        username: userName,
        password: password.trim(), //password,
        token: otpToken,
      };
      navigation.navigate(SCREENS.SetProfileScreen, { data: data });
    }
  };

  useEffect(() => {
    setsuggetionList("");
    if (userName.trim() !== "") {
      let obj = {
        data: {
          registrationType: user?.registrationType,
          phoneCode: user?.phoneCode,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
          username: userName,
          token: otpToken,
        },
        onSuccess: (res: any) => {
          setsuggetionList("");
          setvalidateUsername(true);
        },
        onFailure: (res: any) => {
          console.log("res---", res?.data?.suggestList);
          if (res?.data?.suggestList) {
            setsuggetionList(res?.data?.suggestList.join(", "));
          }
          setvalidateUsername(false);
        },
      };
      dispatch(onVerifyUsername(obj));
    }
  }, [userName]);

  return (
    <View style={AppStyles.purpleMainContainer}>
      <View style={[AppStyles.flex, { justifyContent: "center" }]}>
        <View style={[AppStyles.flex, { justifyContent: "center" }]}>
          <Image source={IMAGES.usernameInput} style={AppStyles.chatLogo2} />
        </View>
        <Text style={styles.titleText}>Set username</Text>
        <Text style={styles.des}>Please enter details below</Text>
      </View>
      <View style={AppStyles.bottomWhiteView}>
        <SafeAreaView>
          <Input
            value={userName}
            extraStyle={styles.input}
            onChangeText={setuserName}
            icon={IMAGES.userInput}
            placeHolder={"Username"}
            title={"Enter username"}
            RenderRightIcon={() => {
              return (
                <Image
                  source={IMAGES.wrong}
                  style={AppStyles.rightIconTextInput}
                />
              );
            }}
          />
          {validateUsername == false && (
            <View style={styles.notAvailableView}>
              <Text style={styles.titleRed}>Username not available</Text>
              <Text style={styles.titleTextAvailable}>
                Try for : {suggetionList.replace(",", ", ")}
              </Text>
            </View>
          )}
          <Input
            RenderRightIcon={() => {
              return (
                <Image
                  source={IMAGES.right}
                  style={AppStyles.rightIconTextInput}
                />
              );
            }}
            value={password}
            extraStyle={styles.input}
            onChangeText={setpassword}
            icon={IMAGES.passwordInput}
            secureTextEntry={true}
            placeHolder={"*********"}
            title={"Enter password"}
          />
          <Input
            RenderRightIcon={() => {
              return (
                <Image
                  source={IMAGES.right}
                  style={AppStyles.rightIconTextInput}
                />
              );
            }}
            value={confirmPassword}
            extraStyle={styles.input}
            onChangeText={setConfirmPassword}
            icon={IMAGES.passwordInput}
            secureTextEntry={true}
            placeHolder={"*********"}
            title={"Confirm password"}
          />
          <ButtonPurple
            onPress={() => onCreateAccount()}
            title={"Create account"}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default SetUsernameScreen;

const styles = StyleSheet.create({
  titleText: {
    ...commonFontStyle(700, 31, colors.white),
    textAlign: "center",
  },
  des: {
    ...commonFontStyle(400, 16, colors.white),
    textAlign: "center",
    marginBottom: hp(4),
  },
  input: {
    marginBottom: hp(2),
  },
  notAvailableView: {
    backgroundColor: colors._FFF4F4_red,
    borderRadius: 15,
    padding: hp(2),
    marginBottom: hp(2),
  },
  titleRed: {
    ...commonFontStyle(500, 16, colors._DB1515_red),
  },
  titleTextAvailable: {
    ...commonFontStyle(400, 16, colors.black_23),
    marginTop: 5,
  },
});
