import { UserProvider } from "../Context/UserContext";

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
import GeminiSingap from "../pages/GeminiSingap/GeminiSingap";
import ChangePassword from "../components/ChangePassword/ChangePassword";

import PrivateRouting from "./PrivateRouting";
import Unauthorized from "../components/Unauthorized/Unauthorized";

import Icon_Gemini from "../pages/GeminiSingap/Icon_Gemini";
import AdminUsers from "../components/admin/AdminUsers";
import Groups from "../components/admin/Groups";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// Lazy Loading for better performance
const LazyAdmin = lazy(() => import("../pages/admin/Admin"));

function Approuting() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn"));
  });

  // const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  // const [userRole, setUserRole] = useState();

  // console.log("userRole",userRole)

  const [savedQuestions, setSavedQuestions] = useState([]);
  const [isSaved, setIsSaved] = useState([]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // useEffect(() => {
  //   localStorage.setItem("role", userRole);
  // }, [userRole]);

  return (
    <UserProvider>
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
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/sign-up"
            element={<Sign_up setIsLoggedIn={setIsLoggedIn} />}
          />
<Route path="/forgot-password" element={<ForgotPassword />} />
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
              element={
                <Profile
                  setIsLoggedIn={setIsLoggedIn}
                  setSavedQuestions={setSavedQuestions}
                  setIsSaved={setIsSaved}
                />
              }
            />
          </Route>
          <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>

          <Route path="/community" element={<Community_1 />} />
                    </Route>

          <Route path="/community/:groupId" element={<Community_2 />} />
          <Route
            path="/choosetrack/track/:trackId"
            element={<TrackDetails />}
          />

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
                setIsSaved={setIsSaved}
                isSaved={isSaved}
              />
            }
          />

          {/* Unauthorized Page */}
          <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
            <Route path="/Unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Admin Route start */}

          <Route element={<PrivateRouting />}>
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyAdmin />
                </Suspense>
              }
            />
          </Route>

          <Route element={<PrivateRouting />}>
            <Route
              path="/test-your-level/:frameworkId"
              element={<TestYourLevel />}
            />
          </Route>

          <Route element={<PrivateRouting />}>
            <Route
              path="/manage-questions/:frameworkId"
              element={<ManageQuestions />}
            />
          </Route>

          <Route element={<PrivateRouting />}>
            <Route path="/requestQuestionId" element={<RequestQuestionId />} />
          </Route>
          <Route element={<PrivateRouting />}>
            <Route path="/groups" element={<Groups />} />
          </Route>


          <Route element={<PrivateRouting />}>
            <Route path="/adminusers" element={<AdminUsers />} />
          </Route>


          {/* Admin Route end */}

          {/* Error Route */}

          <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
            <Route path="/geminiSingap" element={<GeminiSingap />} />
          </Route>

          <Route element={<ProtectRouting isLoggedIn={isLoggedIn} />}>
            <Route
              path="/profile/ChangePassword"
              element={<ChangePassword />}
            />
          </Route>

          {/* Error Route End */}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Icon_Gemini />

        <Newsletter />
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default Approuting;
