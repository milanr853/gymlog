import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Pressable, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
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

    /////////////////////////////////
    const [showOptions, setShowOptions] = useState(false)
    const [showContent, setShowContent] = useState(false);

    const widthValue = useRef(new Animated.Value(0)).current;
    const heightValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateWidth(showOptions);
    }, [showOptions]);

    const animateWidth = (show) => {
        const targetWidth = show ? 180 : 0;
        const targetHeight = show ? 90 : 0;
        Animated.timing(widthValue, {
            toValue: targetWidth,
            duration: 500,
            useNativeDriver: false,
        }).start();
        Animated.timing(heightValue, {
            toValue: targetHeight,
            duration: 500,
            useNativeDriver: false,
        }).start();

        (() => {
            // After the animation completes, show the content
            setTimeout(() => {
                setShowContent(show);
            }, 500);
        })()
    };

    const animatedStyles = {
        width: widthValue,
        height: heightValue,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        position: 'absolute',
        top: 35,
        right: 12,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    };

    const goBack = () => { navigation.goBack() }

    const openOptions = () => {
        setShowOptions(true);
    };

    const closeOptions = () => {
        setShowOptions(false);
        setShowContent(false);
    };

    const runTheOption = () => {
        closeOptions()
    }



    return (
        < >
            <TouchableWithoutFeedback onPress={closeOptions}>
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

                    {/* for calendar view */}
                    {name === "Event" &&
                        <View className="flex-row space-x-4 relative" >
                            <Ionicons name="calendar-outline" size={28} color='black' onPress={goBack}></Ionicons>
                            <Ionicons name="ellipsis-vertical-outline" size={27} color='black' onPress={openOptions}></Ionicons>

                            {
                                showOptions &&
                                <Animated.View style={animatedStyles} >
                                    {showContent && <>
                                        <Pressable onPress={runTheOption} className="h-[50%] w-full justify-center items-start px-4 active:bg-gray-100 rounded-t-md">
                                            <Text>Create Event</Text>
                                        </Pressable>
                                        <Pressable onPress={runTheOption} className="h-[50%] w-full justify-center items-start px-4 active:bg-gray-100 rounded-b-md">
                                            <Text>Add Muscle Group</Text>
                                        </Pressable>
                                    </>}
                                </Animated.View>
                            }
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>

            <StatusBar style='auto' hidden={true} />

            {children}
        </>
    )
}


export default Layout