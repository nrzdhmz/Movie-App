import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/scss/main.scss';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import WatchListPage from './pages/WatchListPage';
import RegisterPage from './pages/RegisterPage';
import CommunityPage from './pages/CommunityPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/MyLists" element={<WatchListPage />} />
        <Route path="/Community" element={<CommunityPage />} />
        <Route path="/Login" element={<LogInPage />} />
        <Route path="/Profile/:userid" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
