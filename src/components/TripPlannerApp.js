import React, { useEffect, useState } from 'react';
import NewTripForm from './NewTripForm';
import TripList from './TripList';
import { createTrip, fetchTrips } from '../api/api';

const TripPlannerApp = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips()
      .then((data) => {
        setTrips(data);
      })
      .catch((error) => {
        console.error('Error loading trip details:', error);
      });
  }, []);

  const handleNewTripSubmit = (newTrip) => {
    createTrip(newTrip)
    .then((createdTrip) => {
        setTrips((prevTrips) => [...prevTrips, createdTrip]);
    })
    .catch((error) => {
        console.error('Error creating trip:', error);
    });
  };

  return (
    <div id="home">
      <h1>Trip Planner</h1>
      <div>
        <NewTripForm onSubmit={handleNewTripSubmit} />
      </div>
      <div>
        <TripList trips={trips} />
      </div>
    </div>
  );
};

export default TripPlannerApp;
