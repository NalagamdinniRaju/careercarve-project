
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { FaCalendar, FaClock, FaUserTie, FaTrash } from 'react-icons/fa';
import ConfettiExplosion from 'react-confetti-explosion';
import './Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [joinedEvent, setJoinedEvent] = useState(null);
  const [isExploding, setIsExploding] = useState(false);

  const confettiConfig = {
    force: 0.8,
    duration: 3000,
    particleCount: 250,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);

    setUpcomingEvents([
      {
        id: 1,
        title: "Tech Innovation Summit",
        date: "2024-09-15T09:00:00.000Z",
        description: "Explore the latest in tech innovation",
        image: "https://picsum.photos/id/1/200/100"
      },
      {
        id: 2,
        title: "Leadership Workshop",
        date: "2024-09-20T14:00:00.000Z",
        description: "Develop your leadership skills",
        image: "https://picsum.photos/id/20/200/100"
      },
      {
        id: 3,
        title: "Digital Marketing Masterclass",
        date: "2024-09-25T10:00:00.000Z",
        description: "Learn advanced digital marketing strategies",
        image: "https://picsum.photos/id/30/200/100"
      },
      {
        id: 4,
        title: "AI in Business Seminar",
        date: "2024-10-02T13:00:00.000Z",
        description: "Understand the impact of AI on modern business",
        image: "https://picsum.photos/id/40/200/100"
      },
      {
        id: 5,
        title: "Financial Planning Workshop",
        date: "2024-10-10T11:00:00.000Z",
        description: "Plan your financial future effectively",
        image: "https://picsum.photos/id/50/200/100"
      },
      {
        id: 6,
        title: "Entrepreneurship Forum",
        date: "2024-10-15T09:30:00.000Z",
        description: "Connect with successful entrepreneurs",
        image: "https://picsum.photos/id/60/200/100"
      },
      {
        id: 7,
        title: "Sustainable Business Practices",
        date: "2024-10-22T14:30:00.000Z",
        description: "Learn how to implement sustainable practices",
        image: "https://picsum.photos/id/70/200/100"
      },
      {
        id: 8,
        title: "Data Analytics Bootcamp",
        date: "2024-10-28T10:00:00.000Z",
        description: "Intensive training in data analytics",
        image: "https://picsum.photos/id/80/200/100"
      },
      {
        id: 9,
        title: "Global Economics Symposium",
        date: "2024-11-05T09:00:00.000Z",
        description: "Discuss current global economic trends",
        image: "https://picsum.photos/id/90/200/100"
      },
      {
        id: 10,
        title: "Future of Work Conference",
        date: "2024-11-12T13:00:00.000Z",
        description: "Explore how work is evolving in the digital age",
        image: "https://picsum.photos/id/100/200/100"
      }
    ]);
  }, []);

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const joinEvent = (event) => {
    setJoinedEvent(event);
    setShowModal(true);
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), confettiConfig.duration);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsExploding(false);
  };

  return (
    <div className="dashboard">
      <ToastContainer />
      {isExploding && (
        <div style={{
          position: 'fixed',
          top: '0%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          <ConfettiExplosion {...confettiConfig} />
        </div>
      )}
      {showModal && (
        <Modal onClose={closeModal}>
          <h2>Congratulations!</h2>
          <p>You've successfully registered for the event:</p>
          <h3>{joinedEvent?.title}</h3>
          <p>We look forward to seeing you there!</p>
        </Modal>
      )}
      
      <h2>Your Bookings</h2>
      <div className="booking-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card-wrapper">
            <img src={booking.mentorImage} alt={booking.mentorName} className="mentor-image-style" />
            <h3 className="booking-info-text"><FaUserTie /> {booking.mentorName}</h3>
            <p className="booking-info-text"><FaCalendar /> {new Date(booking.dateTime).toLocaleDateString()}</p>
            <p className="booking-info-text"><FaClock /> {new Date(booking.dateTime).toLocaleTimeString()}, {booking.duration} minutes</p>
            <button onClick={() => cancelBooking(booking.id)} className="cancel-booking-btn">
              <FaTrash /> Cancel Booking
            </button>
          </div>
        ))}
      </div>

      <h2>Upcoming Events</h2>
      <div className="event-list">
        {upcomingEvents.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p><FaCalendar /> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
            <button onClick={() => joinEvent(event)} className="join-event-btn">
              Join Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Modal = ({ children, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <button className="close-btn" onClick={onClose}>&times;</button>
      {children}
      <button className="popup-close-btn" onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Dashboard;