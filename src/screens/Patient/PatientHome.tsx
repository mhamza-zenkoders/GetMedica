import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useUserStore} from '../../store/userStore';

const PatientHome = () => {
  const user = useUserStore(state => state.user);
  console.log(user);
  return (
    <View>
      <Text>PatientHome</Text>
    </View>
  );
};

export default PatientHome;

const styles = StyleSheet.create({});
