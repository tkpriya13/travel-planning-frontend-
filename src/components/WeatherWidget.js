import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../api/api';

const WeatherWidget = ({ destination }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeather(destination).then(response => {
                setWeatherData(response);
            }
        );
    }, [destination]);

    return (
        <div>
            <h3>Weather in {destination}</h3>
            {weatherData ? (
                <div>
                    {weatherData}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WeatherWidget;
