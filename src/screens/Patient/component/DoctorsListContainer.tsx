import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/theme';
import CustomDoctor from './CustomDoctor';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CustomIcon} from '../../../components/common/CustomIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../../../components/common/CustomText';

type Props = {
  data: any;
};
const DoctorsListContainer: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={styles.FlatList}
        keyExtractor={(item: any) => item.id}
        
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <CustomIcon
              icon="user-doctor"
              type="FontAwesome6"
              color={COLORS.primary}
              size={RFValue(25)}
            />
            <CustomText
              children={'No Doctors Available'}
              fontSize={'S12'}
              color={COLORS.NeutralGrey60}
              fontWeight={'500'}
              textStyle={{paddingVertical: heightPercentageToDP(1)}}
            />
          </View>
        }
        renderItem={({item, index}: any) => (
          <CustomDoctor
            item={item}
            containerStyle={styles.flatListItem}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default DoctorsListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP(1),
  },
  FlatList: {
    flex: 1,
  },
  flatListItem: {
    marginVertical: heightPercentageToDP(1),
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP(25),
  },
});
