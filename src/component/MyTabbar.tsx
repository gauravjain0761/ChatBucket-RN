import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../assets/Images'
import { commonFontStyle, SCREEN_WIDTH } from '../theme/fonts'
import { SCREENS } from '../navigation/screenNames'
import { colors } from '../theme/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RenderUserIcon from './RenderUserIcon'

type Props = {}

const MyTabbar = ({ state, descriptors, navigation }: any) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ position: 'absolute', bottom: 0 }}
        >

            <Image source={IMAGES.tabBG} style={[styles.tabBg, { height: 100 + insets.bottom }]} />
            <View style={styles.rowStyle}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };
                    let iconName;
                    if (route.name === SCREENS.HomeScreen) {
                        iconName = IMAGES.homeTab;
                    } else if (route.name === SCREENS.ContactsScreen) {
                        iconName = IMAGES.contacts;
                    } else if (route.name === SCREENS.CallScreen) {
                        iconName = IMAGES.call;
                    } else if (route.name === SCREENS.ProfileScreen) {
                        iconName = IMAGES.homeTab;
                    }
                    const onLongPress = () => { navigation.emit({ type: 'tabLongPress', target: route.key, }); };
                    if (route.name === SCREENS.ProfileScreen) {
                        return (
                            <TouchableOpacity
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.itemContainer}>
                                <RenderUserIcon size={35} />
                            </TouchableOpacity>
                        )
                    }
                    return (

                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.itemContainer}>
                            <Image
                                style={{
                                    ...styles.iconStyle,
                                    tintColor: isFocused ? colors.mainPurple : colors.gray_80,
                                }}
                                source={iconName}
                            />
                            <Text
                                style={{
                                    ...styles.labelTextStyle,
                                    color: isFocused ? colors.mainPurple : colors.gray_80,
                                }}>
                                {label}
                            </Text>

                        </TouchableOpacity>

                    );
                })}
            </View>
        </View>
    )
}

export default MyTabbar

const styles = StyleSheet.create({
    tabBg: {
        resizeMode: 'stretch',
        width: SCREEN_WIDTH,
        backgroundColor: 'transparent'
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent'
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        height: 65,
        justifyContent: 'center',
    },
    iconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    labelTextStyle: {
        ...commonFontStyle(500, 15, colors.gray_80),
        marginTop: 3
    }
})