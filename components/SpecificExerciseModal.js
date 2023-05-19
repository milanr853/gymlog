import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseModal } from '../redux/exerciseAddModal'
import Ionicons from '@expo/vector-icons/Ionicons';
import { addExerciseToStack } from '../redux/exerciseStackSlice';



function SpecificExerciseModal() {
    const { show, muscleSet } = useSelector(store => store.exerciseAddModalReducer)

    const dispatch = useDispatch()

    const [input, setInput] = useState("")

    const closeModal = () => {
        dispatch(hideExerciseModal())
        setInput('')
    }

    const AddExerciseToStack = () => {
        // input - perform some action
        const payload = { title: muscleSet, exercise: input }
        dispatch(addExerciseToStack(payload))
        closeModal()
    }

    const handleInputChange = (text) => {
        const firstLetter = text.replace(/[0-9]/g, "").slice(0, 1).toUpperCase()
        const restLetters = text.replace(/[0-9]/g, "").slice(1).toLowerCase()
        const Letter_case = (firstLetter + restLetters).trim()
        setInput(Letter_case)
    }


    return (
        show && <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center">
            <TouchableOpacity activeOpacity={1} className="absolute top-3 right-2 justify-center items-center w-[40px] h-[40px] bg-slate-900 rounded-md border-4 border-white" onPress={closeModal}>
                <Ionicons name="close-outline" size={35} color='white'></Ionicons>
            </TouchableOpacity>

            <View className="py-4 px-4 space-y-6 shadow-md  bg-white rounded-md justify-center items-center w-[90%]">
                <View className="w-full flex-row justify-start"><Text className="font-semibold text-lg">{muscleSet} Exercise Name</Text></View>
                <View className="bg-white w-full h-[40px] rounded-md border border-black outline-none">
                    <TextInput
                        className="flex-1 text-gray-400"
                        style={styles.input}
                        onChangeText={(text) => {
                            handleInputChange(text)
                        }}
                        placeholder='Enter exercise'
                        value={input}
                    />
                </View>
                <View className="w-full flex-row justify-end items-center space-x-2">
                    <View>
                        <Button
                            onPress={closeModal}
                            title='Cancel'
                            color={'#9ba4b5'}
                        />
                    </View>
                    <View>
                        <Button
                            onPress={AddExerciseToStack}
                            title='Save'
                            color={'#576cbc'}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        padding: 10,
        outlineColor: "transparent",
        outlineStyle: "none"
    },
});

export default SpecificExerciseModal