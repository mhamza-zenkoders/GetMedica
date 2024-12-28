import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, MutableRefObject} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomText} from '../../../components/common/CustomText';
import {COLORS} from '../../../utils/theme';
import {DaysOfWeek} from '../../../utils/constants';
import AvailabilityListItem from '../components/AvailabilityListItem';
import {Day, WeeklySchedule} from '../../../utils/types/componentType';
import {transformAvailabilityDataToWeeklySchedule} from '../../../utils/helpers';
import {useUserStore} from '../../../store/userStore';

const AvailabilityDetails: FC<{
  availabilityRef: MutableRefObject<WeeklySchedule>;
}> = ({availabilityRef}) => {
  const {user} = useUserStore();
  const userAvailabilityDetails = transformAvailabilityDataToWeeklySchedule(
    user.availability || [],
  );
  console.log('userava',userAvailabilityDetails);
  console.log('user ref',availabilityRef);
  
  return (
    <View style={styles.container}>
      <CustomText
        children="Set Your Weekly Availability"
        color={COLORS.title}
        fontSize="S22"
        fontWeight="500"
        textStyle={styles.textStyle}
      />
      <FlatList
        data={DaysOfWeek as Day[]}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <AvailabilityListItem
            day={item}
            availabilityRef={availabilityRef}
            userAvailabilityDetails={userAvailabilityDetails[item]}
          />
        )}
      />
    </View>
  );
};

export default AvailabilityDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: heightPercentageToDP(2.5),
    gap: heightPercentageToDP(1),
  },
  textStyle: {
    paddingBottom: heightPercentageToDP(2.5),
  },
});
