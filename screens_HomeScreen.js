import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Punch-In App</Text>
      <Button
        title="Punch In"
        onPress={() => navigation.navigate('Punch In')}
      />
      <Button
        title="Punch Out"
        onPress={() => navigation.navigate('Punch Out')}
      />
      <Button
        title="Attendance History"
        onPress={() => navigation.navigate('Attendance History')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});