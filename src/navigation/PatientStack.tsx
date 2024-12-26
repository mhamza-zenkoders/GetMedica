import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PatientStackNavigationType} from '../utils/types/navigationType';
import PatientDoctorsList from '../screens/Patient/PatientDoctorsList';
import PatientBookAppointment from '../screens/Patient/PatientBookAppointment';
const Stack = createNativeStackNavigator<PatientStackNavigationType>();

export function DoctorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PatientDoctorsList" component={PatientDoctorsList} />
      <Stack.Screen
        name="PatientBookAppointment"
        component={PatientBookAppointment}
      />
    </Stack.Navigator>
  );
}

export default DoctorStack;

const styles = StyleSheet.create({});
