import React, { useState } from 'react'
import { CalendarList, } from 'react-native-calendars';
import moment from 'moment/moment';
import Layout from '../components/Layout';
import SelectWeekModal from '../components/SelectWeekModal';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import { markedDatesColorCodes } from '../constants/Constants';
import { allColors } from "../constants/Variable"



function HomeScreen() {
    const [markedDates, setMarkedDates] = useState({});

    let currentDate = moment().format("YYYY-MM-DD");

    const navigation = useNavigation()

    let generateRandomMarkerColor = () => markedDatesColorCodes[Math.floor(Math.random() * markedDatesColorCodes.length)];

    let randomColor = generateRandomMarkerColor()

    const uid = nanoid()

    function markDates(day, totalDaysInTheProgram) {

        const arr = []

        for (var i = 1; i <= totalDaysInTheProgram; i++) {
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


    const handleDayPress = (startDate, weeks) => {
        if (![...Object.keys(markedDates)].includes(startDate.dateString)) {

            let totalDaysInTheProgram = weeks * 7 - 1

            const lastDateInTheRange = moment(startDate.dateString).add(totalDaysInTheProgram, 'days').format('YYYY-MM-DD')

            const all_selected_dates = [...Object.keys(markedDates)]

            // to get all filtered dates on and after the selected date
            let filteredDates = all_selected_dates.filter((date) => {
                return moment(date).isSame(startDate.dateString) || moment(date).isAfter(startDate.dateString);
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
                    [startDate.dateString]: {
                        startingDay: true, color: randomColor, textColor: 'white', id: uid
                    },
                    ...markDates(startDate, totalDaysInTheProgram),
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

            <SelectWeekModal
                handleDayPress={handleDayPress}
                markedDates={markedDates}
            />
        </Layout>

    )
}

export default HomeScreen