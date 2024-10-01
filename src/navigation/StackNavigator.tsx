import { FC } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useAppDispatch } from '../redux/hooks';
import { colors } from '../theme/colors';
import { Image, Text, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import { SCREENS } from './screenNames';
import IntroScreen from '../screens/Auth/IntroScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import { IMAGES } from '../assets/Images';
import { AppStyles } from '../theme/appStyles';
import SignupScreen from '../screens/Auth/SignupScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
import MissCallScreen from '../screens/Auth/MissCallScreen';
import SetUsernameScreen from '../screens/Auth/SetUsernameScreen';
import SetProfileScreen from '../screens/Auth/SetProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabbar from '../component/MyTabbar';
import ContactsScreen from '../screens/Contacts/ContactsScreen';
import CallScreen from '../screens/Call/CallScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
export type RootStackParamList = {
  HomeScreen: undefined
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
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS,
};
const Stack = createStackNavigator<RootStackParamList>();

const BackHeader = ({ navigation }: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={AppStyles.headerBackView}>
      <Image source={IMAGES.rightArrow} style={AppStyles.headerBackIcon} />
    </TouchableOpacity>
  )
}

const StackNavigator: FC = () => {
  const dispatch = useAppDispatch();


  //   const checkNotification = (remoteMessage: any) => {};
  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //       checkNotification(remoteMessage);
  //     }
  //   });
  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log('getInitialNotification', remoteMessage);
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //       checkNotification(remoteMessage);
  //     });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     checkNotification(remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     checkNotification(remoteMessage);
  //     onDisplayNotification(remoteMessage);
  //   });
  //   return unsubscribe;
  // }, []);
  // async function onDisplayNotification(message: any) {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: AndroidImportance.HIGH,
  //   });
  //   notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_stat_name',
  //       sound: 'noti.mp3',
  //     },
  //     ios: {
  //       sound: 'noti.wav',
  //     },
  //   });
  // }
  return (
    <Stack.Navigator initialRouteName={SCREENS.HomeScreen}>
      <Stack.Screen options={({ navigation }) => ({ headerShown: false })} name={SCREENS.IntroScreen} component={IntroScreen} />
      <Stack.Screen options={({ navigation }) => ({ ...headerStyleTransparent, title: '', headerLeft: () => <BackHeader navigation={navigation} /> })} name={SCREENS.LoginScreen} component={LoginScreen} />
      <Stack.Screen options={({ navigation }) => ({ ...headerStyleTransparent, title: '', headerLeft: () => <BackHeader navigation={navigation} /> })} name={SCREENS.SignupScreen} component={SignupScreen} />
      <Stack.Screen options={({ navigation }) => ({ ...headerStyleTransparent, title: '', headerLeft: () => <BackHeader navigation={navigation} /> })} name={SCREENS.OTPScreen} component={OTPScreen} />
      <Stack.Screen options={({ navigation }) => ({ ...headerStyleTransparent, title: '', headerLeft: () => <BackHeader navigation={navigation} /> })} name={SCREENS.MissCallScreen} component={MissCallScreen} />
      <Stack.Screen options={({ navigation }) => ({ ...headerStyleTransparent, title: '', headerLeft: () => <BackHeader navigation={navigation} /> })} name={SCREENS.SetUsernameScreen} component={SetUsernameScreen} />
      <Stack.Screen options={({ navigation }) => ({ ...headerStyleTransparent, title: '', headerLeft: () => <BackHeader navigation={navigation} /> })} name={SCREENS.SetProfileScreen} component={SetProfileScreen} />
      <Stack.Screen
        name={SCREENS.HomeScreen}
        component={MyTabs}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default StackNavigator;


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabbar {...props} />}
      // initialRouteName={screenName.indiansPage}

      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: 'Home',
          title: '',
          headerShown: false
        })}
        name={SCREENS.HomeScreen}
        component={HomeScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: 'Contacts',
          title: '',
          headerStyle: {
            shadowColor: colors.black,
            elevation: 50,
          },
        })}
        name={SCREENS.ContactsScreen}
        component={ContactsScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarLabel: 'Calls',
          title: '',
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
          tabBarLabel: '',
          title: '',
          headerStyle: {
            shadowColor: colors.black,
            elevation: 50,
          },
        })}
        name={SCREENS.ProfileScreen}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}