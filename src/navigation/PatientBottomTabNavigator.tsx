import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatientStack from '../navigation/PatientStack';
import PatientAppointments from '../screens/Patient/PatientAppointments';
import { CustomIcon } from '../components/common/CustomIcon';
import { COLORS } from '../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP } from 'react-native-responsive-screen';
const Tab = createBottomTabNavigator();

export function PatientBottomTabNavigator() {
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
        name="PatientStack"
        component={PatientStack}
        options={{title: 'Doctors List',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey60}
              size={RFValue(18)}
              type={'FontAwesome6'}
              icon="briefcase-medical"
            />
          ),
        }
      }
      />
      <Tab.Screen
        name="PatientAppointments"
        component={PatientAppointments}
        options={{title: 'Appointments',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey60}
              size={RFValue(18)}
               type={'Ionicons'}
              icon="calendar-number"
            />
          ),}}
      />
    </Tab.Navigator>
  );
}

export default PatientBottomTabNavigator;

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