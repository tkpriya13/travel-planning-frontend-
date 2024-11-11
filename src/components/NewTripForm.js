import React, { useState } from 'react';

const NewTripForm = ({ onSubmit }) => {
  const [tripData, setTripData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    id:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    tripData.id = Math.floor((Math.random() * 100) + 1);
    e.preventDefault();
    if (onSubmit) {
      onSubmit(tripData);
    }
    setTripData({
      name: '',
      destination: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Trip Name:</label>
        <input
          type="text"
          name="name"
          value={tripData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Destination:</label>
        <input
          type="text"
          name="destination"
          value={tripData.destination}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={tripData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={tripData.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Trip</button>
    </form>
  );
};

export default NewTripForm;
