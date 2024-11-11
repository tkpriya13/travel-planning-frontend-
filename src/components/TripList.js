import React from 'react';
import { Link } from 'react-router-dom';

const TripList = ({ trips }) => {
  return (
    <div>
      <h2>Your Trips</h2>
      <ul>
        {trips && trips.map((trip) => (
          <li key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.name} - {trip.destination}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
