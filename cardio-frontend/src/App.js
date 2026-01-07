import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Learn from './pages/Learn';
import About from './pages/About';
import './App.css';

function AppLayout() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-shell">
          <NavLink to="/" className="brand-link">
            <div className="brand">
              <span className="brand-logo">❤</span>
              <div className="brand-text">
                <span className="brand-title">Cardio Predictor</span>
                <span className="brand-subtitle">ML‑based risk estimation</span>
              </div>
            </div>
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/predict" className="nav-link">
              Predict
            </NavLink>
            <NavLink to="/learn" className="nav-link">
              Learn
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="app-shell footer-inner">
          <span>Cardio Disease Predictor – academic/demo use only.</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

