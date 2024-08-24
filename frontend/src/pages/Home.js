import React from 'react';
import BookingForm from '../components/BookingForm';


const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to MentorConnect Scheduler</h1>
      <p>Schedule your one-on-one mentoring sessions with top industry professionals.</p>
      <BookingForm />
    </div>
  );
};

export default Home;