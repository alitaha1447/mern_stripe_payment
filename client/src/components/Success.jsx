import React from 'react';
import './success.style.css'; // Ensure you have some basic styling

const Success = () => {
  return (
    <div className="success-modal">
      <div className="success-modal-content">
        <div className="success-modal-header">
          <h2>🎉 Payment Successful!</h2>
        </div>
        <div className="success-modal-body">
          <p>Your payment has been processed successfully. Thank you for your purchase! Your order will be on its way soon.</p>
          {/* <p>Order Number: <strong>#123456</strong></p> Example order number */}
        </div>
        <div className="success-modal-footer">
          <button onClick={() => window.location.href = '/'} className="continue-btn">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
