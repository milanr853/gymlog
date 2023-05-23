import React from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { allColors } from '../constants/Variable';


function ModalWrapper({ closeModal, children }) {


    return (
        <View style={{ backgroundColor: allColors.modalbg }} className="absolute top-0 left-0 h-full w-full z-20 justify-center items-center">

            <Pressable className="absolute top-4 right-4 justify-center items-center w-[42px] h-[42px] 
            bg-[#00425f] rounded-md border-4 border-white" onPress={closeModal}>
                <Ionicons name="close-outline" size={32} color={allColors.iconlight}></Ionicons>
            </Pressable>

            {children}
        </View>
    )
}

export default ModalWrapper