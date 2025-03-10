// src/App.jsx
import React, { useEffect, useState } from 'react';
import AlarmCard from './components/AlarmCard';

const App = () => {

  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await fetch('http://localhost:3000/alarms');
        if (!response.ok) throw new Error('Failed to fetch alarms');
        const data = await response.json();
        setAlarms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading alarms...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weird Alarms</h1>
      {alarms.length === 0 ? (
        <p className="text-center text-gray-400">No alarms found.</p>
      ) : (
        alarms.map((alarm) => <AlarmCard key={alarm._id} {...alarm} />)
      )}
    </div>
  );
};

export default App;
