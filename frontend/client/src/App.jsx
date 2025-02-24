// src/App.jsx
import React from 'react';
import AlarmCard from './components/AlarmCard';

const App = () => {
  const alarms = [
    { title: 'Morning Alarm', time: '07:00 AM', sound: 'Beep Beep' },
    { title: 'Lunch Reminder', time: '12:30 PM', sound: 'Ding Ding' },
    { title: 'Bedtime Alarm', time: '10:00 PM', sound: 'Chime' }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weird Alarms</h1>
      {alarms.map((alarm, index) => (
        <AlarmCard key={index} {...alarm} />
      ))}
    </div>
  );
};

export default App;
