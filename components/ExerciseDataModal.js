import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseDataModal } from '../redux/exerciseDataSlice'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


function ExerciseDataModal() {
    const { exerciseData } = useSelector(store => store.exerciseDataModalReducer)

    const [length, setLength] = useState(3)
    const [rep, setRep] = useState('')
    const [weight, setWeight] = useState('')

    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(hideExerciseDataModal())
    }

    // api call using exerciseMinimalData
    // C.R.U.D operations will take place
    // 4 apis to integrate

    const addSet = () => {
        if (length < 10) {
            setLength(prev => prev + 1)
        }
        else {
            alert('Maximum 10 sets to perform')
        }
    }
    const minusSet = () => {
        if (length > 2) {
            setLength(prev => prev - 1)
        }
        else {
            alert('Minimum 2 sets to perform')
        }
    }

    const openNotes = () => {
        alert('Ópen notes')
    }




    return (
        // show &&
        <ModalWrapper closeModal={closeModal}>

            <View className="w-[90%] bg-white rounded-md h-[70%] relative" >
                <View className=" p-4 space-y-3">
                    <View className="flex-row justify-center items-center bg-slate-200 py-3 space-x-2 rounded-md">
                        <Ionicons name="flash" size={20} color={'#9ca3af'}></Ionicons>
                        <Text className='text-gray-400 text-lg font-semibold'>Leg press</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                            <Text className="text-gray-400">Curr Avg: </Text>
                            <Text className="text-gray-400 text-lg font-semibold"> 50kg</Text>
                        </View>
                        <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                            <Text className="text-gray-400">Past Avg: </Text>
                            <Text className="text-gray-400 text-lg font-semibold"> 30kg</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                            <Text className="text-gray-400 ">PR: </Text>
                            <Text className="text-gray-400 text-lg font-semibold"> 60kg</Text>
                        </View>
                        <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                            <Text className="text-gray-400">1RM: </Text>
                            <Text className="text-gray-400 text-lg font-semibold"> 58kg</Text>
                        </View>
                    </View>
                </View>
                {/* DATA VIEW */}



                {/* SCROLL CONTAINER */}
                <View id="scroll" className="flex-1 bg-gray-200 rounded-b-md">

                    <View className="w-full flex-row space-x-4 justify-start mt-6 px-4">
                        <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] justify-center items-center" onPress={addSet}>
                            <View className="bg-slate-200 rounded-lg w-[36px] h-[36px] justify-center items-center">
                                <Ionicons name="add-outline" size={25} color={'gray'}></Ionicons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] justify-center items-center" onPress={minusSet}>
                            <View className="bg-slate-200 rounded-lg w-[36px] h-[36px] justify-center items-center">
                                <Ionicons name="remove-outline" size={25} color={'gray'}></Ionicons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] justify-center items-center" onPress={openNotes}>
                            <View className="bg-slate-200 rounded-lg w-[36px] h-[36px] justify-center items-center">
                                <Ionicons name="pencil-outline" size={21} color={'gray'}></Ionicons>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', }} className="h-full w-full px-4">
                        <View className="lables space-y-4">
                            <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold">Set</Text></View>
                            <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold">Rep</Text></View>
                            <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold">Wt (in Kg)</Text></View>
                        </View>

                        {
                            Array.from({ length }, (_, index) => index + 1).map(set =>
                                <View className="values space-y-4" key={set}>
                                    <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                        <TextInput
                                            style={{ width: '75%', height: "100%" }}
                                            value={`${set}`}
                                            editable={false}
                                        />
                                    </View>
                                    <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                        <TextInput
                                            style={{ width: '75%', height: "100%" }}
                                            onChangeText={setRep}
                                            value={rep}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                        <TextInput
                                            style={{ width: '75%', height: "100%" }}
                                            onChangeText={setWeight}
                                            value={weight}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            )
                        }

                        <View className="values space-y-4" >
                            <View className=" w-[32px] h-[40px] justify-center items-center"><Text className="font-semibold"></Text></View>
                            <View className=" w-[32px] h-[40px] justify-center items-center"><Text className="font-semibold"></Text></View>
                            <View className=" w-[32px] h-[40px] justify-center items-center"><Text className="font-semibold"></Text></View>
                        </View>
                    </ScrollView>
                </View>
            </View>

        </ModalWrapper>
    )
}

export default ExerciseDataModal