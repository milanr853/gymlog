import React, { useEffect, useRef } from 'react'
import { Animated, Text, TextInput, View } from 'react-native';
import { allColors } from '../constants/Variable';


function NoteComponent({ isOpen, notes, noteEdit }) {

    const widthAnimation = useRef(new Animated.Value(0)).current;
    const heightAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        openNoteSection()
    }, [isOpen])

    const openNoteSection = () => {
        if (isOpen) {
            Animated.parallel([
                Animated.timing(widthAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(heightAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(widthAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(heightAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    };

    const widthInterpolation = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const heightInterpolation = heightAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });




    return (
        <Animated.View style={{
            backgroundColor: allColors.bodybg, width: widthInterpolation,
            height: heightInterpolation,
        }} className="h-full w-full rounded-md absolute z-20 top-4 left-4">
            {
                isOpen ?
                    <>
                        <View className="justify-center items-center h-[15%] border-b border-white"><Text className='text-white'>NOTE</Text></View>
                        <View className="justify-center items-center w-full h-[85%] flex-row">
                            <TextInput
                                editable
                                placeholder='Start writing ...'
                                placeholderTextColor='gray'
                                multiline
                                numberOfLines={10}
                                onChangeText={text => noteEdit(text)}
                                value={notes}
                                autoFocus={true}
                                style={{ padding: 10, width: '100%', color: allColors.textcolor, textAlignVertical: 'top' }}
                            />
                        </View>
                    </>
                    : <></>
            }
        </Animated.View>
    )
}

export default NoteComponent