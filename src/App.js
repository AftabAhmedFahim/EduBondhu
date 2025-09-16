import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/SignUp/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import Profile from "./pages/Profile/Profile";
import AboutPage from "./pages/About/AboutPage";
import VerifyOtpPage from "./pages/VerifyOtp/VerifyOtpPage";
import HelpPage from "./pages/Help/Help";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";
import SearchPage from "./pages/Search/searchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/searchPage" element={<SearchPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
