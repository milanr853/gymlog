import React from 'react'
import { Text, View } from 'react-native'

function EventScreenEventView({ event }) {


    return (
        <View className="flex-row h-[30%] w-full">
            {
                event.length ? event.map(obj => {
                    return (
                        <View style={{ backgroundColor: obj?.bg }} key={obj.title} className={`h-full flex-1 items-center justify-center`}>
                            <Text className='font-extrabold italic text-6xl text-gray-200'>
                                {event.length >= 3 ?
                                    obj?.title.slice(0, 1) :
                                    event.length === 2 ?
                                        obj?.title.length <= 5 ? obj.title : obj?.title.slice(0, 3) + "..."
                                        : event.length === 1 && obj?.title
                                }
                            </Text>
                        </View>
                    )
                })
                    :
                    <View className={`h-full flex-1 items-center justify-center bg-stone-400`}>
                        <Text className='font-extrabold italic text-6xl text-gray-200'>
                            No event
                        </Text>
                    </View>
            }
        </View>
    )
}

export default React.memo(EventScreenEventView)