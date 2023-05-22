import React from 'react'
import { Pressable, Text } from 'react-native'

function SaveButton({ onPress, text, styles }) {
    return (
        <Pressable
            style={styles ? styles : {}}
            onPress={onPress}
            className="bg-[#576cbc] w-[90%] h-[40px] justify-center items-center rounded-sm mt-4"
        >
            <Text className="text-white">{text}</Text>
        </Pressable>
    )
}

export default SaveButton