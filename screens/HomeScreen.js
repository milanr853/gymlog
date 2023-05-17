import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { CalendarList, } from 'react-native-calendars';
import moment from 'moment/moment';
import Layout from '../components/Layout';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SelectWeekModal from '../components/SelectWeekModal';
import { useDispatch, useSelector } from "react-redux"
import { showWeekModal } from '../redux/weekModalViewSlice';
import { nanoid } from '@reduxjs/toolkit';



function HomeScreen() {
    const navigation = useNavigation()

    const [markedDates, setMarkedDates] = useState({});
    const [dayObject, setDayObject] = useState(null);

    var currentDate = moment().format("YYYY-MM-DD");

    const dispatch = useDispatch()

    const weekModalView = useSelector(store => store.weekModalViewReducer.show)

    // Hiding header of React Navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const markedDatesColorCodes = ["#1B9C85", "#ffa500", '#5C469C', "#CBB279", "#088395", "#E86A33", "#393646"]
    let generateRandomMarkerColor = () => markedDatesColorCodes[Math.floor(Math.random() * markedDatesColorCodes.length)];
    let randomColor = generateRandomMarkerColor()

    const uid = nanoid()

    function markDates(day, weeks) {
        // Selected date
        let selectedDate = moment(day.dateString); // Replace with your selected date
        // Calculate the number of days remaining in the week
        let daysRemaining = 6 - selectedDate.day(); // Assuming Sunday is the first day of the week (0-indexed)
        let totalDays = daysRemaining >= 6 ? weeks * 7 - 1 : daysRemaining + weeks * 7

        const arr = []
        for (var i = 1; i <= totalDays; i++) {
            arr.push(i);
        }

        const obj = {}
        arr.forEach((elem, ind) => {
            obj[[moment(day.dateString).add(elem, 'days').format('YYYY-MM-DD')]] = {
                color: randomColor, textColor: 'white', endingDay: ind === arr.length - 1 ? true : false,
                id: uid
            }
        })
        return obj
    }

    const handleDayPress = (day, weeks) => {
        if (![...Object.keys(markedDates)].includes(day.dateString)) {
            // Selected date
            let selectedDate = moment(day.dateString); // Replace with your selected date
            // Calculate the number of days remaining in the week
            let daysRemaining = 6 - selectedDate.day(); // Assuming Sunday is the first day of the week (0-indexed)
            let totalDays = daysRemaining >= 6 ? weeks * 7 - 1 : daysRemaining + weeks * 7
            const lastDateInTheRange = moment(day.dateString).add(totalDays, 'days').format('YYYY-MM-DD')


            const all_selected_dates = [...Object.keys(markedDates)]

            // to get all filtered dates on and after the selected date
            let filteredDates = all_selected_dates.filter((date) => {
                return moment(date).isSame(day.dateString) || moment(date).isAfter(day.dateString);
            });

            var range_id;

            filteredDates.length && filteredDates.forEach(date => {
                if (moment(date).isAfter(lastDateInTheRange)) {
                    if (markedDates[date].id === range_id) { delete markedDates[date]; return }
                    else return
                }
                range_id = markedDates[date].id
                delete markedDates[date]
            })


            setMarkedDates(prev => {
                return {
                    [day.dateString]: {
                        startingDay: true, color: randomColor, textColor: 'white', id: uid
                    },
                    ...markDates(day, weeks),
                    ...prev
                }
            }
            )
        }
    }

    console.log(markedDates)
    ////////////////////////////
    const createRoutine = () => {
        console.debug(currentDate);
    }


    console.log(markedDates)

    return (
        <>
            <View className="bg-yellow-200 w-full z-10 fixed h-[60px] flex-row items-center px-4 justify-between">
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity >
                        <Ionicons name='reorder-three-outline' size={32} color='black' />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Gym Log</Text>
                </View>

                <TouchableOpacity className="flex-row" onPress={createRoutine}>
                    <Ionicons name="duplicate-outline" size={28} color='black'></Ionicons>
                </TouchableOpacity>
            </View>

            <StatusBar style='auto' hidden={true} />

            <CalendarList
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={0}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={12}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}

                // for specific event view
                // onDayPress={day => {
                //     console.debug(day.dateString)
                // }}

                markedDates={markedDates}

                theme={{
                    // calendarBackground: 'orange', // calender background
                    // textSectionTitleColor: 'orange',// day text color
                    // selectedDayBackgroundColor: 'orange',// selected day bg color
                    // selectedDayTextColor: 'black',// selected day text color
                    // todayTextColor: 'red',// today text color
                    // dayTextColor: 'red',// date text color
                    // textDisabledColor: 'red',// disable text color
                    // dotColor: 'black',
                }}
                markingType={'period'}
                minDate={currentDate}

                onDayLongPress={day => {
                    setDayObject(day)
                    dispatch(showWeekModal())
                }}
                style={{ marginBottom: 24 }}
            />

            {weekModalView && <SelectWeekModal handleDayPress={handleDayPress} selectedDayObject={dayObject} />}
        </>

    )
}

export default HomeScreen