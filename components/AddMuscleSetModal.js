import React, { useEffect, useRef } from 'react'
import { Image, Text, TouchableOpacity, View, Animated } from 'react-native'
import { hideEventModal } from "../redux/eventViewModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { showExerciseModal } from '../redux/exerciseAddModal'
import { eventTypes } from '../constants/Constants'
import ModalWrapper from './ModalWrapper';
import { allColors } from '../constants/Variable'


function AddMuscleSetModal() {
    const eventStack = useSelector(store => store.exerciseStackReducer.stack)

    const dispatch = useDispatch()

    const OpenAddExerciseToStackModal = (muscleName) => {
        if (eventStack.length < 3) {
            dispatch(hideEventModal())
            dispatch(showExerciseModal(muscleName))
        }
        else {
            alert('Maximum muscles selected for this event')
        }
    }

    const closeModal = () => {
        dispatch(hideEventModal())
    }



    return (
        <ModalWrapper closeModal={closeModal}>


            <View className="w-[90%] bg-white p-4 flex-row flex-wrap justify-around items-center rounded-md">
                {
                    eventTypes.map((muscle, ind) => {
                        return (
                            <TouchableOpacity style={{ backgroundColor: muscle.bg }} key={muscle.title}
                                onPress={() => OpenAddExerciseToStackModal(muscle.title)}
                                activeOpacity={1}
                                className={`
                                my-4 
                            w-[100px] h-[100px] border-4 border-gray-300 rounded-md 
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


        </ModalWrapper>
    )
}



export default AddMuscleSetModal