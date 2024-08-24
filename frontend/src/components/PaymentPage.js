
import React, { useState } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import './PaymentPage.css';

const PaymentPage = ({ bookingId, duration, onPaymentComplete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const calculateCost = () => {
    switch (duration) {
      case 30: return 2000;
      case 45: return 3000;
      case 60: return 4000;
      default: return 0;
    }
  };

  const handlePayment = (method) => {
    console.log(`Processing payment via ${method}`);
    setShowPopup(true);
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="payment-page-container">
      <h2 className="payment-page-title">Payment Confirmation</h2>
      <p className="payment-page-info">Booking ID: {bookingId}</p>
      <p className="payment-page-info">Duration: {duration} minutes</p>
      <p className="payment-page-cost">Total Cost: ₹{calculateCost()}</p>
      <div className="payment-options-container">
        <button className="payment-button payment-button-primary" onClick={() => handlePayment('Card')}>
          <FaCreditCard /> Pay with Card
        </button>
        <button className="payment-button payment-button-secondary" onClick={() => handlePayment('PayPal')}>
          <FaPaypal /> Pay with PayPal
        </button>
      </div>
      {showPopup && (
        <div className="payment-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="payment-popup-content" onClick={(e) => e.stopPropagation()}>
            <img src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png" alt="Payment Success" className="payment-success-image" />
            <p className="payment-success-message">Payment Successful!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;