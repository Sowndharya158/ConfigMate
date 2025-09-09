import { useState } from "react";
import "./App.css";
import LeftNav from "./LeftNav";
import RightSection from "./RightSection";
import FileUpload from "./FileUpload";
import AddFirewall from "./AddFirewall";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import History from "./History";

function App() {
  return (
    <Router>
      <div className="container">
        <ToastContainer />
        <LeftNav />
        <Routes>
          <Route path="/" element={<RightSection />}>
            <Route index element={<Dashboard />} />
            <Route path="uploadRules" element={<FileUpload />} />
            <Route path="AddFirewall" element={<AddFirewall />} />
            <Route path="History" element={<History />} />
            <Route path="userProfile" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
