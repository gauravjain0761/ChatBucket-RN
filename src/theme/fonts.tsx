export function getFontType(fontWeight: any) {
  if (fontWeight == 600) {
    return 'SF-Pro-Text-Semibold';
  } else if (fontWeight == 400) {
    return 'SF-Pro-Text-Regular';
  } else if (fontWeight == 700) {
    return 'SF-Pro-Text-Bold';
  } else if (fontWeight == 800) {
    return 'SF-Pro-Text-Black';
  } else if (fontWeight == 500) {
    return 'SF-Pro-Text-Medium';
  } else if (fontWeight == 300) {
    return 'SF-Pro-Text-Light';
  } else {
    return 'SF-Pro-Text-Regular';
  }
}

export const commonFontStyle = (fontWeight: any, fontSize: any, color: any) => {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: actuatedNormalize(fontSize - 2),
    color: color,
    includeFontPadding: false,
  };
};

import { Dimensions, Platform, PixelRatio } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

export const hp = (i: any) => {
  return heightPercentageToDP(i);
};

export const wp = (i: any) => {
  return widthPercentageToDP(i);
};
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size: any) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
