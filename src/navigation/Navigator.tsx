import { FC, useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { dispatchAction, useAppDispatch } from "../redux/hooks";
import { colors } from "../theme/colors";
import { Image, Text, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import { SCREENS } from "./screenNames";
import IntroScreen from "../screens/Auth/IntroScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { IMAGES } from "../assets/Images";
import { AppStyles } from "../theme/appStyles";
import SignupScreen from "../screens/Auth/SignupScreen";
import OTPScreen from "../screens/Auth/OTPScreen";
import MissCallScreen from "../screens/Auth/MissCallScreen";
import SetUsernameScreen from "../screens/Auth/SetUsernameScreen";
import SetProfileScreen from "../screens/Auth/SetProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabbar from "../component/MyTabbar";
import ContactsScreen from "../screens/Contacts/ContactsScreen";
import CallScreen from "../screens/Call/CallScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import SetNewPassword from "../screens/Auth/SetNewPassword";
import PersonalChatScreen from "../screens/Chat/PersonalChatScreen";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";

export type RootStackParamList = {
  HomeScreen: undefined;
};
const headerStyleTransparent = {
  headerStyle: {
    backgroundColor: colors._7A5DCB_purple,

    shadowOpacity: 0,
    elevation: 0,
  },
  headerTransparent: true,
  headerTitleStyle: {
    // ...commonFontStyle(i18n.language, 500, 19, colors.black),
  },
  headerTitleAlign: "center",
  ...TransitionPresets.SlideFromRightIOS,
};
const Stack = createStackNavigator<RootStackParamList>();

const BackHeader = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={AppStyles.headerBackView}
    >
      <Image source={IMAGES.rightArrow} style={AppStyles.headerBackIcon} />
    </TouchableOpacity>
  );
};

const StackNavigator: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    messaging().setAutoInitEnabled(true);
    setNotification();
  }, []);
  const setNotification = async () => {
    let authStatus = await firebase.messaging().hasPermission();

    if (authStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED) {
      requestPermission();
    }

    if (authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
      getToken();
    }
  };
  const requestPermission = () => {
    messaging()
      .requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: true,
        provisional: false,
        sound: true,
      })
      .then(() => {
        getToken();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const getToken = async () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          console.log("fcm--", fcmToken);
          // dispatchAction(dispatch, SET_FCM_TOKEN, fcmToken)
        } else {
          console.log("[FCMService] User does not have a device token");
        }
      })
      .catch((error) => {
        let err = `FCm token get error${error}`;
        console.log(err);
      });
  };
  useEffect(() => {
    notifee.cancelAllNotifications();
    notifee.cancelTriggerNotifications();
  }, []);
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          console.log(detail);
          checkNotification(detail.notification);
          break;
      }
    });
  }, []);
  const checkNotification = (remoteMessage: any) => {
    notifee.cancelAllNotifications();
    notifee.cancelTriggerNotifications();
    console.log("checkNotification-----", remoteMessage);
    // dispatchAction(dispatch, SET_NOTIFICATION_CLICK, true)
  };
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
        checkNotification(remoteMessage);
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        console.log("getInitialNotification", remoteMessage);
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", remoteMessage);
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);
  async function onDisplayNotification(message: any) {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId,
        // smallIcon: '@drawable/ic_stat_name',
      },
      ios: {},
    });
  }

  return (
    <Stack.Navigator initialRouteName={SCREENS.IntroScreen}>
      <Stack.Screen
        options={({ navigation }) => ({ headerShown: false })}
        name={SCREENS.IntroScreen}
        component={IntroScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.ForgetPassword}
        component={ForgetPassword}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.SetNewPassword}
        component={SetNewPassword}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.SignupScreen}
        component={SignupScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.OTPScreen}
        component={OTPScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.MissCallScreen}
        component={MissCallScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.SetUsernameScreen}
        component={SetUsernameScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          title: "",
          headerLeft: () => <BackHeader navigation={navigation} />,
        })}
        name={SCREENS.SetProfileScreen}
        component={SetProfileScreen}
      />
      <Stack.Screen
        name={SCREENS.HomeScreen}
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={({ navigation }) => ({ headerShown: false })}
        name={SCREENS.PersonalChatScreen}
        component={PersonalChatScreen}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabbar {...props} />}
      // initialRouteName={screenName.indiansPage}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: "Home",
          headerShown: false,
        })}
        name={SCREENS.HomeScreen}
        component={HomeScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: "Contacts",
          headerShown: false,
        })}
        name={SCREENS.ContactsScreen}
        component={ContactsScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: "Calls",
          title: "",
          headerStyle: {
            shadowColor: colors.black,
            elevation: 50,
          },
        })}
        name={SCREENS.CallScreen}
        component={CallScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: "",
          title: "",
          headerStyle: {
            shadowColor: colors.black,
            elevation: 50,
          },
        })}
        name={SCREENS.ProfileScreen}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
