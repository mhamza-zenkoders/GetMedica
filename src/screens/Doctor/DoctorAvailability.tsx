import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import CustomHeader from '../../components/header/CustomHeader';
import {IMAGES} from '../../utils/theme';
import {useUserStore} from '../../store/userStore';
import AvailabilityDetails from './components/AvailabilityDetails';
import {WeeklySchedule} from '../../utils/types/componentType';
import {
  showToast,
  transformAvailabilityDataToArray,
  transformAvailabilityDataToWeeklySchedule,
} from '../../utils/helpers';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomButton} from '../../components/common/CustomButton';
import {setTimeScheduleInFirebase} from '../../services/doctor';
import {signOutMutation} from '../../services/auth';

const DoctorAvailability = () => {
  const {user} = useUserStore();
  
  const availabilityRef = useRef<WeeklySchedule>(
    transformAvailabilityDataToWeeklySchedule(user?.availability || [], 'date'),
  );
  const handlePost = async () => {    
    const manipulatedData = transformAvailabilityDataToArray(availabilityRef);
    // console.log(manipulatedData);

    const res = await setTimeScheduleInFirebase(user.uid, manipulatedData);
    if (!res?.success) {
      showToast({
        type: 'error',
        message: res?.error.message,
        position: 'bottom',
      });
      return;
    }
    showToast({message: ' successfully!', position: 'bottom'});
    const setUser = useUserStore.getState().setUser;
    setUser({
      ...user,
      currentTiming: res.scheduleId,
    });
  };

  return (
    <CustomWrapper>
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.userProfile}
        icon={'logout'}
        iconPress={() => {
          signOutMutation();
        }}
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
