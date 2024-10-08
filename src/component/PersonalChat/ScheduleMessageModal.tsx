import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { commonFontStyle, hp } from '../../theme/fonts'
import { colors } from '../../theme/colors'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { IMAGES } from '../../assets/Images'
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown'
import ButtonPurple from '../ButtonPurple'

type Props = {
    isVisible: boolean,
    onCloseModal: () => void,
}
let monthArray = [{ title: "January" }, { title: "February" }, { title: "March" }, { title: "April" }, { title: "May" }, { title: "June" }, {
    title: "July"
}, { title: "August" }, { title: "September" }, { title: "October" }, { title: "November" }, { title: "December" }];

const ScheduleMessageModal = ({ isVisible, onCloseModal }: Props) => {
    const [date, setDate] = useState(new Date());
    const [month, setmonth] = useState(moment(date).format('MMMM'))
    const [year, setyear] = useState(moment(date).format('YYYY'))
    const [yearArray, setyearArray] = useState([])
    useEffect(() => {
        let currentYear = Number(moment(date).format('YYYY'))
        let years = []
        let i = 0
        while (i <= 10) {
            years.push({ title: String(currentYear + i) })
            i++;
        }
        console.log(years)
        setyearArray(years)
    }, [])

    console.log(moment(date).format('hh:mm:ss'))

    return (
        <ModalWrapper isVisible={isVisible} onCloseModal={onCloseModal}>
            <View>
                <Text style={styles.title}>Schedule message</Text>
                <View style={styles.rowView}>
                    <Dropdown
                        style={styles.boxView}
                        placeholderStyle={styles.text}
                        selectedTextStyle={styles.text}
                        data={monthArray}
                        maxHeight={170}
                        labelField="title"
                        valueField="title"
                        value={month}
                        iconColor={colors.black_23}
                        onChange={item => {
                            setmonth(item.title);
                        }}
                        renderItem={(item) => {
                            return <Text style={[styles.text, { marginVertical: 5, marginHorizontal: 5 }]}>{item.title}</Text>
                        }}
                        autoScroll={false}
                    />
                    <Dropdown
                        style={styles.boxView}
                        placeholderStyle={styles.text}
                        selectedTextStyle={styles.text}
                        data={yearArray}
                        maxHeight={170}
                        labelField="title"
                        valueField="title"
                        value={year}
                        iconColor={colors.black_23}
                        onChange={item => {
                            setyear(item.title);
                        }}
                        renderItem={(item) => {
                            return <Text style={[styles.text, { marginVertical: 5, marginHorizontal: 5 }]}>{item.title}</Text>
                        }}
                        autoScroll={false}
                    />
                    {/* <TouchableOpacity style={styles.boxView}>
                        <Text style={styles.text}>{moment(date).format('MMMM')}</Text>
                        <Image source={IMAGES.bottomArrow} style={styles.bottomArrow} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView}>
                        <Text style={styles.text}>{moment(date).format('YYYY')}</Text>
                        <Image source={IMAGES.bottomArrow} style={styles.bottomArrow} />
                    </TouchableOpacity> */}
                </View>
                <DatePicker
                    date={date}
                    mode='time'
                    style={{ alignSelf: 'center', marginVertical: 20 }}
                    onDateChange={setDate}
                />
                <ButtonPurple title='Schedule' onPress={onCloseModal} />
                {/* <RNDateTimePicker value={date} mode="time" /> */}
            </View>
        </ModalWrapper>
    )
}

export default ScheduleMessageModal

const styles = StyleSheet.create({
    title: {
        ...commonFontStyle(600, 16, colors.black_23),
    },
    rowView: {
        flexDirection: 'row',
        gap: hp(2)
    },
    boxView: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors._DADADA_gray,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        marginTop: hp(3),
        paddingHorizontal: hp(2.5),
        justifyContent: 'space-between'
    },
    bottomArrow: {
        tintColor: colors.black_23,
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
    text: {
        ...commonFontStyle(400, 16, colors.black_23)
    }
})