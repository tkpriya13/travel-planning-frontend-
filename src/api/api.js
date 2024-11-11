import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; 

export const createTrip = (newTrip) => {
  
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create trip');
        }
        return response.json();
      })
      .then((createdTrip) => {
        resolve(createdTrip);
      })
      .catch((error) => {
        reject(error); 
      });
  });
};


export const fetchTrips = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/trips`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};



export const fetchTripDetails = async (tripId) => {
  try {
    const response = await axios.get(`${API_URL}/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip details:', error);
    throw error;
  }
};

export const addBooking = async (tripId, bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/trips/${tripId}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
};

export const fetchActivitySuggestions = async (destination, tripDates) => {
  try {
    const response = await axios.get(`${API_URL}/activities/suggestions`, {
      params: { destination, tripDates },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activity suggestions:', error);
    throw error;
  }
};

export const addActivityToTrip = async (tripId, activityData) => {
  try {
    const response = await fetch(`${API_URL}/trips/${tripId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    if (!response.ok) {
      throw new Error('Failed to add activity');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding activity:', error);
  }
};

export const RemoveActivityFromTrip = async (tripId, activityId) => {
  try {
    const response = await axios.delete(`${API_URL}/trips/${tripId}/activities/${activityId}`);
    if (!response.ok) {
      throw new Error('Failed to delete activity');
    }
    return response.json();
  } catch (error) {
    console.error('Error removing activity:', error);
  }
};

export const RemoveBookingFromTrip = async (tripId, bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/trips/${tripId}/bookings/${bookingId}`);
    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
    return response.json();
  } catch (error) {
    console.error('Error removing booking:', error);
  }
};

export const fetchWeather = async (destination, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/weather`, {
      params: { destination, startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchTransportOptions = async (fromLocation, destination, tripDates) => {
  try {
    const response = await axios.get(`${API_URL}/transport`, {
      params: { fromLocation, destination, tripDates },
    });
    return (response.data);
  } catch (error) {
    console.error('Error fetching transport options:', error);
    throw error;
  }
};
