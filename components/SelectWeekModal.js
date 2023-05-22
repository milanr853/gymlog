import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import RollPickerNative from "roll-picker-native"
import { hideWeekModal } from '../redux/weekModalViewSlice';
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import ModalWrapper from './ModalWrapper';
import { allColors } from "../constants/Variable"
import SaveButton from './SaveButton';




function SelectWeekModal({ handleDayPress, selectedDayObject, markedDates }) {
    const show = useSelector(store => store.weekModalViewReducer.show)

    const [weeks, setWeeks] = useState(0);
    const weeksArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    const dispatch = useDispatch()

    const continuingDate = () => {
        const date_keys = Object.keys(markedDates)

        const currentDate = date_keys.length ? moment(`${date_keys[date_keys.length - 1]}`).add(1, 'day') : moment()

        const date = {
            "year": currentDate.year(),
            "month": currentDate.month() + 1,
            "day": currentDate.date(),
            "timestamp": currentDate.valueOf(),
            "dateString": currentDate.format("YYYY-MM-DD")
        }
        return date
    }

    const setNumOfWeeks = () => {
        if (weeks <= 0) return
        dispatch(hideWeekModal())

        handleDayPress(selectedDayObject ? selectedDayObject : continuingDate(), weeks)
        setWeeks(0)
    }

    const closeModal = () => {
        dispatch(hideWeekModal())
        setWeeks(0)
    }




    return (
        show &&
        <ModalWrapper closeModal={closeModal}>


            <View className="w-[90%] rounded-md items-center text-lg pb-4 space-y-4 mb-8 bg-white">
                <View className="border-b border-gray-200 w-full items-center justify-center py-4">
                    <Text className="font-bold text-gray-400">SELECT NO. OF WEEKS</Text>
                </View>

                <View className="p-2 w-full justify-center items-center">
                    <View className="border border-gray-400 h-[46px] overflow-hidden p-1 
                    rounded-lg w-[80px] mb-2 justify-center items-center flex-row">
                        <RollPickerNative
                            items={weeksArr}
                            containerHeight={38}
                            selectHeight={24}
                            style={{ borderRadius: 8 }}
                            onIndexChange={(index) => { setWeeks(index) }}
                            index={weeks}
                        />
                    </View>
                </View>
            </View>


            {weeks >= 1 &&
                <SaveButton onPress={setNumOfWeeks} text={'CONFIRM'} />
            }


        </ModalWrapper>
    )
}

export default SelectWeekModal