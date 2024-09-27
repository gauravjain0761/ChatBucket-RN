import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux';
import Toast from 'react-native-toast-message';
import { colors } from './src/theme/colors';
import { hp, commonFontStyle } from './src/theme/fonts';
import StackNavigator from './src/navigation/StackNavigator';
import RootContainer from './src/navigation/mainNavigator';
import SplashScreen from 'react-native-splash-screen';

type Props = {};

const App = (props: Props) => {
  LogBox.ignoreAllLogs()

  const toastConfig = {
    success: ({ text1, text2, type, props, ...rest }: any) =>
      type === 'success' && (
        <View style={styles.textStyleToastSuccess}>
          <Text style={styles.textStyleToast}>{text1}</Text>
        </View>
      ),
    error: ({ text1, text2, type, props, ...rest }: any) => {
      if (type === 'error') {
        return (
          <View style={styles.toastStyle}>
            <Text style={styles.textStyleToast}>{text1}</Text>
          </View>
        );
      }
    },
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 3000);

  }, [])


  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <RootContainer />
        <Toast
          config={toastConfig}
          position="bottom"
        />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  toastStyle: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 50,
    borderRadius: 5,
    borderLeftWidth: 6,
    borderLeftColor: 'red',
    borderWidth: 1.5,
    borderColor: 'red',
  },
  textStyleToastSuccess: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 50,
    borderRadius: 5,
    borderLeftWidth: 6,
    borderLeftColor: 'green',
    borderWidth: 1.5,
    borderColor: 'green',
  },
  textStyleToast: {
    marginLeft: hp(2),
    ...commonFontStyle(500, 14, colors.black),
  },
});
