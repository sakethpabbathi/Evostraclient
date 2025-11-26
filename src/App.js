import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminDashboard from "./components/AdminDashboard";
import Items from './components/Items';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ManagerDashboard from "./components/ManagerDashboard";
import React from 'react';

// import DemoDashboard from './components/DemoDashboard';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/demo" element={<DemoDashboard />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path="/manager-dashboard" element={<ManagerDashboard />} />
  <Route path="/Items" element={<Items />} />
      </Routes>
    </Router>
  );
}

export default App;
