import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import RollPickerNative from "roll-picker-native"
import { hideWeekModal } from '../redux/weekModalViewSlice';
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import ModalWrapper from './ModalWrapper';
import SaveButton from './SaveButton';
import Ionicons from '@expo/vector-icons/Ionicons';




function SelectWeekModal({ handleDayPress, markedDates }) {
    const show = useSelector(store => store.weekModalViewReducer.show)

    const [weeks, setWeeks] = useState(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
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

        // handleDayPress(selectedDayObject ? selectedDayObject : continuingDate(), weeks)
        handleDayPress(continuingDate(), weeks)
        setWeeks(0)
    }

    const closeModal = () => {
        dispatch(hideWeekModal())
        setWeeks(0)
    }

    const currentDateRef = useRef(moment().format("YYYY-MM-DD")).current

    const calcStartDate = () => {
        const arrOfKeys = Object.keys(markedDates)
        const exists = arrOfKeys.includes(currentDateRef)

        if (exists) {
            const lastKey = arrOfKeys[arrOfKeys.length - 1];
            const startDate = moment(lastKey).add(1, 'days').format("DD MMM YYYY")
            setFromDate(startDate)
        }
        else {
            const nowDate = moment().format("DD MMM YYYY")
            setFromDate(nowDate)
        }
    }

    useEffect(() => {
        calcStartDate()
    }, [markedDates])

    useEffect(() => {
        if (!fromDate) return
        const endDate = moment(currentDateRef).add(7 * weeks, 'days').format('DD MMM YYYY')
        setToDate(endDate)
    }, [weeks, fromDate])




    return (
        show &&
        <ModalWrapper closeModal={closeModal}>


            <View className="w-[90%] rounded-md items-center space-y-4 bg-white p-4">

                <View className="border-b border-gray-200 w-full items-center justify-center">
                    <Text className="font-semibold text-gray-400">SET YOU PROGRAM</Text>
                </View>

                <View className="w-full justify-between items-center">
                    <View className="flex-row items-center bg-slate-200 p-3 rounded-md w-[200px] space-x-2 justify-between">
                        <Ionicons name="calendar-outline" size={20} color={'#9ca3af'}></Ionicons>
                        <Text className='text-gray-400'>FROM:</Text>
                        <View className="flex-row flex-1 items-center justify-center h-full">
                            <Text className='text-gray-400'>{fromDate}</Text>
                        </View>
                    </View>
                </View>

                <View className="w-full justify-center items-center ">
                    <View className="border border-gray-400 h-[46px] overflow-hidden p-1 
                    rounded-lg w-[80px] justify-center items-center flex-row">
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

                <View className="w-full justify-between items-center">
                    <View className="flex-row items-center bg-slate-200 p-3 rounded-md w-[200px] space-x-2 justify-between">
                        <Ionicons name="calendar-outline" size={20} color={'#9ca3af'}></Ionicons>
                        <Text className='text-gray-400'>TO:</Text>
                        <View className="flex-row flex-1 items-center justify-center h-full">
                            <Text className='text-gray-400'>{toDate}</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-center items-center space-x-1">
                    <Ionicons size={16} color={'gray'} name="information-circle-outline"></Ionicons>
                    <Text className="text-gray-400">
                        duration in terms of weeks
                    </Text>
                </View>
            </View>


            {weeks >= 1 &&
                <SaveButton onPress={setNumOfWeeks} text={'CONFIRM'} />
            }


        </ModalWrapper>
    )
}

export default SelectWeekModal