import React, { useLayoutEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, TouchableOpacity, } from 'react-native';
import { useDispatch } from "react-redux"
import { showWeekModal } from '../redux/weekModalViewSlice';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showEventModal } from "../redux/eventViewModalSlice"
import { allColors } from "../constants/Variable"
import { LinearGradient } from 'expo-linear-gradient';




function Layout({ children }) {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    // Hiding header of React Navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const { name } = useRoute()

    /////////////////////////////////
    const goBack = () => { navigation.goBack() }

    const runTheOption = () => {
        dispatch(showEventModal())
    }

    const copyRoutineToProgram = () => {
        alert('call copy routine api')
    }



    return (
        < >
            <LinearGradient end={{ x: 0.6, y: 1.5 }} start={{ x: 0.8, y: -0.25 }} colors={[allColors.headerbg2, allColors.headerbg]} style={{ backgroundColor: allColors.headerbg }} className=" w-full z-10 fixed h-[60px] flex-row items-center px-4 justify-between">
                <View className="flex-row justify-between items-center space-x-2">
                    <TouchableOpacity >
                        <Ionicons name='reorder-three-outline' size={32} color={allColors.iconcolor} />
                    </TouchableOpacity>
                </View>


                {/* for calendar view */}
                {
                    name === "Home" &&
                    <View className="flex-row space-x-4 relative items-center justify-between" >
                        <TouchableOpacity onPress={() => { dispatch(showWeekModal()) }}>
                            <Ionicons name="add-circle-outline" size={32} color={allColors.iconcolor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={copyRoutineToProgram}>
                            <Ionicons name="copy-outline" size={28} color={allColors.iconcolor} ></Ionicons>
                        </TouchableOpacity>
                    </View>
                }


                {/* for event view */}
                {name === "Event" &&
                    <View className="flex-row space-x-4 relative items-center justify-between" >
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="calendar-outline" size={28} color={allColors.iconcolor} />
                        </TouchableOpacity >
                        <TouchableOpacity onPress={runTheOption}>
                            <Ionicons name="body-outline" size={26} color={allColors.iconcolor} />
                        </TouchableOpacity>
                    </View>
                }
            </LinearGradient>

            <StatusBar style='auto' hidden={true} />

            {children}
        </>
    )
}


export default Layout