import React from 'react';
import './Pages.css';

function Learn() {
  return (
    <div className="page">
      <h1>Understand Cardio Risk Factors</h1>
      <p className="page-subtitle">
        Cardiovascular disease is influenced by a combination of clinical values, lifestyle habits
        and long‑term health conditions.
      </p>

      <div className="grid-3">
        <div className="info-card">
          <h3>Blood Pressure</h3>
          <p>
            High systolic (ap_hi) and diastolic (ap_lo) pressures increase the workload on your
            heart and damage blood vessels over time, leading to higher risk.
          </p>
        </div>
        <div className="info-card">
          <h3>BMI &amp; Obesity</h3>
          <p>
            Body Mass Index (BMI) is calculated from your height and weight. Higher BMI,
            especially above 30–35, is strongly associated with cardiovascular events.
          </p>
        </div>
        <div className="info-card">
          <h3>Cholesterol &amp; Glucose</h3>
          <p>
            Elevated cholesterol and blood glucose levels can promote artery plaque formation and
            are key risk factors for heart disease and stroke.
          </p>
        </div>
      </div>

      <section className="section">
        <h2>Lifestyle factors</h2>
        <div className="grid-2">
          <div className="info-card">
            <h3>Smoking &amp; Alcohol</h3>
            <p>
              Smoking damages blood vessels and raises blood pressure. Excessive alcohol intake can
              lead to hypertension, arrhythmias and other cardiovascular problems.
            </p>
          </div>
          <div className="info-card">
            <h3>Physical activity</h3>
            <p>
              Regular moderate activity improves blood pressure, weight control and overall
              cardiovascular fitness, reducing long‑term risk.
            </p>
          </div>
        </div>
      </section>

      <section className="section note-card">
        <h2>Important note</h2>
        <p>
          This application uses a machine learning model trained on historical data to provide an
          approximate risk estimate. It does not diagnose disease and must not be used as a
          substitute for clinical evaluation. Always discuss your results with a healthcare
          professional.
        </p>
      </section>
    </div>
  );
}

export default Learn;


