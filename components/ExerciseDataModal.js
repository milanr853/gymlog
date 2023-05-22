import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseDataModal } from '../redux/exerciseDataSlice'
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from './SaveButton'


function ExerciseDataModal() {
    const { exerciseData } = useSelector(store => store.exerciseDataModalReducer)

    const [performArr, setPerformArr] = useState([])
    const [btnView, setBtnView] = useState(false)

    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(hideExerciseDataModal())
    }

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
        if (performArr.length > 1) {
            setPerformArr(prev => {
                return prev.filter((obj, ind) => {
                    if (ind !== prev.length - 1) return obj
                })
            })
        }
    }

    useEffect(() => {
        if (!exerciseData) return
        setPerformArr(exerciseData.perform)
    }, [exerciseData])

    useEffect(() => {
        if (performArr.length === 0) return
        else if (JSON.stringify(performArr) === JSON.stringify(exerciseData.perform)) { setBtnView(false); return }
        setBtnView(true)
    }, [performArr])

    const modifyData = (type, id, text) => {
        if (type === "rep") {
            const modifyData = [...performArr]

            const replacementObject = { ...performArr.find(obj => obj.set == id) }
            const TEXT = text ? text : 0
            replacementObject.rep = parseInt(TEXT)

            if (TEXT === 0) replacementObject.weight = 0

            for (let i = 0; i < modifyData.length; i++) {
                if (modifyData[i].set === replacementObject.set) {
                    modifyData[i] = replacementObject;
                    break;
                }
            }
            setPerformArr(modifyData)
        }

        else if (type === "weight") {
            const modifyData = [...performArr]

            const replacementObject = { ...performArr.find(obj => obj.set == id) }
            const TEXT = text ? text : 0
            replacementObject.weight = parseInt(TEXT)

            if (TEXT && replacementObject.rep == 0) replacementObject.weight = 0

            for (let i = 0; i < modifyData.length; i++) {
                if (modifyData[i].set === replacementObject.set) {
                    modifyData[i] = replacementObject;
                    break;
                }
            }
            setPerformArr(modifyData)
        }
    }

    /////////////////////////////

    const openNotes = () => {
        alert('Ópen notes')
    }

    const saveAllTheDataApi = () => {
        alert('data saved')
        console.log(performArr)
    }

    // api call using exerciseMinimalData
    // C.R.U.D operations will take place
    // 4 apis to integrate

    // make a check that if both set and rep are 0 or empty then those columns will be filtered in the backend and will not be provided to frontend. frontend will only receive filled data columns
    // always minimum 1 empty column will be provided by the backend
    // if that column has data that data will be provided. if rep and weight are 0,0 then an empty column will be provided by the backend



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
                                                        onChangeText={(text) => { modifyData('rep', obj.set, text) }}
                                                        value={`${obj.rep}`}
                                                        keyboardType="numeric"
                                                    />
                                                </View>
                                                <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
                                                    <TextInput
                                                        style={{ width: '75%', height: "100%" }}
                                                        onChangeText={(text) => { modifyData('weight', obj.set, text) }}
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

                        {btnView ?
                            <SaveButton
                                styles={{ position: "absolute", bottom: 40 }}
                                onPress={saveAllTheDataApi}
                                text={'SAVE'} />
                            : <></>
                        }
                    </>

                    :
                    <ActivityIndicator size="large" color="white" />
            }

        </ModalWrapper>
    )
}

export default ExerciseDataModal