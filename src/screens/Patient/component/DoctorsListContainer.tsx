import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/theme';
import CustomDoctor from './CustomDoctor';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type Props = {
  data: any;
};
const DoctorsListContainer: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({item, index}:any) => <CustomDoctor item={item} containerStyle={styles.flatListItem}  index={index}/>}
      />
    </View>
  );
};

export default DoctorsListContainer;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: heightPercentageToDP(1),
  },
  flatListItem:{
    marginVertical: heightPercentageToDP(1),
  }
});
