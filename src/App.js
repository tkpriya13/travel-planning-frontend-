import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TripPlannerApp from './components/TripPlannerApp';
import TripDetail from './components/TripDetail';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route exact path="/" element={<TripPlannerApp />} /> 
        <Route path="/trips/:tripId" element={<TripDetail />} /> 
      </Routes>
    </Router>
  );
};

export default App;
