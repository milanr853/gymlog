import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


function ModalWrapper({ closeModal, children }) {
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center">

            <TouchableOpacity activeOpacity={1} className="absolute top-3 right-2 justify-center items-center w-[42px] h-[42px] bg-slate-600 rounded-md border-4 border-white" onPress={closeModal}>
                <Ionicons name="close-outline" size={32} color='white'></Ionicons>
            </TouchableOpacity>

            {children}
        </View>
    )
}

export default ModalWrapper