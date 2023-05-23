import React, { useCallback, useEffect, useRef, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseDataModal } from '../redux/exerciseDataSlice'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
    const [exerciseNameText, setExerciseNameText] = useState('');

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
        setExerciseNameText(exerciseData.exerciseName)
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
        alert('data updated')
        const sendDataObj = {
            id: 'date',
            muscleSet: 'Legs',
            exerciseName: exerciseNameText,
            note: note_value,
            perform: performArr
        }
        console.log(sendDataObj)
        inputFocus.current = false
        inputRef.current.blur()
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

    const inputRef = useRef(null);
    const inputFocus = useRef(false);

    const changeFocus = () => {
        if (inputFocus.current) {
            inputRef.current.blur();
            inputFocus.current = false
        } else {
            inputRef.current.focus();
            inputFocus.current = true
        }
    }

    const changeExerciseName = (text) => {
        setExerciseNameText(text)
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
                                <View className="flex-row justify-center items-center 
                                bg-slate-200 p-3 space-x-2 rounded-md relative">
                                    <Ionicons name="flash" size={20} color={'#9ca3af'} />

                                    <TextInput ref={inputRef} className='text-gray-400 text-lg 
                                    font-semibold h-full max-w-[190px]'
                                        value={exerciseNameText}
                                        onChangeText={(text) => { changeExerciseName(text) }}
                                        onFocus={() => {
                                            inputRef.current.focus();
                                            inputFocus.current = true
                                        }}
                                        onBlur={() => {
                                            inputRef.current.blur();
                                            inputFocus.current = false
                                        }}
                                    />
                                    <TouchableOpacity className='absolute bottom-2 right-2' onPress={changeFocus}>
                                        <Ionicons name="create-outline" size={16} color={'#9ca3af'} />
                                    </TouchableOpacity>
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
                                            <Ionicons name="pencil-outline" size={20} color={'gray'}></Ionicons>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* SCROLL CONTAINER */}
                                <ScrollXSection performArr={performArr} modifyData={modifyData} />
                            </View>
                        </View>

                        {btnView || exerciseData.exerciseName !== exerciseNameText.trim() ?
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