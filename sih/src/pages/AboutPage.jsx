// AboutPage.js

import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './AboutPage.css'; // Import your CSS file for styling

const AboutPage = () => {
    
  return (
    <div className="about-page">
      <div className="section">
        {/* <img src="https://images.app.goo.gl/4oumriD3doev8Yzz9" alt="Image 1" /> */}
        <div className="text">
          <h2>Elevating water infrastructure with cutting-edge technology. The platform which pioneers precise solutions for predicting and preventing underground pipeline leakages.</h2>
          <p></p>
        </div>
      </div>

      <div className="section">
        <div className="text">
          <h2>Join us on a transformative journey toward sustainable water management. Our initiative blends technology and engineering excellence, utilizing advanced sensors to enhance efficiency and resilience in water infrastructure. Precision, reliability, and environmental stewardship define our approach.</h2>
          <p></p>
        </div>
        {/* <img src="/path/to/image2.jpg" alt="Image 2" /> */}
      </div>

      <div className="section">
        {/* <img src="/path/to/image3.jpg" alt="Image 3" /> */}
        <div className="text">
          <h2>Dive into a hub of groundbreaking water infrastructure advancements. Our mission is to revolutionize water management through predictive analytics. Empowering stakeholders with sensor data, we minimize disruptions, conserve resources, and shape a sustainable future for vital water networks.</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

      
