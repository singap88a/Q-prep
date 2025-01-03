import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Login from "../pages/Login/Login";
import Sign_up from "../pages/Sign_up/Sign_up";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import ErrorPage from "../Error/ErrorPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Newsletter from "../components/Newsletter";
import ChooseYourTrack from "../pages/ChooseTrack/ChooseYourTrack";
import ChooseLanguage from "../pages/ChooseTrack/ChooseLanguage/ChooseLanguage";
import ChooseYourLevel from "../pages/ChooseTrack/ChooseYourLevel/ChooseYourLevel";

import Questions from "../pages/Questions/Questions";
import Add_question from "../pages/Add_question/Add_question";
import Test_your_level from "../pages/Test_your_level/Test_your_level";
import Saved_questions from "../pages/Saved_questions/Saved_questions";

function Approuting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/choosetrack/1" element={<ChooseYourTrack />} />

        {/* auth */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/sign-up" element={<Sign_up setIsLoggedIn={setIsLoggedIn} />} />


        {/* Pagination */}
        <Route path="/choosetrack/1" element={<ChooseYourTrack />} />
        <Route path="/choosetrack/2" element={<ChooseYourTrack />} />
        <Route path="/choosetrack/3" element={<ChooseYourTrack />} />
        <Route path="/choosetrack/4" element={<ChooseYourTrack />} />
        <Route path="/choosetrack/5" element={<ChooseYourTrack />} />

        {/* ChooseYourLanguage */}
        <Route path="/choosetrack/lang" element={<ChooseLanguage />} />
        <Route path="/choosetrack/lang/level" element={<ChooseYourLevel />} />


        {/* ////// Questions //////// */}
        <Route path="/questions" element={<Questions />} />
        <Route path="/add_question" element={<Add_question />} />
        <Route path="/test_your_level" element={<Test_your_level />} />

        <Route path="/saved_questions" element={<Saved_questions />} />

        {/* Error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default Approuting;