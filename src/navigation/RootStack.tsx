import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectRole from '../screens/Auth/SelectRole/SelectRole';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';

const RootStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
        headerShown: false, 
    }}>
      <Stack.Screen name="Select Role" component={SelectRole} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
