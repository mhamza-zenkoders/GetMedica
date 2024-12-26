import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import CustomHeader from '../../components/header/CustomHeader';
import {IMAGES} from '../../utils/theme';
import {useUserStore} from '../../store/userStore';
import AvailabilityDetails from './components/AvailabilityDetails';
import {WeeklySchedule} from '../../utils/types/componentType';
import {transformAvailabilityDataToArray, transformAvailabilityDataToWeeklySchedule} from '../../utils/helpers';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomButton} from '../../components/common/CustomButton';
import { availabilityMutation } from '../../services/doctor';

const DoctorAvailability = () => {
  const {user} = useUserStore();

  const availabilityRef = useRef<WeeklySchedule>(
    transformAvailabilityDataToWeeklySchedule(user?.timings || [], 'date'),
  );
  const handlePost = async () => {
    console.log(availabilityRef.current,"asdsssss")
    const manipulatedData = transformAvailabilityDataToArray(availabilityRef);
    console.log('m',manipulatedData);
    console.log('user',user.uid);
    await availabilityMutation(manipulatedData, user.uid);

  };
  return (
    <CustomWrapper>
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.userProfile}
        icon={'notifications-outline'}
      />
      <View style={styles.AvailabilityContainer}>
        <AvailabilityDetails availabilityRef={availabilityRef} />
        <CustomButton title={'Save Changes'} onPress={handlePost} />
      </View>
    </CustomWrapper>
  );
};

export default DoctorAvailability;

const styles = StyleSheet.create({
  AvailabilityContainer: {
    flex: 1,
    marginTop: heightPercentageToDP(3),
    marginBottom: heightPercentageToDP(2),
  },
});
