import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig';

export default function AdminDashboard() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('attendance').onSnapshot(querySnapshot => {
      const records = [];
      querySnapshot.forEach(doc => {
        records.push(doc.data());
      });
      setAttendanceRecords(records);
    });
  }, []);

  const exportToCSV = () => {
    // Implement CSV export functionality
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={exportToCSV}>Export to CSV</button>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Punch In</th>
            <th>Punch Out</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.userId}</td>
              <td>{record.punchIn}</td>
              <td>{record.punchOut}</td>
              <td>{record.location.latitude}, {record.location.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}