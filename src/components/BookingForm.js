import React, { useState } from 'react';

const BookingForm = ({ onSubmit, bookings, handleremoveBooking }) => {
  const [bookingData, setBookingData] = useState({
    type: 'hotel',
    name: '',
    location: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingData);
  };

  return (
    <>

    <h3>Bookings list</h3>
      {bookings && bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>{booking.name} - {booking.location}</p>
              <button onClick={() => handleremoveBooking(booking.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Bookings added yet.</p>
    )}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={bookingData.name}
        onChange={handleChange}
        placeholder="Booking Name"
      />
      <input
        type="text"
        name="location"
        value={bookingData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        type="date"
        name="checkInDate"
        value={bookingData.checkInDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkOutDate"
        value={bookingData.checkOutDate}
        onChange={handleChange}
      />
      <button type="submit">Add Booking</button>
    </form>
    </>

  );
};

export default BookingForm;
