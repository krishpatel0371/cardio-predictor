import React from 'react';
import './Pages.css';

function Home() {
  return (
    <div className="page">
      <section className="hero-card">
        <div className="hero-text">
          <h1>Cardiovascular Disease Risk Predictor</h1>
          <p className="hero-subtitle">
            Assess your risk of cardiovascular disease using AI-powered analysis of your blood 
            pressure, BMI, cholesterol, glucose levels, and lifestyle factors. Early detection 
            saves lives.
          </p>
          <div className="hero-actions">
            <a href="/predict" className="btn btn-primary">Start Prediction</a>
            <a href="/learn" className="btn btn-outline">Learn More</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">Leading Cause</span>
            <span className="stat-value">#1</span>
            <span className="stat-desc">Global mortality</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Preventable</span>
            <span className="stat-value">80%</span>
            <span className="stat-desc">Early detection</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Prediction</span>
            <span className="stat-value">&lt; 1s</span>
            <span className="stat-desc">Instant results</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>About Cardiovascular Disease</h2>
        <div className="card">
          <p style={{ marginTop: 0, color: '#4b5563', lineHeight: '1.7' }}>
            Cardiovascular disease (CVD) is the leading cause of death globally, affecting the 
            heart and blood vessels. Common risk factors include high blood pressure, high 
            cholesterol, diabetes, smoking, physical inactivity, and obesity. Many cases can be 
            prevented through early detection and lifestyle changes.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>How It Works</h2>
        <div className="grid-3">
          <div className="info-card">
            <h3>1. Enter Your Details</h3>
            <p>
              Provide your age, height, weight, blood pressure, cholesterol, glucose levels, and 
              lifestyle habits.
            </p>
          </div>
          <div className="info-card">
            <h3>2. AI Analysis</h3>
            <p>
              Our machine learning model analyzes your data to assess cardiovascular disease risk 
              factors.
            </p>
          </div>
          <div className="info-card">
            <h3>3. Get Results</h3>
            <p>
              Receive an instant risk assessment (Low, Moderate, or High) with your BMI calculation.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card note-card">
          <p style={{ margin: 0, color: '#1e40af', lineHeight: '1.7' }}>
            <strong>Disclaimer:</strong> This tool is for educational purposes only and does not 
            replace professional medical advice. Always consult healthcare providers for diagnosis 
            and treatment.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;


