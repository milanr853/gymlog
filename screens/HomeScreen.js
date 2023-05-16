import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';




function HomeScreen() {
    const navigation = useNavigation()

    // Hiding header of React Navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    return (
        <View className="bg-yellow-500 flex-1">
            <Text>Home Screen</Text>
        </View>
    )
}

export default HomeScreen