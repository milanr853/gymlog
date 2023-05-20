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
import { showExerciseDataModal, takeExerciseMinimalData } from '../redux/exerciseDataSlice'

// multiple muscleSet in an event is known as eventStack 

function EventScreen() {
    const { params: {
        day
    } } = useRoute()

    const dispatch = useDispatch()

    const eventStack = useSelector(store => store.exerciseStackReducer.stack)

    const [accordion, setAccordion] = useState(false)
    const [muscleGrp, setMuscleGrp] = useState(null)
    const [event, setEvent] = useState([])

    const inputDate = moment(day);
    const output = inputDate.format('dddd, D MMMM, YYYY');

    const heightValue = useRef(new Animated.Value(0)).current;

    const animateWidth = (show, num) => {
        const targetHeight = show ? (num * 35) + num : 0
        Animated.timing(heightValue, {
            toValue: targetHeight,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const showExercises = (muscleSet) => {
        heightValue._value = 0
        setMuscleGrp(muscleSet)
        setAccordion(true)
        const num = muscleSet.exercises.length
        animateWidth(true, num)
    }

    const hideExercises = (muscleSet) => {
        const num = muscleSet.exercises.length
        heightValue._value = num * 35
        setAccordion(false)
        animateWidth(false, num)
    }

    const animatedStyles = {
        height: heightValue
    }

    ////////////////////////
    useEffect(() => {
        const eventArr = eventTypes.filter(obj => {
            const muscleSet = eventStack.find(event => event.title === obj.title)
            if (muscleSet) return obj
        })
        if (eventArr.length) setEvent(eventArr)
        else setEvent([])
    }, [eventStack.length])


    const OpenAddExerciseToStackModal = (muscleName) => {
        dispatch(showExerciseModal(muscleName))
    }

    const RemoveExerciseFromStack = (muscleName) => {
        dispatch(removeExerciseFromStack(muscleName))
    }

    ///////////////////////////////////////
    const openExerciseDataModal = (exercise, muscleSet) => {
        dispatch(showExerciseDataModal())
        dispatch(takeExerciseMinimalData({ exercise, muscleSet, id: day }))
    }



    return (
        <Layout>
            <View className="flex-1 bg-white">
                <View className="flex-row h-[30%] w-full">
                    {
                        event.length ? event.map(obj => {
                            return (
                                <View style={{ backgroundColor: obj?.bg }} key={obj.title} className={`h-full flex-1 items-center justify-center`}>
                                    <Text className='font-extrabold italic text-6xl text-gray-200'>
                                        {event.length >= 3 ?
                                            obj?.title.slice(0, 1) :
                                            event.length === 2 ?
                                                obj?.title.length <= 5 ? obj.title : obj?.title.slice(0, 3) + "..."
                                                : event.length === 1 && obj?.title
                                        }
                                    </Text>
                                </View>
                            )
                        })
                            :
                            <View className={`h-full flex-1 items-center justify-center bg-gray-100`}>
                                <Text className='font-extrabold italic text-6xl text-gray-200'>
                                    No event
                                </Text>
                            </View>
                    }
                </View>

                <ScrollView className='flex-1 p-4 space-y-8'>
                    <View className="flex-row space-x-4 items-center">
                        {event.length ? event.map(obj => <View style={{ backgroundColor: obj?.bg }} key={obj.title} className={`w-[20px] h-[20px] rounded-md`}></View>) : <View className={`w-[20px] h-[20px] bg-orange-400 rounded-md`}></View>}
                        <Text className="text-lg">{output}</Text>
                    </View>

                    <View className="w-full px-9 pt-8 pb-4 space-y-8">
                        {eventStack.map(muscle => {
                            return (
                                <View key={muscle.title} className="bg-gray-200 border border-gray-400 w-full rounded-sm px-2 py-1" >
                                    <View className="flex-row justify-between items-center h-[35px]">
                                        <Text className="text-gray-400 ">{muscle.title.toUpperCase()}</Text>
                                        {
                                            accordion && muscleGrp?.title === muscle.title ?
                                                <View className="flex-row space-x-4 items-center">
                                                    <View className="flex-row space-x-2">
                                                        <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                            <Ionicons onPress={() => { OpenAddExerciseToStackModal(muscle.title) }} name="add" size={17} color="gray"></Ionicons>
                                                        </View>
                                                        <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                            <Ionicons onPress={() => { RemoveExerciseFromStack(muscle.title) }} name="trash" size={17} color="gray"></Ionicons>
                                                        </View>
                                                    </View>
                                                    <Ionicons onPress={() => hideExercises(muscle)} name="chevron-up-outline" size={17} color="gray"></Ionicons>
                                                </View>
                                                :
                                                <View className="flex-row space-x-4 items-center">
                                                    <View className="flex-row space-x-2">
                                                        <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                            <Ionicons onPress={() => { OpenAddExerciseToStackModal(muscle.title) }} name="add" size={17} color="gray"></Ionicons>
                                                        </View>
                                                        <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                            <Ionicons onPress={() => { RemoveExerciseFromStack(muscle.title) }} name="trash" size={17} color="gray"></Ionicons>
                                                        </View>
                                                    </View>
                                                    <Ionicons onPress={() => showExercises(muscle)} name="chevron-down-outline" size={17} color="gray"></Ionicons>
                                                </View>
                                        }
                                    </View>

                                    {
                                        muscle.title === muscleGrp?.title ?
                                            <Animated.ScrollView className="max-h-[144px] overflow-y-scroll" style={animatedStyles}>
                                                {
                                                    muscle.exercises.map((exercise, index) => {
                                                        return (
                                                            <TouchableOpacity onPress={() => openExerciseDataModal(exercise, muscle.title)} key={exercise} className="w-full h-[35px] border-t border-gray-400 flex-row items-center">
                                                                <Text className="text-gray-400 ">{index + 1} . {exercise}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </Animated.ScrollView>
                                            :
                                            <></>
                                    }
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>

            <SpecificExerciseModal />
            <AddMuscleSetModal />
        </Layout>
    )
}


export default EventScreen