import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Layout from '../components/Layout'
import SpecificExerciseModal from '../components/SpecificExerciseModal'
import AddMuscleSetModal from '../components/AddMuscleSetModal'

import { useSelector } from 'react-redux'
import { eventTypes } from '../constants/Constants'
import ExerciseDataModal from '../components/ExerciseDataModal'
import { allColors } from '../constants/Variable'
import EventScreenEventView from '../components/EventScreenEventView'
import EventScreenScrollView from '../components/EventListScrollView'



function EventScreen() {
    const muscleSetModalShow = useSelector(store => store.eventModalViewReducer.show)
    const exerciseEntryModal = useSelector(store => store.exerciseAddModalReducer.show)
    const exrciseDataModal = useSelector(store => store.exerciseDataModalReducer.show)

    const eventStack = useSelector(store => store.exerciseStackReducer.stack)

    const [event, setEvent] = useState([])

    useEffect(() => {
        const eventArr = eventTypes.filter(obj => {
            const muscleSet = eventStack.find(event => event.title === obj.title)
            if (muscleSet) return obj
        })
        if (eventArr.length) setEvent(eventArr)
        else setEvent([])
    }, [eventStack.length])

    /////////////////////////////
    // C.R.D api for event screen
    // 3 api



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