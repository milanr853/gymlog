import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { hideEventModal } from "../redux/eventViewModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { showExerciseModal } from '../redux/exerciseAddModal'
import { eventTypes } from '../constants/Constants'
import ModalWrapper from './ModalWrapper';
import { allColors } from '../constants/Variable'


function AddMuscleSetModal() {
    const show = useSelector(store => store.eventModalViewReducer.show)

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
        show &&
        <ModalWrapper closeModal={closeModal}>


            <View style={{ backgroundColor: allColors.modalcontainer }} className="w-[90%] p-4 flex-row flex-wrap justify-around items-center rounded-md">
                {
                    eventTypes.map((muscle, ind) => {
                        return (
                            <TouchableOpacity style={{ backgroundColor: muscle.bg }} key={muscle.title}
                                onPress={() => OpenAddExerciseToStackModal(muscle.title)}
                                activeOpacity={1}
                                className={`
                                my-4 
                            w-[100px] h-[100px] border-4 border-white rounded-md 
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