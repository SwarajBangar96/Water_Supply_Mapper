// Alert.js

import React, { useState } from "react";
import "./Alert.css"; // Import the CSS file

const Alert = ({ difference }) => {
  const [showPopup, setShowPopup] = useState(difference > 5); // change this codition. This is just for testing purpose.

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="overlay">
          <div className={`popup alert-error`}>
            <span className="close-btn" onClick={closePopup}>
              X
            </span>
            <strong>Alert:</strong> The difference value is {difference}.
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
