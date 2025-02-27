import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Index from './pages/Index';
import History from './pages/History';
import Portfolio from './pages/Portfolio';
import Sell from './pages/Sell';
import Buy from './pages/Buy';

function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/history" element={<History />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;