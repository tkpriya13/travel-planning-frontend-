import React from 'react';

const TravelOptions = ({ transport, destination }) => {
    return (
        <div>
            <h3>Tranport Suggestions for {destination}</h3>
            <ul>
                {transport && transport.map(suggestion => (
                    <li key={suggestion.id}>
                        {suggestion.type} - {suggestion.to} {suggestion.departure} - {suggestion.duration}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelOptions;
