import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../theme/fonts';

type Props = {
    isVisible: boolean;
    onCloseModal: () => void;
    children: any;
}

const ModalWrapper = ({ isVisible,
    onCloseModal,
    children, }: Props) => {
    const insets = useSafeAreaInsets()
    return (
        <Modal
            onBackButtonPress={onCloseModal}
            onBackdropPress={onCloseModal}
            isVisible={isVisible}
            style={styles.container}
        >
            <View style={[styles.innerContainer, { paddingBottom: insets.bottom + hp(2) }]}>
                <View style={styles.line} />
                {children}
            </View>
        </Modal>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        justifyContent: "flex-end",
    },
    innerContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
        paddingHorizontal: hp(2)
    },
    line: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: hp(2.5),

    }
})