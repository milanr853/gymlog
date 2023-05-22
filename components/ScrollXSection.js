import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'

function ScrollXSection({ performArr, modifyData }) {


  return (
    <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', }} className="h-full w-full px-4">
      <View className="lables space-y-4">
        <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold text-gray-400">Set</Text></View>
        <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold text-gray-400">Rep</Text></View>
        <View className="bg-white border border-gray-300 w-[80px] h-[40px] justify-center items-center"><Text className="font-semibold text-gray-400">Wt (in Kg)</Text></View>
      </View>


      {
        performArr.map(obj =>
          <View className="values space-y-4" key={obj.set}>
            <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
              <TextInput
                style={{ width: '75%', height: "100%" }}
                value={`${obj.set}`}
                editable={false}
              />
            </View>
            <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
              <TextInput
                style={{ width: '75%', height: "100%" }}
                onChangeText={(text) => { modifyData('rep', obj.set, text) }}
                value={`${obj.rep}`}
                keyboardType="numeric"
              />
            </View>
            <View className="bg-white border border-gray-300 w-[60px] h-[40px] justify-center items-center">
              <TextInput
                style={{ width: '75%', height: "100%" }}
                onChangeText={(text) => { modifyData('weight', obj.set, text) }}
                value={`${obj.weight}`}
                keyboardType="numeric"
              />
            </View>
          </View>
        )
      }


      <View className="values space-y-4" >
        <View className=" w-[32px] h-[40px] justify-center items-center"><Text className="font-semibold"></Text></View>
        <View className=" w-[32px] h-[40px] justify-center items-center"><Text className="font-semibold"></Text></View>
        <View className=" w-[32px] h-[40px] justify-center items-center"><Text className="font-semibold"></Text></View>
      </View>
    </ScrollView>
  )
}

export default React.memo(ScrollXSection)