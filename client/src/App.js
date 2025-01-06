import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './components/formsPage/SignUp';
import { SignIn } from './components/formsPage/SignIn';
import { Login } from './components/formsPage/Login';
import { LandingPage } from './components/LandingPage/LandingPage';
import { GiveKudo } from './components/giveKudos/GiveKudo';
import KudosDashboard from './components/chartData/ChartData';
import { UserProvider } from './context/user';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      {/* Non-route elements */}
      <div className="droplet" id="d1"></div>
      <div className="droplet" id="d2"></div>
      <div className="droplet" id="d3"></div>
      <div className="droplet" id="d4"></div>
      <div className="droplet" id="d5"></div>
      <div className="droplet" id="d6"></div>
      <div className="droplet" id="d7"></div>
      <div className="droplet" id="d8"></div>
      <div className="droplet" id="d9"></div>
      <div className="droplet" id="d10"></div>
      <div className="gradient-overlay"></div>

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/log-in"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landing-page"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/give-kudo"
          element={
            <ProtectedRoute>
              <GiveKudo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <KudosDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
     
    </>
  );
}

export default App;
