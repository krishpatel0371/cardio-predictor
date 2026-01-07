import React, { useState, useMemo } from 'react';
import './Pages.css';
import { postJson } from '../api';

const initialFormState = {
  gender: '1',
  age: '',
  height: '',
  weight: '',
  ap_hi: '',
  ap_lo: '',
  cholesterol: '1',
  gluc: '1',
  smoke: '0',
  alco: '0',
  active: '1',
};

function Predict() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [touched, setTouched] = useState({});

  // Calculate BMI dynamically
  const calculatedBMI = useMemo(() => {
    if (form.height && form.weight) {
      const heightInMeters = parseFloat(form.height) / 100;
      const weight = parseFloat(form.weight);
      if (heightInMeters > 0 && weight > 0) {
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
      }
    }
    return null;
  }, [form.height, form.weight]);

  // Calculate form completion percentage
  const formProgress = useMemo(() => {
    const requiredFields = ['age', 'height', 'weight', 'ap_hi', 'ap_lo'];
    const filledFields = requiredFields.filter(field => form[field] && form[field].trim() !== '').length;
    return Math.round((filledFields / requiredFields.length) * 100);
  }, [form]);

  // Validate blood pressure
  const bpValidation = useMemo(() => {
    if (form.ap_hi && form.ap_lo) {
      const systolic = parseFloat(form.ap_hi);
      const diastolic = parseFloat(form.ap_lo);
      if (systolic <= diastolic) {
        return { valid: false, message: 'Systolic should be higher than diastolic' };
      }
      if (systolic < 90 || systolic > 180) {
        return { valid: false, message: 'Systolic BP should be between 90-180 mmHg' };
      }
      if (diastolic < 60 || diastolic > 120) {
        return { valid: false, message: 'Diastolic BP should be between 60-120 mmHg' };
      }
      return { valid: true };
    }
    return { valid: null };
  }, [form.ap_hi, form.ap_lo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (error) setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate blood pressure
    if (!bpValidation.valid) {
      setError(bpValidation.message || 'Please check your blood pressure values');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setShowResult(false);

    try {
      const payload = {
        ...form,
        gender: parseInt(form.gender, 10),
        cholesterol: parseInt(form.cholesterol, 10),
        gluc: parseInt(form.gluc, 10),
        smoke: parseInt(form.smoke, 10),
        alco: parseInt(form.alco, 10),
        active: parseInt(form.active, 10),
        age: parseFloat(form.age),
        height: parseFloat(form.height),
        weight: parseFloat(form.weight),
        ap_hi: parseFloat(form.ap_hi),
        ap_lo: parseFloat(form.ap_lo),
      };

      const data = await postJson('/predict', payload);
      setResult(data);
      setTimeout(() => setShowResult(true), 100);
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong';
      setError(errorMessage);
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setResult(null);
    setShowResult(false);
    setError('');
    setTouched({});
  };

  // Get BMI category
  const getBMICategory = (bmi) => {
    if (!bmi) return null;
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return { label: 'Underweight', color: '#3b82f6' };
    if (bmiNum < 25) return { label: 'Normal', color: '#10b981' };
    if (bmiNum < 30) return { label: 'Overweight', color: '#f59e0b' };
    return { label: 'Obese', color: '#ef4444' };
  };

  const bmiCategory = calculatedBMI ? getBMICategory(calculatedBMI) : null;

  return (
    <div className="page">
      <h1>Predict Cardio Disease Risk</h1>
      <p className="page-subtitle">
        Fill in your clinical and lifestyle details to estimate your risk. This is for educational
        purposes only and does not replace professional medical advice.
      </p>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
        <span className="progress-text">{formProgress}% Complete</span>
      </div>

      <div className="layout-two-column">
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="1">Female</option>
                <option value="2">Male</option>
              </select>
            </div>

            <div className="form-field">
              <label>Age (years)</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min="1"
                max="120"
                required
              />
            </div>

            <div className="form-field">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                onBlur={handleBlur}
                min="100"
                max="250"
                required
              />
              {touched.height && form.height && (
                <span className="field-hint">Range: 100-250 cm</span>
              )}
            </div>

            <div className="form-field">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                min="30"
                max="250"
                required
              />
              {touched.weight && form.weight && (
                <span className="field-hint">Range: 30-250 kg</span>
              )}
            </div>

            {/* Dynamic BMI Display */}
            {calculatedBMI && (
              <div className="form-field bmi-display">
                <label>Calculated BMI</label>
                <div className="bmi-value" style={{ color: bmiCategory?.color }}>
                  {calculatedBMI} 
                  {bmiCategory && (
                    <span className="bmi-category"> ({bmiCategory.label})</span>
                  )}
                </div>
              </div>
            )}

            <div className="form-field">
              <label>Systolic BP (ap_hi)</label>
              <input
                type="number"
                name="ap_hi"
                value={form.ap_hi}
                onChange={handleChange}
                onBlur={handleBlur}
                min="70"
                max="250"
                required
                className={touched.ap_hi && !bpValidation.valid ? 'input-error' : ''}
              />
              {touched.ap_hi && form.ap_hi && (
                <span className={`field-hint ${!bpValidation.valid ? 'hint-error' : ''}`}>
                  {bpValidation.valid === false ? bpValidation.message : 'Normal: 90-120 mmHg'}
                </span>
              )}
            </div>

            <div className="form-field">
              <label>Diastolic BP (ap_lo)</label>
              <input
                type="number"
                name="ap_lo"
                value={form.ap_lo}
                onChange={handleChange}
                onBlur={handleBlur}
                min="40"
                max="150"
                required
                className={touched.ap_lo && !bpValidation.valid ? 'input-error' : ''}
              />
              {touched.ap_lo && form.ap_lo && (
                <span className={`field-hint ${!bpValidation.valid ? 'hint-error' : ''}`}>
                  {bpValidation.valid === false ? '' : 'Normal: 60-80 mmHg'}
                </span>
              )}
            </div>

            <div className="form-field">
              <label>Cholesterol</label>
              <select name="cholesterol" value={form.cholesterol} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </select>
            </div>

            <div className="form-field">
              <label>Glucose</label>
              <select name="gluc" value={form.gluc} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </select>
            </div>

            <div className="form-field">
              <label>Smokes?</label>
              <select name="smoke" value={form.smoke} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-field">
              <label>Consumes alcohol?</label>
              <select name="alco" value={form.alco} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="form-field">
              <label>Physically active?</label>
              <select name="active" value={form.active} onChange={handleChange}>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="alert alert-error" style={{ animation: 'slideIn 0.3s ease-out' }}>
              <strong>Error:</strong> {error}
              {error.includes('Failed to connect') && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                  <p style={{ margin: '0.25rem 0' }}>💡 Make sure the backend server is running:</p>
                  <code style={{ 
                    display: 'block', 
                    background: 'rgba(0,0,0,0.1)', 
                    padding: '0.5rem', 
                    borderRadius: '0.25rem',
                    marginTop: '0.5rem',
                    fontSize: '0.8rem'
                  }}>
                    cd cardio-backend<br />
                    python app.py
                  </code>
                </div>
              )}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading || formProgress < 100}>
              {loading ? (
                <span className="loading-spinner">
                  <span className="spinner"></span> Predicting…
                </span>
              ) : (
                'Predict Risk'
              )}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        <div className={`card result-card ${showResult ? 'result-visible' : ''}`}>
          <h2>Result</h2>
          {!result && (
            <div className="result-placeholder">
              <div className="placeholder-icon">📊</div>
              <p>No prediction yet. Submit the form to see your risk assessment.</p>
            </div>
          )}

          {result && (
            <div className={`result-content ${showResult ? 'fade-in' : ''}`}>
              <div className="result-main">
                <span className="result-label">Risk Category</span>
                <span 
                  className={`result-value ${result.risk?.toLowerCase().includes('high') ? 'high' : result.risk?.toLowerCase().includes('moderate') ? 'moderate' : 'low'}`}
                  style={{ animation: 'pulse 0.5s ease-out' }}
                >
                  {result.risk}
                </span>
              </div>

              <div className="result-grid">
                <div className="result-item">
                  <span className="result-label">Risk Score</span>
                  <span className="result-chip">{result.risk_score}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">BMI</span>
                  <span className="result-chip">{result.bmi}</span>
                </div>
              </div>

              {/* Risk Level Indicator */}
              <div className="risk-indicator">
                <div className="risk-bar">
                  <div 
                    className={`risk-fill ${result.risk?.toLowerCase().includes('high') ? 'risk-high' : result.risk?.toLowerCase().includes('moderate') ? 'risk-moderate' : 'risk-low'}`}
                    style={{ 
                      width: result.risk?.toLowerCase().includes('high') ? '100%' : 
                             result.risk?.toLowerCase().includes('moderate') ? '60%' : '30%',
                      animation: 'slideWidth 1s ease-out'
                    }}
                  ></div>
                </div>
              </div>

              <p className="result-note">
                This tool is built for educational purposes only. Always consult a qualified
                healthcare professional for diagnosis and treatment decisions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Predict;


