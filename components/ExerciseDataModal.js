import React, { useCallback, useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseDataModal } from '../redux/exerciseDataSlice'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from './SaveButton'
import ScrollXSection from './ScrollXSection'
import NoteComponent from './NoteComponent'



function ExerciseDataModal() {
    const { exerciseData } = useSelector(store => store.exerciseDataModalReducer)

    const [performArr, setPerformArr] = useState([])
    const [btnView, setBtnView] = useState(false)
    const [note_value, onChangeText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
        onChangeText(exerciseData.note)
    }, [exerciseData])

    useEffect(() => {
        if (performArr.length === 0 && note_value.length === 0) return
        else if (JSON.stringify(performArr) === JSON.stringify(exerciseData.perform) && note_value === exerciseData.note) { setBtnView(false); return }
        setBtnView(true)
    }, [performArr, note_value])

    const modifyData = useCallback((type, id, text) => {
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
    }, [])

    /////////////////////////////

    const saveAllTheDataApi = () => {
        alert('data saved')
        const sendDataObj = {
            id: 'date',
            muscleSet: 'Legs',
            exerciseName: 'Leg press',
            note: note_value,
            perform: performArr
        }
        console.log(sendDataObj)
    }

    // api call using exerciseMinimalData
    // C.R.U.D operations will take place
    // 4 apis to integrate

    // make a check that if both set and rep are 0 or empty then those columns will be filtered in the backend and will not be provided to frontend. frontend will only receive filled data columns
    // always minimum 1 empty column will be provided by the backend
    // if that column has data that data will be provided. if rep and weight are 0,0 then an empty column will be provided by the backend

    /////////////////////////////

    const handleNoteBtnClick = () => {
        setIsOpen(!isOpen);
    }


    return (
        // show &&
        <ModalWrapper closeModal={closeModal}>

            {
                exerciseData ?
                    <>
                        <View className="w-[90%] bg-white rounded-md h-[70%] relative" >
                            {/* DATA VIEW */}
                            <View className=" p-4 space-y-3 relative">
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

                                {/* NOTE SECTION */}
                                <NoteComponent isOpen={isOpen} notes={note_value} noteEdit={onChangeText} />
                            </View>


                            <View id="scroll" className="flex-1 bg-gray-200 rounded-b-md">

                                {/* BTN SECTION */}
                                <View className="w-full flex-row space-x-4 justify-start mt-6 px-4">
                                    <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] justify-center items-center" onPress={addSet}>
                                        <View className="bg-slate-200 rounded-lg w-[36px] h-[36px] justify-center items-center">
                                            <Ionicons name="add" size={25} color={'gray'}></Ionicons>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] justify-center items-center" onPress={minusSet}>
                                        <View className="bg-slate-200 rounded-lg w-[36px] h-[36px] justify-center items-center">
                                            <Ionicons name="remove" size={25} color={'gray'}></Ionicons>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] justify-center items-center" onPress={handleNoteBtnClick}>
                                        <View className="bg-slate-200 rounded-lg w-[36px] h-[36px] justify-center items-center">
                                            <Ionicons name="pencil-outline" size={21} color={'gray'}></Ionicons>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* SCROLL CONTAINER */}
                                <ScrollXSection performArr={performArr} modifyData={modifyData} />
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