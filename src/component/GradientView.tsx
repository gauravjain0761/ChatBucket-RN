import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';
import { AppStyles } from '../theme/appStyles';

type Props = {}

const GradientView = ({ children }: any) => {
    return (
        <LinearGradient locations={[0, 0.2]} style={AppStyles.flex} colors={colors.gradientPurple}>
            {children}
        </LinearGradient>
    )
}

export default GradientView

const styles = StyleSheet.create({})