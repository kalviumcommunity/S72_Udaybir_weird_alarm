// src/App.jsx
import React, { useEffect, useState } from 'react';
import AlarmCard from './components/AlarmCard';


const App = () => {

  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const fetchAlarms = async () => {
      const response = await fetch('http://localhost:3000/alarms');
      const data = await response.json();
      setAlarms(data);
    };

    fetchAlarms();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weird Alarms</h1>
      {alarms.map((alarm) => (
        <AlarmCard key={alarm._id} {...alarm} />
      ))}
    </div>
  );
};

export default App;
