import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Animated } from 'react-native'
import Layout from '../components/Layout'
import SpecificExerciseModal from '../components/SpecificExerciseModal'
import { useRoute } from '@react-navigation/native'
import moment from 'moment/moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddMuscleSetModal from '../components/AddMuscleSetModal'

import { useDispatch, useSelector } from 'react-redux'
import { showExerciseModal } from '../redux/exerciseAddModal'
import { removeExerciseFromStack } from '../redux/exerciseStackSlice'
import { eventTypes } from '../constants/Constants'
import { fetchExerciseData, showExerciseDataModal } from '../redux/exerciseDataSlice'
import ExerciseDataModal from '../components/ExerciseDataModal'
import { allColors } from '../constants/Variable'
import EventScreenEventView from '../components/EventScreenEventView'
import EventScreenScrollView from '../components/EventListScrollView'

// multiple muscleSet in an event is known as eventStack 

function EventScreen() {

    const eventStack = useSelector(store => store.exerciseStackReducer.stack)

    const [event, setEvent] = useState([])

    ////////////////////////
    useEffect(() => {
        const eventArr = eventTypes.filter(obj => {
            const muscleSet = eventStack.find(event => event.title === obj.title)
            if (muscleSet) return obj
        })
        if (eventArr.length) setEvent(eventArr)
        else setEvent([])
    }, [eventStack.length])


    // C.R.D api for event screen
    // 3 api
    const muscleSetModalShow = useSelector(store => store.eventModalViewReducer.show)
    const exerciseEntryModal = useSelector(store => store.exerciseAddModalReducer.show)
    const exrciseDataModal = useSelector(store => store.exerciseDataModalReducer.show)




    return (
        <Layout>
            <View style={{ backgroundColor: allColors.bodybg }} className="flex-1">

                <EventScreenEventView event={event} />

                <EventScreenScrollView event={event} eventStack={eventStack} />

            </View>

            {exerciseEntryModal && <SpecificExerciseModal />}
            {muscleSetModalShow && <AddMuscleSetModal />}
            {exrciseDataModal && <ExerciseDataModal />}
        </Layout>
    )
}


export default EventScreen