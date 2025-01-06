import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user';
import { LandingProvider } from './context/landingpage';
import { DashboardProvider } from './context/dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <LandingProvider>
        <DashboardProvider>
      <App />
      </DashboardProvider>
      </LandingProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
