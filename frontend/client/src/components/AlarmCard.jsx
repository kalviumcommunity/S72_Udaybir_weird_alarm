// src/components/AlarmCard.jsx
import React from 'react';

const AlarmCard = ({ title, time, sound }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white shadow-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">Time: {time}</p>
      <p>Sound: {sound}</p>
    </div>
  );
};

export default AlarmCard;
