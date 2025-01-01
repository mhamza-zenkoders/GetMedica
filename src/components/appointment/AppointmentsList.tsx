import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AppointmentCard from './AppointmentCard';
import {useUserStore} from '../../store/userStore';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../../components/common/CustomIcon';
import {CustomText} from '../../components/common/CustomText';

type Props = {
  data: any;
  handleStatusChange?: (id:string, status: string) => void;
};
const AppointmentsList: React.FC<Props> = ({data, handleStatusChange}) => {
  const {user} = useUserStore();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <CustomIcon
              icon="calendar-check-o"
              type="FontAwesome"
              color={COLORS.primary}
              size={RFValue(25)}
            />
            <CustomText
              children={'No Appointments Available'}
              fontSize={'S12'}
              color={COLORS.NeutralGrey60}
              fontWeight={'500'}
              textStyle={{paddingVertical: heightPercentageToDP(1)}}
            />
          </View>
        }
        renderItem={({item, index}: any) => (
          <AppointmentCard
            item={item}
            containerStyle={styles.flatListItem}
            role={user.role}
            handleStatusChange={handleStatusChange}
          />
        )}
      />
    </View>
  );
};

export default AppointmentsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP(1),
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
