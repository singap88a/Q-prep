import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/Login/Login";
import Sign_up from "../pages/Sign_up/Sign_up";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import ErrorPage from "../Error/ErrorPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ChooseYourTrack from "../pages/ChooseTrack/ChooseYourTrack";
import ChooseYourLevel from "../pages/ChooseTrack/ChooseYourLevel/ChooseYourLevel";
import Add_question from "../pages/Add_question/Add_question";
import Test_your_level from "../pages/Test_your_level/Test_your_level";
import Saved_questions from "../pages/Saved_questions/Saved_questions";
import ScrollToTop from "./ScrollToTop";
import Profile from "../pages/Profile/Profile";
import "../style/animations.css";
import Community_1 from "../pages/Community/Community_1";
import Community_2 from "../pages/Community/Community_2";
import TrackDetails from "../components/ChooseYourtrack/ChooseYourLevel/TrackDetails";
import Beginer from "../components/ChooseYourtrack/ChooseYourLevel/Beginer";
import Intermediate from "../components/ChooseYourtrack/ChooseYourLevel/Intermediate";
import Advanced from "../components/ChooseYourtrack/ChooseYourLevel/Advanced";
function Approuting() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [savedQuestions, setSavedQuestions] = useState([]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        savedQuestions={savedQuestions}
      />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/choosetrack" element={<ChooseYourTrack />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/sign-up"
          element={<Sign_up setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/add_question" element={<Add_question />} />
        <Route path="/test_your_level" element={<Test_your_level />} />
        <Route
          path="/saved_questions"
          element={<Saved_questions savedQuestions={savedQuestions} />}
        />
        <Route path="/profile" element={<Profile />} />

        {/* Community */}
        <Route path="/community" element={<Community_1 />} />
        <Route path="/community_2" element={<Community_2 />} />
        <Route path="/choosetrack/track/:trackId" element={<TrackDetails />} />
        <Route
          path="/choosetrack/track/:trackId/level"
          element={<ChooseYourLevel />}
        />
        {/* <Route path="/choosetrack/track/:trackId/level/questions" element={ <Questions savedQuestions={savedQuestions} setSavedQuestions={setSavedQuestions} />} /> */}
        <Route
          path="/choosetrack/track/:trackId/level/beginer"
          element={
            <Beginer
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
            />
          }
        />
        <Route
          path="/choosetrack/track/:trackId/level/Intermediate"
          element={
            <Intermediate
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
            />
          }
        />
        <Route
          path="/choosetrack/track/:trackId/level/advanced"
          element={
            <Advanced
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
            />
          }
        />

        {/* Error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default Approuting; // يمكنك تغيير الاسم هنا إذا أردت
