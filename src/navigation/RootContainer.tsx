import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, { FC } from 'react';
import { useAppSelector } from '../redux/hooks';
import Loader from '../component/Loader';
import StackNavigator from './Navigator';
import { StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export const navigationRef = createNavigationContainerRef();

const RootContainer: FC = () => {
  const { isLoading } = useAppSelector(state => state.common);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.mainPurple} />
      {isLoading && <Loader />}
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootContainer;
