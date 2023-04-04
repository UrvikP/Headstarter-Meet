import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meeting from "./pages/Meeting.jsx";
import Schedule from "./pages/Schedule.jsx";
import { AuthContextProvider } from './context/AuthContext.js';
import Protected from './components/Protected.js'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Navbar />
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} /> 
            <Route path="/meeting" element={<Protected><Meeting /></Protected>} />
            <Route path="/schedule" element={<Protected><Schedule /></Protected>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
