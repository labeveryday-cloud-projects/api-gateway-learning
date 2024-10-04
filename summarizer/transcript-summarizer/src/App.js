import './App.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SummaryView from './components/SummaryView';
import PrivateRoute from './components/PrivateRoute';
import ConfirmSignUp from './components/ConfirmSignUp';

Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-signup" element={<ConfirmSignUp />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/summary/:id"
          element={
            <PrivateRoute>
              <SummaryView />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
