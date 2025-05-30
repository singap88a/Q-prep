/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import logo from "../assets/home-img/logo.png";
import userImage from "../assets/user.png";
import { useUser } from "../Context/UserContext";
// import AdminRoute from "../Router/PrivateRouting";
import { AuthContext } from "./Auth/AuthContext";

function Navbar({ isLoggedIn, savedQuestions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [activeButton, setActiveButton] = useState('login');
  const {
    profileImage: globalProfileImage,
    setProfileImage: setGlobalProfileImage,
  } = useUser();
  const [isBookmarkActive, setIsBookmarkActive] = useState(
    localStorage.getItem("bookmarkActive") === "true"
  );
  const [localProfileImage, setLocalProfileImage] = useState(userImage);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update bookmark state
  useEffect(() => {
    const isSavedQuestionsPage = location.pathname === "/saved_questions";
    setIsBookmarkActive(isSavedQuestionsPage);
    localStorage.setItem("bookmarkActive", isSavedQuestionsPage.toString());
  }, [location.pathname]);

  // Sync profile image with global state
  useEffect(() => {
    if (isLoggedIn && globalProfileImage) {
      setLocalProfileImage(globalProfileImage);
    } else {
      setLocalProfileImage(userImage);
    }
  }, [globalProfileImage, isLoggedIn]);

  // Fetch user data on login
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("https://redasaad.azurewebsites.net/api/Account/GetUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.urlPhoto) {
              const newImage = `https://prep.blob.core.windows.net/photosprep/${data.urlPhoto}`;
              setLocalProfileImage(newImage);
              setGlobalProfileImage(newImage);
            } else {
              setLocalProfileImage(userImage);
              setGlobalProfileImage(userImage);
            }
          })
          .catch(console.error);
      }
    } else {
      // Reset profile image when logged out
      setLocalProfileImage(userImage);
      setGlobalProfileImage(userImage);
    }
  }, [isLoggedIn, setGlobalProfileImage]);

  // Add effect to set active button based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/login') {
      setActiveButton('login');
    } else if (path === '/sign-up') {
      setActiveButton('signup');
    }
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  const goToSavedQuestions = () => {
    const newState = !isBookmarkActive;
    setIsBookmarkActive(newState);
    localStorage.setItem("bookmarkActive", newState.toString());
    navigate(
      newState ? "/saved_questions" : "/",
      newState ? { state: { savedQuestions } } : undefined
    );
  };

  const token = localStorage.getItem("token")
  const { userRole } = useContext(AuthContext)
  // console.log("userRole", userRole);

  return (
    <div>
      <nav
        className={`text-black fixed top-0 left-0 w-full z-50 transition-shadow duration-300 font-bold ${hasShadow ? "bg-white shadow-md shadow-[#4627757c]" : ""
          }`}
      >
        <div className="container relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className=" md:w-auto md:h-12 w-25 h-11" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden space-x-4 mr-36 md:flex">
            {[
              { to: "/", text: "Home" },
              { to: "/about", text: "About Us" },
              { to: "/choosetrack", text: "Choose Your Track" },
              { to: "/community", text: "Our Community" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-secondary px-2 relative ${location.pathname === link.to
                  ? "text-secondary after:content-[''] after:absolute after:right-0 after:bottom-[-2px] after:w-[35%] after:h-[2.0px] after:bg-secondary before:content-[''] before:absolute before:left-0 before:top-0 before:w-[35%] before:h-[2.0px] before:bg-secondary"
                  : ""
                  }`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="space-x-4 md:flex">
            {isLoggedIn ? (
              <div className="absolute flex items-center gap-3 space-x-2 md:right-5 top-3 right-20">
                <button
                  onClick={goToSavedQuestions}
                  className="text-2xl font-semibold text-primary"
                  aria-label={
                    isBookmarkActive ? "View saved questions" : "Save questions"
                  }
                >
                  {isBookmarkActive ? (
                    <FaBookmark className="text-primary" />
                  ) : (
                    <FaRegBookmark className="text-primary" />
                  )}
                </button>
                <Link to="/profile">
                  <img
                    src={localProfileImage}
                    alt="User profile"
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.src = userImage;
                    }}
                  />
                </Link>
                {
                  token && userRole.includes("Admin") && (
                    <Link
                      to="/admin"
                      className="relative z-10 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-4 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
                    >
                      Admin
                    </Link>
                  )}

              </div>
            ) : (
              <div className="hidden gap-4 md:flex">
                <Link
                  to="/login"
                  className={`px-3 py-1 border-2 rounded border-secondary ${activeButton === 'login'
                      ? 'bg-secondary text-white'
                      : 'text-secondary'
                    }`}
                  onClick={() => setActiveButton('login')}
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className={`px-3 py-1 border-2 rounded border-secondary ${activeButton === 'signup'
                      ? 'bg-secondary text-white'
                      : 'text-secondary'
                    }`}
                  onClick={() => setActiveButton('signup')}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 top-28"
              onClick={closeMenu}
            />
            <div className="fixed left-0 z-50 w-full text-black bg-white border-b-2 top-16 md:hidden">
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About Us" },
                { to: "/choosetrack", text: "Choose Your Track" },
                { to: "/community", text: "Our Community" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={closeMenu}
                >
                  {link.text}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="flex gap-5 py-5 ml-5">
                  <Link
                    to="/login"
                    className={`px-3 py-1 border-2 rounded border-secondary ${activeButton === 'login'
                        ? 'bg-secondary text-white'
                        : 'text-secondary'
                      }`}
                    onClick={() => {
                      setActiveButton('login');
                      closeMenu();
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className={`px-3 py-1 border-2 rounded border-secondary ${activeButton === 'signup'
                        ? 'bg-secondary text-white'
                        : 'text-secondary'
                      }`}
                    onClick={() => {
                      setActiveButton('signup');
                      closeMenu();
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
      <div className="h-20"></div>
    </div>
  );
}

export default Navbar;
