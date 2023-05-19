import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import arm from "../assets/images/arms.png"
import abs from "../assets/images/abs.png"
import back from "../assets/images/back.png"
import chest from "../assets/images/chest.png"
import shoulder from "../assets/images/shoulder.png"
import leg from "../assets/images/legs.png"
import { hideEventModal } from "../redux/eventViewModalSlice"
import { useDispatch } from 'react-redux'

function AddMuscleSetModal({ selectMuscleSetType, show }) {
    const dispatch = useDispatch()

    const muscleSet = [
        { title: "Chest", uri: chest, color: "bg-orange-400" },
        { title: "Back", uri: back, color: "bg-purple-400" },
        { title: "Abs", uri: abs, color: "bg-red-400" },
        { title: "Legs", uri: leg, color: "bg-green-400" },
        { title: "Shoulder", uri: shoulder, color: "bg-slate-400" },
        { title: "Arms", uri: arm, color: "bg-blue-400" }]


    const selectEventType = (muscle) => {
        selectMuscleSetType(muscle.title)
        dispatch(hideEventModal())
    }




    return (
        show && <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center flex-row">

            <View className="max-w-[80%] flex-row flex-wrap justify-between items-center">
                {
                    muscleSet.map((muscle, ind) => {
                        return (
                            <TouchableOpacity key={muscle.title} onPress={() => selectEventType(muscle)} activeOpacity={1} className={`w-[100px] h-[100px] border-4 border-white rounded-md ${muscle.color} items-center justify-between p-4 mb-8 ${ind < muscle.length - 1 ? "mr-5" : ""}`}>
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