import React, { useLayoutEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux"
import { showWeekModal } from '../redux/weekModalViewSlice';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';



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

    const goBack = () => { navigation.goBack() }



    return (
        <>
            <View className="bg-yellow-200 w-full z-10 fixed h-[60px] flex-row items-center px-4 justify-between">
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity >
                        <Ionicons name='reorder-three-outline' size={32} color='black' />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Gym Log</Text>
                </View>

                {/* for calendar view */}
                {name === "Home" && <TouchableOpacity className="flex-row" onPress={() => { dispatch(showWeekModal()) }}>
                    <Ionicons name="duplicate-outline" size={28} color='black'></Ionicons>
                </TouchableOpacity>}

                {name === "Event" && <TouchableOpacity className="flex-row" onPress={goBack}>
                    <Ionicons name="calendar-outline" size={28} color='black'></Ionicons>
                </TouchableOpacity>}
            </View>

            <StatusBar style='auto' hidden={true} />


            {children}
        </>
    )
}

export default Layout