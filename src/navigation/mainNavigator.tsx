import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, { FC } from 'react';
import { useAppSelector } from '../redux/hooks';
import Loader from '../component/Loader';
import StackNavigator from './StackNavigator';
import { StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export const navigationRef = createNavigationContainerRef();

const RootContainer: FC = () => {
  const { isLoading } = useAppSelector(state => state.common);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.mainPurple} />
      {/* <Loader visible={isLoading} /> */}
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootContainer;
