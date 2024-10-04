import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../theme/colors';

type Props = {};

const Loader = ({ visible = false }) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={'large'} color={colors.white} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
});
