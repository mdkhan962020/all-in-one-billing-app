import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PunchInScreen from './screens/PunchInScreen';
import PunchOutScreen from './screens/PunchOutScreen';
import AttendanceHistoryScreen from './screens/AttendanceHistoryScreen';
import firebase from './firebaseConfig';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Punch In" component={PunchInScreen} />
        <Stack.Screen name="Punch Out" component={PunchOutScreen} />
        <Stack.Screen name="Attendance History" component={AttendanceHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}