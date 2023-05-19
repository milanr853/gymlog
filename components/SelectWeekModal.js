import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import RollPickerNative from "roll-picker-native"
import { hideWeekModal } from '../redux/weekModalViewSlice';
import { useDispatch } from "react-redux"
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';



function SelectWeekModal({ handleDayPress, selectedDayObject, markedDates }) {
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
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center">
            <View className="w-[75%] bg-white rounded-md items-center text-lg space-y-4 mb-4">
                <View className="border-b border-gray-200 w-full items-center justify-center py-1">
                    <Text className="text-gray-400 font-bold">Select no. of weeks</Text>
                </View>
                <View className="border border-blue-500 h-[46px] overflow-hidden p-1 rounded-lg w-[80px] mb-2 justify-center items-center flex-row">
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

            {weeks >= 1 && <TouchableOpacity activeOpacity={0.7} className="w-[75%] bg-green-500 rounded-md items-center justify-center  py-2" onPress={setNumOfWeeks}>
                <Text className="text-white text-xl ">Confirm</Text>
            </TouchableOpacity>}

            <TouchableOpacity className="absolute top-[25%] justify-center items-center bg-white w-[45px] h-[45px] rounded-full" activeOpacity={1} onPress={closeModal}>
                <View className="justify-center items-center bg-red-400 w-[40px] h-[40px] rounded-full">
                    <Ionicons name="close-outline" size={32} color='white'></Ionicons>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SelectWeekModal