import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { hideEventModal } from "../redux/eventViewModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons';
import { showExerciseModal } from '../redux/exerciseAddModal'
import { eventTypes } from '../constants/Constants'


function AddMuscleSetModal() {
    const show = useSelector(store => store.eventModalViewReducer.show)

    const dispatch = useDispatch()

    const OpenAddExerciseToStackModal = (muscleName) => {
        dispatch(hideEventModal())
        dispatch(showExerciseModal(muscleName))
    }

    const closeModal = () => {
        dispatch(hideEventModal())
    }



    return (
        show && <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center flex-row">
            <TouchableOpacity activeOpacity={1} className="absolute top-3 right-2 justify-center items-center w-[40px] h-[40px] bg-slate-900 rounded-md border-4 border-white" onPress={closeModal}>
                <Ionicons name="close-outline" size={35} color='white'></Ionicons>
            </TouchableOpacity>
            <View className="max-w-[90%] h-[270px] flex-row flex-wrap justify-between items-center bg-white p-4 rounded-md">
                {
                    eventTypes.map((muscle, ind) => {
                        return (
                            <TouchableOpacity key={muscle.title} onPress={() => OpenAddExerciseToStackModal(muscle.title)} activeOpacity={1} className={`w-[100px] h-[100px] border-4 border-slate-600 rounded-md ${muscle.color} items-center justify-between p-4 ${ind < 3 ? "mb-8" : ""} ${ind < muscle.length - 1 ? "mr-5" : ""}`}>
                                <View className='w-full h-[100%] flex-row justify-center items-center'>
                                    <Image source={{ uri: muscle.uri }} className="w-[75px] h-[75px] object-contain" />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}


export default AddMuscleSetModal