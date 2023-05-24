import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

function SaveButton({ onPress, text, styles }) {
    return (
        <TouchableOpacity
            style={styles ? styles : {}}
            onPress={onPress}
            className="bg-[#576cbc] w-[90%] h-[40px] justify-center items-center rounded-sm mt-4"
        >
            <Text className="text-white">{text}</Text>
        </TouchableOpacity>
    )
}

export default SaveButton