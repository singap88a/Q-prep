import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Outlet,
} from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
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
import ProtectRouting from "./ProtectRouting";
// import Admin from "../pages/admin/Admin";
import FrameworkDashboard from "../components/admin/FrameworkDashboard";
import TestYourLevel from "../components/admin/TestYourLevel";
import ManageQuestions from "../components/admin/ManageQuestions";
import RequestQuestionId from "../components/admin/RequestQuestionId";

// Lazy Loading for better performance
const LazyAdmin = lazy(() => import("../pages/admin/Admin"));

function Approuting() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn"));
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("role");
  });

  const [savedQuestions, setSavedQuestions] = useState([]);
  const [isSaved, setIsSaved] = useState([]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("role", userRole);
  }, [userRole]);

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

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Sign_up setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          }
        />

        <Route
          path="/frameworks/:mainTrackId"
          element={<FrameworkDashboard />}
        />

        <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
          <Route path="/add_question" element={<Add_question />} />
        </Route>
        {/* Other Routes */}
        <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
          <Route path="/test_your_level" element={<Test_your_level />} />
        </Route>

        <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
          <Route
            path="/saved_questions"
            element={
              <Saved_questions
                savedQuestions={savedQuestions}
                setSavedQuestions={setSavedQuestions}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
              />
            }
          />
        </Route>

        <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
          <Route
            path="/profile"
            element={<Profile setIsLoggedIn={setIsLoggedIn} />}
          />
        </Route>

        <Route path="/community" element={<Community_1 />} />
        <Route path="/community_2" element={<Community_2 />} />
        <Route path="/choosetrack/track/:trackId" element={<TrackDetails />} />

        <Route
          path="/choosetrack/track/:trackId/level"
          element={<ChooseYourLevel />}
        />

        <Route
          path="/choosetrack/track/:trackId/level/beginer"
          element={
            <Beginer
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
            />
          }
        />
        <Route
          path="/choosetrack/track/:trackId/level/Intermediate"
          element={
            <Intermediate
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
            />
          }
        />
        <Route
          path="/choosetrack/track/:trackId/level/advanced"
          element={
            <Advanced
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
            />
          }
        />
        {/* Admin Route start */}
        <Route
          element={<ProtectRouting isLoggedIn={isLoggedIn} role={userRole} />}
        >
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyAdmin />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/test-your-level/:frameworkId"
          element={<TestYourLevel />}
        />
        <Route
          path="/manage-questions/:frameworkId"
          element={<ManageQuestions />}
        />
        <Route path="/requestQuestionId" element={<RequestQuestionId />} />
        {/* Admin Route end */}
        {/* Error Route */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default Approuting;
