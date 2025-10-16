import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import FeedbackSupport from "./components/FeedbackSupport";
import ProfilePage from "./pages/ProfilePage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import QuestionAnswerPage from "./pages/Ques&Ans";
import PricingPage from "./pages/Price";
import PaidTherapy from "./pages/Paid";
import CounsellingPage from "./pages/CounselingPage";
import AssignmentPage from "./pages/AssignmentPage";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      {/* <Navbar /> */}
      {/* YEH CHANGE KIYA GAYA HAI:
          Ek <main> tag add kiya hai jismein `pt-20` (padding-top: 5rem) class hai.
          Yeh aapke saare pages ke content ko Navbar ke neeche push kar dega.
          Navbar ki height lagbhag 80px (5rem) hai.
      */}
      {/* <main className="pt-20 md:pt-24"> */} {/* Adjust padding for different screen sizes if needed */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/feedback" element={<FeedbackSupport />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/Question" element={<QuestionAnswerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/paid" element={<PaidTherapy />} />
          <Route path="/counselling" element={<CounsellingPage />} />
          <Route path="/assignment" element={<AssignmentPage />} />
        </Routes>
      {/* </main> */}
    </AuthProvider>
  );
}

export default App;

