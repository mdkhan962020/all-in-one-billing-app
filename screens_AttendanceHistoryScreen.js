import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';

export default function AttendanceHistoryScreen() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('attendance')
        .where('userId', '==', user.uid)
        .onSnapshot(querySnapshot => {
          const records = [];
          querySnapshot.forEach(doc => {
            records.push(doc.data());
          });
          setAttendanceRecords(records);
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance History</Text>
      <FlatList
        data={attendanceRecords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>Punch In: {item.punchIn}</Text>
            <Text>Punch Out: {item.punchOut}</Text>
            <Text>Location: {item.location.latitude}, {item.location.longitude}</Text>
          </View>
        )}
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
  record: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});