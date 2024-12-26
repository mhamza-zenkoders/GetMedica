import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectRole from '../screens/Auth/SelectRole/SelectRole';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import PatientHome from '../screens/Patient/PatientHome';
import DoctorBottomTabNavigator from './DoctorBottomTabNavigator';
import PatientBottomTabNavigator from './PatientBottomTabNavigator';
import {RootStackNavigationType} from '../utils/types/navigationType';
import {useUserStore} from '../store/userStore';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { COLORS } from '../utils/theme';

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackNavigationType>();
  const {user} = useUserStore();
  console.log(user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 3000)
    };
    fetchUserData();
  }, []);
  
  
  const getInitialRouteName = () => {
    if (user) {
      if (user.role == 'doctor') {
        return 'DoctorNavigator';
      }
      return 'PatientNavigator';
    }
    return 'SelectRole';
  };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={widthPercentageToDP(25)} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SelectRole" component={SelectRole} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="DoctorNavigator"
        component={DoctorBottomTabNavigator}
      />
      <Stack.Screen
        name="PatientNavigator"
        component={PatientBottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
