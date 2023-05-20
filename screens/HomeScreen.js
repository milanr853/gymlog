import React, { useState } from 'react'
import { CalendarList, } from 'react-native-calendars';
import moment from 'moment/moment';
import Layout from '../components/Layout';
import SelectWeekModal from '../components/SelectWeekModal';
import { useDispatch, useSelector } from "react-redux"
import { showWeekModal } from '../redux/weekModalViewSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import { markedDatesColorCodes } from '../constants/Constants';
import { allColors } from "../constants/Variable"



function HomeScreen() {
    const [markedDates, setMarkedDates] = useState({});
    const [dayObject, setDayObject] = useState(null);

    var currentDate = moment().format("YYYY-MM-DD");

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const weekModalView = useSelector(store => store.weekModalViewReducer.show)

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
                    ...prev,
                    [day.dateString]: {
                        startingDay: true, color: randomColor, textColor: 'white', id: uid
                    },
                    ...markDates(day, weeks),
                }
            }
            )
        }
    }

    ///////////////////////////
    const goToEventPage = (day) => {
        navigation.navigate("Event", { day })
    }
    //////////////////////////

    // C.R api for home screen
    // 2 apis



    return (
        <Layout>

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
                onDayPress={day => {
                    goToEventPage(day.dateString)
                }}

                markedDates={markedDates}

                markingType={'period'}
                minDate={currentDate}

                // onDayLongPress={day => {
                //     setDayObject(day)
                //     dispatch(showWeekModal())
                // }}
                style={{ marginBottom: 24 }}

                theme={
                    {
                        calendarBackground: allColors.calendarbg,
                        dayTextColor: allColors.calendartext,
                        textDisabledColor: allColors.calendartextdisable,
                        monthTextColor: allColors.calendartext,

                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }
                }
            />

            {weekModalView && <SelectWeekModal handleDayPress={handleDayPress} selectedDayObject={dayObject} markedDates={markedDates} />}
        </Layout>

    )
}

export default HomeScreen