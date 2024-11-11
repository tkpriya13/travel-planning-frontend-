import React from 'react';

const Itinerary = ({ itinerary, onRemoveActivity }) => {
  return (
    <div>
      <h3>Itinerary</h3>
      {itinerary && itinerary.activities && itinerary.activities.length > 0 ? (
        <ul>
          {itinerary.activities.map((activity) => (
            <li key={activity.id}>
              <p>{activity.activity} - {activity.location}</p>
              <button onClick={() => onRemoveActivity(activity.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities added yet.</p>
      )}
    </div>
  );
};

export default Itinerary;
