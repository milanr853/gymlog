import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { hideEventModal } from "../redux/eventViewModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons';
import { showExerciseModal } from '../redux/exerciseAddModal'
import { eventTypes } from '../constants/Constants'


function AddMuscleSetModal() {
    const show = useSelector(store => store.eventModalViewReducer.show)

    const eventStack = useSelector(store => store.exerciseStackReducer.stack)

    const dispatch = useDispatch()

    const OpenAddExerciseToStackModal = (muscleName) => {
        if (eventStack.length < 3) {
            dispatch(hideEventModal())
            dispatch(showExerciseModal(muscleName))
        }
    }

    const closeModal = () => {
        dispatch(hideEventModal())
    }



    return (
        show && <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center ">

            <TouchableOpacity activeOpacity={1} className="absolute top-3 right-2 flex justify-center items-center w-[42px] h-[42px] bg-slate-600 rounded-md border-4 border-white" onPress={closeModal}>
                <Ionicons name="close-outline" size={32} color='white'></Ionicons>
            </TouchableOpacity>

            <View className="w-[90%] p-4 flex-row flex-wrap justify-around items-center bg-white rounded-md">
                {
                    eventTypes.map((muscle, ind) => {
                        return (
                            <TouchableOpacity key={muscle.title}
                                onPress={() => OpenAddExerciseToStackModal(muscle.title)}
                                activeOpacity={1}
                                className={`
                                my-4 
                            w-[100px] h-[100px] border-4 border-slate-600 rounded-md 
                            bg-${muscle.bg} 
                            items-center justify-between p-4 
                            `
                                }
                            >
                                <View className='w-full h-full flex-row justify-center items-center'>
                                    <Image
                                        source={muscle.uri}
                                        className="w-[75px] h-[75px] object-contain" />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {eventStack.length === 3 ? <View className="w-[90%] bg-white rounded-sm py-1 mt-8 flex-row justify-center items-center">
                <Text className="text-red-400">Maximum muscles selected for this event</Text>
            </View> : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: "space-around",
        alignItems: 'center'
    },
});


export default AddMuscleSetModal