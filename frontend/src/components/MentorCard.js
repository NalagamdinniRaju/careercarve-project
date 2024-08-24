
import React from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import './MentorCard.css';

const MentorCard = ({ mentor, onSelect }) => {
  return (
    <div className="mentor-card" onClick={onSelect}>
      <div className="mentor-badge-container">
        <div className={`mentor-badge ${mentor.is_premium ? 'premium' : 'standard'}`}>
          {mentor.is_premium ? (
            <>
              <FaStar /> Premium
            </>
          ) : (
            <>
              <FaUser /> Standard
            </>
          )}
        </div>
      </div>
      <img src={mentor.image_url} alt={mentor.name} className="mentor-image" />
      <h3 className="mentor-name">{mentor.name}</h3>
      <p className="mentor-expertise">{mentor.areas_of_expertise}</p>
      <p className="mentor-bio">{mentor.bio}</p>
      <div className="mentor-rating">
        Rating: {mentor.rating.toFixed(1)} / 5
      </div>
    </div>
  );
};

export default MentorCard;