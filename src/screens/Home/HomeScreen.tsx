import {
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GradientView from "../../component/GradientView";
import { AppStyles } from "../../theme/appStyles";
import HomeHeader from "../../component/HomeHeader";
import { IMAGES } from "../../assets/Images";
import SearchInput from "../../component/SearchInput";
import { hp } from "../../theme/fonts";
import { SwipeListView } from "react-native-swipe-list-view";
import ChatListItem from "../../component/ChatListItem";
import { colors } from "../../theme/colors";
import {
  Emit_Event,
  sendData,
  socket,
  socketConnect,
} from "../../Socket/socket";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import StoryButton from "../../component/StoryButton";
import { useFocusEffect } from "@react-navigation/native";
import { removeAuthorization } from "../../utils/apiGlobal";
import { clearAsync } from "../../utils/asyncStorage";
import { resetNavigation } from "../../utils/commonFunction";
import { SCREENS } from "../../navigation/screenNames";
import Contacts from "react-native-contacts";
import { onSetContacts } from "../../service/AuthServices";

type Props = {};

const HomeScreen = (props: Props) => {
  const [search, setsearch] = useState("");
  const dispatch = useAppDispatch();
  const { chatHistory } = useAppSelector((e) => e.common);
  const listViewData = Array(20)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

  useEffect(() => {
    if (Platform.OS == "ios") {
      Contacts.getAll().then((contacts) => {
        // setContacts(contacts);
        console.log("---", contacts);
        // uploadContact(contacts);
      });
    } else if (Platform.OS == "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
        buttonPositive: "Please accept bare mortal",
      }).then(() => {
        try {
          Contacts.getAll()
            .then((contacts) => {
              console.log(contacts);
              let contactsTemp: { name: string; number: string }[] = [];
              contacts.forEach((obj) => {
                contactsTemp.push({
                  name: obj.displayName,
                  number: obj.phoneNumbers[0].number,
                });
              });
              uploadContact(contactsTemp);
              console.log(contactsTemp);
            })
            .catch((e) => {
              //handle error
            });
        } catch (e) {
          console.log("e", e);
        }
      });
    }
  }, []);

  const uploadContact = (data: any) => {
    let obj = {
      data: {
        contacts: data,
      },
      onSuccess: () => {},
    };
    dispatch(onSetContacts(obj));
  };

  useEffect(() => {
    socketConnect(dispatch, (flag: any) => {
      console.log(flag);
      if (flag) {
        // socket.emit(Emit_Event.CHATS_HISTORY_LIST)
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        sendData(Emit_Event.CHATS_HISTORY_LIST, {
          search: "",
          page: "",
          perPage: "",
        });
        // socket.emit(Emit_Event.CHATS_HISTORY_LIST, (res: any) => {
        //     console.log(res)
        // })
      }, 500);
    }, [])
  );

  const renderHiddenItem = ({ item, rowMap }: any) => (
    <View style={styles.hiddenRow}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
        <Image source={IMAGES.deleteIcon} style={styles.deleetIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <GradientView>
      <SafeAreaView style={AppStyles.flex}>
        <HomeHeader type={"home"} />
        <View
          style={[
            AppStyles.bottomWhiteViewWithoutPadding,
            { flex: 1, paddingVertical: hp(2) },
          ]}
        >
          <TouchableOpacity
            onPress={async () => {
              removeAuthorization();
              await clearAsync();
              resetNavigation(SCREENS.LoginScreen);
            }}
            style={{
              alignSelf: "flex-end",
              paddingBottom: hp(1),
              paddingHorizontal: hp(1),
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
          <View style={styles.searchView}>
            <SearchInput value={search} onChangeText={setsearch} />
          </View>
          <SwipeListView
            data={chatHistory}
            renderItem={(data, rowMap) => <ChatListItem data={data} />}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-80}
            leftOpenValue={0}
            disableRightSwipe={false}
            ListFooterComponent={() => <View style={{ height: 70 }} />}
          />
          <StoryButton />
        </View>
      </SafeAreaView>
    </GradientView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchView: {
    paddingHorizontal: hp(2),
  },
  hiddenRow: {
    // alignItems: 'flex-end',
    backgroundColor: colors.mainPurple,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp(2),
  },
  deleteButton: {
    // width: 100,
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
  deleetIcon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});
