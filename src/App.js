import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meeting from "./pages/Meeting.jsx";
import Schedule from "./pages/Schedule.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </div>
  );
}

export default App;
