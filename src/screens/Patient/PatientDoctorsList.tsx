import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import DesignHeader from '../../components/header/DesignHeader';
import { useUserStore } from '../../store/userStore';
import CustomHeader from '../../components/header/CustomHeader';
import { IMAGES } from '../../utils/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const PatientDoctorsList = () => {
  const user = useUserStore(state => state.user);

  return (
    <CustomWrapper containerStyle={styles.container}>
      <CustomHeader title={user.name} subtitle='Welcome' profilePic={IMAGES.userProfile} icon={'notifications-outline'}/>
    </CustomWrapper>
  );
};

export default PatientDoctorsList;

const styles = StyleSheet.create({

  container:{
    flex: 1,
  }
});
