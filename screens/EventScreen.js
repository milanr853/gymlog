import React from 'react'
import { Text, View } from 'react-native'
import Layout from '../components/Layout'
import SpecificExerciseModal from '../components/SpecificExerciseModal'
import { useRoute } from '@react-navigation/native'

function EventScreen() {
    const { params: {
        day
    } } = useRoute()



    return (
        <Layout>
            <View className="flex-1 bg-orange-400">
                <Text>{day}</Text>
            </View>

            {/* <SpecificExerciseModal /> */}
        </Layout>
    )
}


export default EventScreen