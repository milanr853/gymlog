import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseDataModal } from '../redux/exerciseDataSlice'
import { ActivityIndicator, Button, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


function ExerciseDataModal() {
    const { exerciseData } = useSelector(store => store.exerciseDataModalReducer)

    const [performArr, setPerformArr] = useState([])
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
        if (performArr.length < 10) {
            const num = performArr.length + 1
            const newPerformObj = { set: num, rep: "", weight: "" }
            setPerformArr(prev => [...prev, newPerformObj])
        }
        else {
            alert('Maximum 10 sets to perform')
        }
    }

    const minusSet = () => {
        if (performArr.length > 2) {
            setPerformArr(prev => {
                return prev.filter((obj, ind) => {
                    if (ind !== prev.length - 1) return obj
                })
            })
        }
        else {
            alert('Minimum 2 sets to perform')
        }
    }

    useEffect(() => {
        if (!exerciseData) return
        console.log(exerciseData.perform)
        setPerformArr(exerciseData.perform)
    }, [exerciseData])

    /////////////////////////////

    const openNotes = () => {
        alert('Ópen notes')
    }

    const saveAllTheDataApi = () => {
        alert('data saved')
    }

    console.log(performArr.length, exerciseData?.perform)


    return (
        // show &&
        <ModalWrapper closeModal={closeModal}>

            {
                exerciseData ?
                    <>
                        <View className="w-[90%] bg-white rounded-md h-[70%] relative" >
                            <View className=" p-4 space-y-3">
                                <View className="flex-row justify-center items-center bg-slate-200 py-3 space-x-2 rounded-md">
                                    <Ionicons name="flash" size={20} color={'#9ca3af'}></Ionicons>
                                    <Text className='text-gray-400 text-lg font-semibold'>{exerciseData.exerciseName}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                                        <Text className="text-gray-400">Curr Avg: </Text>
                                        <Text className="text-gray-400 text-lg font-semibold"> {exerciseData.currentAvg}kg</Text>
                                    </View>
                                    <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                                        <Text className="text-gray-400">Past Avg: </Text>
                                        <Text className="text-gray-400 text-lg font-semibold"> {exerciseData.pastAvg}kg</Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                                        <Text className="text-gray-400 ">PR: </Text>
                                        <Text className="text-gray-400 text-lg font-semibold"> {exerciseData.pr}kg</Text>
                                    </View>
                                    <View className="w-[140px] py-3 bg-slate-200 justify-center items-center rounded-2xl shadow-md flex-row">
                                        <Text className="text-gray-400">1RM: </Text>
                                        <Text className="text-gray-400 text-lg font-semibold"> {exerciseData.oneRM}kg</Text>
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
                                        <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold text-gray-400">Set</Text></View>
                                        <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold text-gray-400">Rep</Text></View>
                                        <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold text-gray-400">Wt (in Kg)</Text></View>
                                    </View>


                                    {
                                        performArr.map(obj =>
                                            <View className="values space-y-4" key={obj.set}>
                                                <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                                    <TextInput
                                                        style={{ width: '75%', height: "100%" }}
                                                        value={`${obj.set}`}
                                                        editable={false}
                                                    />
                                                </View>
                                                <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                                    <TextInput
                                                        style={{ width: '75%', height: "100%" }}
                                                        onChangeText={() => { }}
                                                        value={`${obj.rep}`}
                                                        keyboardType="numeric"
                                                    />
                                                </View>
                                                <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                                    <TextInput
                                                        style={{ width: '75%', height: "100%" }}
                                                        onChangeText={() => { }}
                                                        value={`${obj.weight}`}
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

                        {performArr.length !== exerciseData?.perform?.length ?
                            <Pressable onPress={saveAllTheDataApi} className="bg-[#576cbc] mt-4 w-[90%] h-[40px] justify-center items-center rounded-sm">
                                <Text className="text-white">SAVE</Text>
                            </Pressable> : <></>
                        }
                    </>

                    :
                    <ActivityIndicator size="large" color="white" />
            }

        </ModalWrapper>
    )
}

export default ExerciseDataModal