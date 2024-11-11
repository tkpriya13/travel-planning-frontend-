import React, { useState, useEffect } from 'react';
import { fetchActivitySuggestions } from '../api/api';

const ActivitySuggestions = ({ destination, onSelectActivity }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetchActivitySuggestions(destination).then(response => setSuggestions(response));
    }, [destination]);

    return (
        <div>
            <h3>Activity Suggestions for {destination}</h3>
            <ul>
                {suggestions && suggestions.map(suggestion => (
                    <li key={suggestion.id}>
                        {suggestion.activity} - {suggestion.location}
                        <button onClick={() => onSelectActivity(suggestion)}>Add</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivitySuggestions;
