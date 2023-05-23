import React, { useRef, useState } from 'react'
import { ScrollView, View, Text, Animated, TouchableOpacity, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { showExerciseModal } from '../redux/exerciseAddModal';
import { removeExerciseFromStack } from '../redux/exerciseStackSlice';
import { fetchExerciseData, showExerciseDataModal } from '../redux/exerciseDataSlice';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { allColors } from '../constants/Variable';



function EventScreenScrollView({ event, eventStack }) {
    const { params: {
        day
    } } = useRoute()

    const dispatch = useDispatch()

    const [accordion, setAccordion] = useState(false)
    const [muscleGrp, setMuscleGrp] = useState(null)

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

    const OpenAddExerciseToStackModal = (muscleName) => {
        dispatch(showExerciseModal(muscleName))
    }

    const RemoveExerciseFromStack = (muscleName) => {
        dispatch(removeExerciseFromStack(muscleName))
    }

    ///////////////////////////////////////
    const openExerciseDataModal = (exercise, muscleSet) => {
        dispatch(showExerciseDataModal())
        dispatch(fetchExerciseData({ exercise, muscleSet, id: day }))
    }


    return (
        <ScrollView className='flex-1 p-4 space-y-8'>
            <View className="flex-row space-x-4 items-center">
                {event.length ? event.map(obj => <View style={{ backgroundColor: obj?.bg }} key={obj.title} className={`w-[20px] h-[20px] rounded-md`}></View>) : <View className={`w-[20px] h-[20px] bg-stone-400 rounded-md`}></View>}
                <Text style={{ color: allColors.textcolor }} className="text-lg">{output}</Text>
            </View>

            <View className="w-full px-8 pt-8 pb-4 space-y-8">
                {eventStack?.map(muscle => {
                    return (
                        <View key={muscle.title} className="bg-gray-200 border border-gray-400 w-full rounded-sm px-2 py-1" >
                            <View className="flex-row justify-between items-center h-[35px]">
                                <Text className="text-gray-500 ">{muscle.title.toUpperCase()}</Text>
                                {
                                    accordion && muscleGrp?.title === muscle.title ?
                                        <View className="flex-row space-x-4 items-center">
                                            <View className="flex-row space-x-4">
                                                <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                    <TouchableOpacity onPress={() => { OpenAddExerciseToStackModal(muscle.title) }}>
                                                        <Ionicons name="add" size={19} color="gray">
                                                        </Ionicons>
                                                    </TouchableOpacity>
                                                </View>
                                                <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                    <TouchableOpacity onPress={() => { RemoveExerciseFromStack(muscle.title) }}>
                                                        <Ionicons name="trash" size={17} color="gray">
                                                        </Ionicons>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <Pressable onPress={() => hideExercises(muscle)} className="justify-center items-center w-[20px] h-[28px] rounded-sm">
                                                <Ionicons name="chevron-up-outline" size={17} color="gray"></Ionicons>
                                            </Pressable>
                                        </View>
                                        :
                                        <View className="flex-row space-x-4 items-center">
                                            <View className="flex-row space-x-4">
                                                <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                    <TouchableOpacity onPress={() => { OpenAddExerciseToStackModal(muscle.title) }}>
                                                        <Ionicons name="add" size={19} color="gray">
                                                        </Ionicons>
                                                    </TouchableOpacity>
                                                </View>
                                                <View className="justify-center items-center w-[28px] h-[28px] rounded-sm bg-gray-300 shadow-sm">
                                                    <TouchableOpacity>
                                                        <Ionicons onPress={() => { RemoveExerciseFromStack(muscle.title) }} name="trash" size={17} color="gray">
                                                        </Ionicons>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <Pressable onPress={() => showExercises(muscle)} className="justify-center items-center w-[20px] h-[28px] rounded-sm">
                                                <Ionicons name="chevron-down-outline" size={17} color="gray"></Ionicons>
                                            </Pressable>
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
                                                        <Text className="text-gray-500 ">{index + 1} . {exercise}</Text>
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
    )
}

export default React.memo(EventScreenScrollView)