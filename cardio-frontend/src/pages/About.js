import React from 'react';
import './Pages.css';

function About() {
  return (
    <div className="page">
      <h1>About This Project</h1>
      <p className="page-subtitle">
        A machine learning powered web application for estimating cardiovascular disease risk.
      </p>

      <div className="card">
        <h2>Technical overview</h2>
        <ul className="list">
          <li>
            <strong>Backend</strong> – Flask API serving a trained Random Forest model and a scaler.
          </li>
          <li>
            <strong>Frontend</strong> – React single page application with multiple views and a
            responsive layout.
          </li>
          <li>
            <strong>Inputs</strong> – Age, gender, blood pressure, cholesterol, glucose, BMI and
            lifestyle indicators.
          </li>
          <li>
            <strong>Outputs</strong> – Risk score, BMI value and overall risk category with simple
            rule‑based overrides for very high risk cases.
          </li>
        </ul>
      </div>

      <div className="card">
        <h2>Disclaimer</h2>
        <p>
          This project is built for academic and demonstration purposes. The predictions should not
          be used for real‑world medical decision‑making. Always consult with certified medical
          professionals for diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}

export default About;


