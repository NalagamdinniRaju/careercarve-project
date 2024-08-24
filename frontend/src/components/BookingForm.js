

// BookingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaUserTie } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MentorCard from './MentorCard';
import Select from 'react-select';
import PaymentPage from './PaymentPage';  // Import the PaymentPage component

const BookingForm = ({ onBookingComplete }) => {
  const [name, setName] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState(null);
  const [duration, setDuration] = useState(30);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableMentors, setAvailableMentors] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [areaOptions, setAreaOptions] = useState([]);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    axios.get('https://mentor-connect-backend-1.onrender.com/api/mentors')
      .then(response => {
        setMentors(response.data);
        // Extract unique areas of expertise
        const areas = new Set();
        response.data.forEach(mentor => {
          mentor.areas_of_expertise.split(',').forEach(area => {
            areas.add(area.trim());
          });
        });
        setAreaOptions(Array.from(areas).map(area => ({ value: area, label: area })));
      })
      .catch(error => {
        console.error('Error fetching mentors:', error);
        toast.error('Failed to fetch mentors. Please try again later.');
      });
  }, []);

  useEffect(() => {
    if (areaOfInterest) {
      const filtered = mentors.filter(mentor => 
        mentor.areas_of_expertise.toLowerCase().includes(areaOfInterest.value.toLowerCase())
      );
      setAvailableMentors(filtered);
    } else {
      setAvailableMentors(mentors);
    }
  }, [areaOfInterest, mentors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMentor) {
      toast.error('Please select a mentor.');
      return;
    }
    try {
      const studentResponse = await axios.post('https://mentor-connect-backend-1.onrender.com/api/students', { name, areaOfInterest: areaOfInterest.value });
      const bookingResponse = await axios.post('https://mentor-connect-backend-1.onrender.com/api/bookings', {
        studentId: studentResponse.data.id,
        mentorId: selectedMentor,
        duration,
        dateTime: `${date}T${time}:00.000Z`,
      });
      setBookingId(bookingResponse.data.id);
      console.log(bookingResponse.data)

      toast.success('Booking created successfully!');
      // Create the newBooking object
      const newBooking = {
        id: bookingResponse.data.id,
        mentorName: availableMentors.find(mentor => mentor.id === selectedMentor).name,
        dateTime: `${date}T${time}:00.000Z`,
        duration,
        mentorImage: availableMentors.find(mentor => mentor.id === selectedMentor).image_url || 'https://via.placeholder.com/150'
      };

      // Retrieve existing bookings from localStorage
      let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

      // Add the new booking to the list
      bookings.push(newBooking);

      // Save the updated list back to localStorage
      localStorage.setItem('bookings', JSON.stringify(bookings));



      console.log(newBooking)

      setShowPayment(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    }
  };

  const handlePaymentComplete = () => {
    //onBookingComplete(bookingId, duration);
    toast.success('Booking successful!');
    setShowPayment(false);
    // Reset form
    setName('');
    setAreaOfInterest(null);
    setDuration(30);
    setSelectedMentor('');
    setDate('');
    setTime('');
  };

  if (showPayment) {
    return <PaymentPage bookingId={bookingId} duration={duration} onPaymentComplete={handlePaymentComplete} />;
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-section">
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input className="input-box" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="areaOfInterest">Area of Interest</label>
          <Select
            id="areaOfInterest"
            options={areaOptions}
            value={areaOfInterest}
            onChange={setAreaOfInterest}
            isSearchable
            placeholder="Select or type an area of interest"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration"><FaClock /> Duration</label>
          <select id="duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mentor"><FaUserTie /> Select a Mentor</label>
          <select id="mentor" value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)} required>
            <option value="">Choose a mentor</option>
            {availableMentors.map(mentor => (
              <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date"><FaCalendarAlt /> Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={today} />
        </div>
        <div className="form-group">
          <label htmlFor="time"><FaClock /> Time</label>
          <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Book Session</button>
      </form> 
      <div className="mentors-container">
        <h2 className="mentors-heading"><FaUserTie /> Available Mentors</h2>
        <div className="mentor-cards">
          {availableMentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} onSelect={() => setSelectedMentor(mentor.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;