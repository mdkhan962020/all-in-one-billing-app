import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import firebase from '../firebaseConfig';

export default function PunchOutScreen() {
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  const punchOut = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setTimestamp(new Date().toISOString());

    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('attendance').add({
        userId: user.uid,
        punchOut: timestamp,
        location: location.coords,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Punch Out</Text>
      <Button title="Punch Out" onPress={punchOut} />
      {location && (
        <Text>Location: {location.coords.latitude}, {location.coords.longitude}</Text>
      )}
      {timestamp && <Text>Punched out at: {timestamp}</Text>}
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