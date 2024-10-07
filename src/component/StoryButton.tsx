import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonFontStyle, hp } from '../theme/fonts'
import { IMAGES } from '../assets/Images'
import { colors } from '../theme/colors'
import ReactNativeModal from 'react-native-modal'

type Props = {}

const StoryButton = (props: Props) => {
    const [showPeople, setshowPeople] = useState(false)


    return (
        <View style={styles.storyButton}>
            {!showPeople && <TouchableOpacity onPress={() => setshowPeople(true)} style={styles.mainButton}>
                <Image source={IMAGES.storiesIcon} style={styles.mainIcon} />
            </TouchableOpacity>}
            <ReactNativeModal isVisible={showPeople} onBackdropPress={() => setshowPeople(false)} style={styles.modalView} backdropColor='transparent' >
                <View style={styles.mainView}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => setshowPeople(true)} >
                            <Image source={IMAGES.addStory} style={styles.addButton} />
                            <Text numberOfLines={1} style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => setshowPeople(true)} >
                                        <View style={styles.peopleView}>
                                            <Image source={IMAGES.userImage} style={styles.peopleImage} />
                                        </View>

                                        <Text numberOfLines={1} style={styles.addText}>William</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </ScrollView>
                </View>
            </ReactNativeModal>
        </View>
    )
}

export default StoryButton

const styles = StyleSheet.create({
    storyButton: {
        position: 'absolute',
        bottom: 130,
        right: hp(2),
    },
    mainButton: {
        height: 50,
        width: 50,
        backgroundColor: colors.white,
        borderRadius: 50 / 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainIcon: {
        height: 30,
        width: 30,
    },
    mainView: {
        backgroundColor: colors.white,
        bottom: 100,
        right: hp(2),
        width: 60,
        maxHeight: '65%',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        padding: 5,
        overflow: 'hidden'
    },
    modalView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: 0
    },
    addButton: {
        height: 50,
        width: 50,
        resizeMode: 'contain',

    },
    peopleView: {
        height: 50,
        width: 50,
        backgroundColor: colors.white,
        borderRadius: 50 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.mainPurple
    },
    addText: {
        ...commonFontStyle(500, 13, colors.black_23),
        textAlign: 'center',
        marginTop: 3,
        marginBottom: 8
    },
    peopleImage: {
        height: 37,
        width: 37,
        borderRadius: 37 / 2,
        resizeMode: 'contain'
    }
})