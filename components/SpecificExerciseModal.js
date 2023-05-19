import React from 'react'
import { Touchable, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { hideExerciseModal } from '../redux/exerciseAddModal'
import Ionicons from '@expo/vector-icons/Ionicons';



function SpecificExerciseModal({ show }) {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(hideExerciseModal())
    }


    return (
        show && <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center">
            <TouchableOpacity activeOpacity={1} className="absolute top-3 right-2 justify-center items-center w-[40px] h-[40px] bg-gray-400 rounded-full border-4 border-white" onPress={closeModal}>
                <Ionicons name="close-outline" size={35} color='white'></Ionicons>
            </TouchableOpacity>


        </View>
    )
}

export default SpecificExerciseModal