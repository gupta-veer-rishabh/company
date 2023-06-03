import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Booking.css';

function BookingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [washPacks, setWashPacks] = useState('');
  const [carName, setCarName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/AllBooking');
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d+$/.test(phoneNumber);
  };

  const validatePreferredTime = (preferredTime) => {
    const isTimeSlotBooked = bookings.some((booking) => booking.time === preferredTime);

    if (isTimeSlotBooked) {
      const currentTime = new Date().getTime();
      const preferredTimeMs = new Date(date + ' ' + preferredTime).getTime();
      const timeDifferenceHours = Math.abs((currentTime - preferredTimeMs) / 36e5);

      if (timeDifferenceHours >= 3) {
        // Allow booking if the preferred time is available after a 3-hour gap
        return true;
      } else {
        // Deny booking if the preferred time is not available within a 3-hour gap
        return false;
      }
    }

    return true;
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phone)) {
      setMessage('Phone number should contain only numbers');
      return;
    }

    if (!validatePreferredTime(time)) {
      const currentTime = new Date().getTime();
      const availableTimeSlots = bookings.filter((booking) => {
        const bookingTimeMs = new Date(booking.date + ' ' + booking.time).getTime();
        const timeDifferenceHours = Math.abs((currentTime - bookingTimeMs) / 36e5);
        return timeDifferenceHours >= 3;
      });

      if (availableTimeSlots.length > 0) {
        const suggestedTime = availableTimeSlots[0].time;
        setMessage(
          `The preferred time slot is already booked. Please choose a different time at least 3 hours ahead. Available time slot: ${suggestedTime}`
        );
      } else {
        setMessage('The preferred time slot is already booked. Please choose a different time.');
      }
      return;
    }

    const newBooking = {
      name: name,
      phone: phone,
      email: email,
      date: date,
      time: time,
      washPacks: washPacks,
      carName: carName,
      location: location,
    };

    try {
      const response = await axios.post('http://localhost:8181/user/AddBooking', newBooking);
      console.log(response.data);
      setMessage(response.data);
      fetchBookings();

      // Check if the user is subscribed
      const userSubscription = bookings.find((booking) => booking.email === email);
      if (userSubscription) {
        // User is subscribed, redirect to booking successful page
        window.location.href = 'http://localhost:3000/AfterLogin/BookingSuccessful';
      } else {
        // User is not subscribed, show payment form
        window.location.href = 'http://localhost:3000/AfterLogin/PaymentForm';
      }
    } catch (error) {
      console.error(error);
    }

    // Reset the form fields
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setTime('');
    setWashPacks('');
    setCarName('');
    setLocation('');
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`http://localhost:8181/user/CancelBooking/${bookingId}`);
      console.log(response.data);
      setMessage(response.data);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>On-Demand Car Wash Booking</h1>

      <form onSubmit={submitBooking}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="date">Preferred Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label htmlFor="time">Preferred Time:</label>
        <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <label htmlFor="washPacks">WashPacks:</label>
        <select id="washPacks" value={washPacks} onChange={(e) => setWashPacks(e.target.value)} required>
          <option value="">Select a WashPacks</option>
          <option value="normal">Normal Wash</option>
          <option value="medium">Medium Wash</option>
          <option value="premium">Premium Wash</option>
        </select>

        <label htmlFor="carName">Car Name:</label>
        <select id="carName" value={carName} onChange={(e) => setCarName(e.target.value)} required>
          <option value="">Select a car</option>
          <option value="SUV">SUV</option>
          <option value="SEDAN">SEDAN</option>
          <option value="COUPE">COUPE</option>
          <option value="DACIA">DACIA</option>
        </select>

        <label htmlFor="location">Location:</label>
<select id="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
  <option value="">Select a location</option>
  <option value="Bhopal">Bhopal</option> {/* Updated option value */}
  <option value="Indore">Indore</option>
  <option value="Jabalpur">Jabalpur</option>
</select>


        <button type="submit">Book Now</button>
      </form>

      <div id="message" style={{ color: 'green' }}>
        {message}
      </div>
    </div>
  );
}

export default BookingPage;
