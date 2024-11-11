import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTripDetails, addBooking, fetchActivitySuggestions, fetchWeather, fetchTransportOptions, addActivityToTrip, RemoveActivityFromTrip, RemoveBookingFromTrip } from '../api/api';
import Itinerary from './Itinerary';
import BookingForm from './BookingForm';
import ActivitySuggestions from './ActivitySuggestions';
import WeatherWidget from './WeatherWidget';
import Map from './Map';
import TravelOptions from './TravelOptions';

const TripDetail = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({ itinerary: { activities: [] } });
  const [loading, setLoading] = useState(true);
  const [activitySuggestions, setActivitySuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [transportOptions, setTransportOptions] = useState([]);
  const [coords, setCoords] = useState([]);


  const getMaps = (destination) => {
    async function getLatLong(city) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

        try {
            const response = await fetch(url, {
                headers: { 'User-Agent': 'TravelApp' }
            });
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat: parseFloat(lat), lng: parseFloat(lon) };
            } else {
                console.log('Location not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    getLatLong(destination).then(coords => {
        if (coords) {
            setCoords([coords, { lat: 40.7128, lng: -74.0060 }, { lat: 34.0522, lng: -118.2437 }])
        }
    });

  }

  useEffect(() => {
    fetchTripDetails(tripId)
      .then((data) => {
        setTrip(data);
        getMaps(data.destination);
        return Promise.all([
          fetchActivitySuggestions(data.destination, data.dates),
          fetchWeather(data.destination, data.startDate, data.endDate),
          fetchTransportOptions(data.startLocation, data.destination, data.dates),
        ]);
      })
      .then(([activities, weather, transport]) => {
        setActivitySuggestions(activities);
        setWeatherData(weather);
        setTransportOptions(transport);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading trip details:', error);
        setLoading(false);
      });
  }, [tripId]);

  const handleAddBooking = async (bookingData) => {
    if (trip) {
      await addBooking(trip.id, bookingData);
      setTrip({ ...trip, bookings: [...trip.bookings, bookingData] });
    }
  };

  const handleremoveBooking = async (bookingData) => {
    if (trip) {
      let bookings = trip.bookings || [];
      let filteredBookings = bookings.filter((item) => {
        return item.id !== bookingData
      });
      await RemoveBookingFromTrip(trip.id, bookingData);
      setTrip({ ...trip, bookings: [...filteredBookings] });
    }
  };

  const handleAddActivity = (newActivity) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      itinerary: {
        activities: [...prevTrip.itinerary.activities, newActivity],
      },
    }));
  };

  const handleRemoveActivity = (activityId) => {
    let currentActivities = trip.activities || [];
    let filteredActivities = currentActivities.filter((item) => {
        return item.id !== activityId
    });
    RemoveActivityFromTrip(trip.id, activityId);
    setTrip((prevTrip) => ({
        ...prevTrip,
          activities: [...filteredActivities],
      }));
  };

  const handleSelectActivity = (activity) => {
    addActivityToTrip(trip.id, activity);
    setTrip((prevTrip) => ({
        ...prevTrip,
          activities: [...prevTrip.activities, activity],
      }));
  };

  if (loading) return <div>Loading trip details...</div>;

  const itinerary = { activities: trip.activities } || { activities: [] };
  const bookings = trip.bookings || [];

  return (
    <div id="details">
      <h2>{trip.name} - {trip.destination}</h2>
      <div id="travel-options">
        <TravelOptions transport={transportOptions} destination={trip.destination}/>
      </div>
      <div id="weather">
        <WeatherWidget destination={trip.destination} weatherData={weatherData} />
      </div>
      <div id="iternary">
        <Itinerary key={trip.id}
          itinerary={itinerary}  
          onAddActivity={handleAddActivity}
          onRemoveActivity={handleRemoveActivity}
        />
      </div>
      <div id="activities">
        <ActivitySuggestions suggestions={activitySuggestions} destination={trip.destination} onSelectActivity={handleSelectActivity}/>
      </div>
      <div id="bookings">
        <BookingForm onSubmit={handleAddBooking} bookings={bookings} handleremoveBooking={handleremoveBooking}/>
      </div>
      {coords.length ?      
      <Map locations={coords} /> : '' }
    </div>
  );
};

export default TripDetail;
