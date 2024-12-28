import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../utils/theme'
import CustomDoctor from './CustomDoctor'

type Props = {
  data: any,

}
const DoctorsListContainer:React.FC<Props> = ({data}) => {
  return (
    <View>
      <FlatList 
      data={data}
      keyExtractor={(item:any)=>item.id}
      renderItem={({item}:any)=>
      (<CustomDoctor item={item}/>)}/>
    </View>
  )
}

export default DoctorsListContainer

const styles = StyleSheet.create({})