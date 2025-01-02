import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {ReactElement, ReactNode} from 'react';
import {COLORS} from '../../utils/theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AppointmentCard from './AppointmentCard';
import {useUserStore} from '../../store/userStore';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../../components/common/CustomIcon';
import {CustomText} from '../../components/common/CustomText';

type Props = {
  data: any;
  renderHeader?: ReactElement;
  loading?: boolean;
};
const AppointmentsList: React.FC<Props> = ({data, renderHeader, loading}) => {
  const {user} = useUserStore();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
          ) : (
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
          )
        }
        renderItem={({item, index}: any) => (
          <AppointmentCard
            item={item}
            containerStyle={styles.flatListItem}
            role={user.role}
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
    paddingBottom: heightPercentageToDP(2),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListItem: {
    marginVertical: heightPercentageToDP(1),
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: heightPercentageToDP(15),
  },
});
