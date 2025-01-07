import './App.css';
import React from 'react';
import Home from './Home';
import Sign from './Sign';  // Ensure correct file name and extension
import Forgot from './Forgot';  // Ensure correct file name and extension
import Verify from './Verify'
import Header from './Header'
import Code from './Code'
import NewPass from './NewPass'
import Profile from './Profile';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  sessionStorage.setItem('flag', 0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/feed" element={<Header />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/code" element={<Code />} />
        <Route path="/newpass" element={<NewPass />} />
      </Routes>
    </Router>
  );
}

export default App;
