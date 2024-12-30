import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DoctorAvailability from '../screens/Doctor/DoctorAvailability';
import PatientAppointments from '../screens/Patient/PatientAppointments';
import PatientBottomTabNavigator from './PatientBottomTabNavigator';
import DoctorAppointments from '../screens/Doctor/DoctorAppointments';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../components/common/CustomIcon';

const Tab = createBottomTabNavigator();

export function DoctorBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarStyle: styles.TabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      }}>
      <Tab.Screen
        name="DoctorAvailability"
        component={DoctorAvailability}
        options={{
          title: 'Set Availability',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey60}
              size={RFValue(18)}
              type={'AntDesign'}
              icon="calendar"
            />
          ),
        }}
      />
      <Tab.Screen
        name="DoctorAppointments"
        component={DoctorAppointments}
        options={{
          title: 'Appointments',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey60}
              size={RFValue(18)}
              type={'Ionicons'}
              icon="calendar-number"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default DoctorBottomTabNavigator;

const styles = StyleSheet.create({
  TabBarStyle: {
    height: heightPercentageToDP(8),
    position: 'relative',
    borderTopWidth: 2,
    elevation: 0,
    borderColor: COLORS.NeutralGrey10,
  },

  tabBarItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),
  },

  tabBarLabelStyle: {
    fontSize: RFValue(10),
    marginTop: 2,
  },
});
