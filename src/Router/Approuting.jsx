import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "../pages/Login/Login";
import Sign_up from "../pages/Sign_up/Sign_up";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import ChooseTrack from "../components/ChooseYourtrack/chooseTrack";
import Layout from "../Layout/Layout";
import ErrorPage from "../Error/ErrorPage";

function Approuting() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/choosetrack/1" element={<ChooseTrack />} />

          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Sign_up />} />

          {/* Pagination */}
          <Route path="/choosetrack/1" element={<ChooseTrack />} />
          <Route path="/choosetrack/2" element={<ChooseTrack />} />
          <Route path="/choosetrack/3" element={<ChooseTrack />} />
          <Route path="/choosetrack/4" element={<ChooseTrack />} />
          <Route path="/choosetrack/5" element={<ChooseTrack />} />

          


        </Route>

        {/* Error */}
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </Router>
  );
}

export default Approuting;
