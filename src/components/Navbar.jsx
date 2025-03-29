/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import logo from "../assets/home-img/logo.png";
import userImage from "../assets/user.png";

function Navbar({ isLoggedIn, setIsLoggedIn, savedQuestions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [isBookmarkActive, setIsBookmarkActive] = useState(
    localStorage.getItem("bookmarkActive") === "true"
  );
  const [profileImage, setProfileImage] = useState(userImage);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // تحديث حالة الإشارة المرجعية عند تغيير المسار
  useEffect(() => {
    const isSavedQuestionsPage = location.pathname === "/saved_questions";
    setIsBookmarkActive(isSavedQuestionsPage);
    localStorage.setItem("bookmarkActive", isSavedQuestionsPage.toString());
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("https://questionprep.azurewebsites.net/api/Account/GetUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.urlPhoto) {
              setProfileImage(
                `https://questionprep.azurewebsites.net/ProfilePhoto/${data.urlPhoto}`
              );
            }
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      }
    }
  }, [isLoggedIn, profileImage]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const goToSavedQuestions = () => {
    const newState = !isBookmarkActive;
    setIsBookmarkActive(newState);
    localStorage.setItem("bookmarkActive", newState.toString());
    
    if (newState) {
      navigate("/saved_questions", { state: { savedQuestions } });
    } else {
      navigate("/");
    }
  };

  
  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("bookmarkActive");
  //   setIsLoggedIn(false);
  //   navigate("/login");
  // };

  useEffect(() => {
    const hasLoggedOut = sessionStorage.getItem("hasLoggedOut");

    if (!hasLoggedOut) {
      localStorage.removeItem("token");
      localStorage.removeItem("bookmarkActive");
      setIsLoggedIn(false);
      sessionStorage.setItem("hasLoggedOut", "true");
    }
  }, []);

  return (
    <div>
      <nav
        className={`text-black fixed top-0 left-0 w-full z-50 transition-shadow duration-300 font-bold ${
          hasShadow ? "bg-white shadow-md shadow-[#4627757c]" : ""
        }`}
      >
        <div className="container relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-auto h-12" />
            </Link>
          </div>

          {/* Links */}
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
                className={`hover:text-secondary px-2 relative ${
                  location.pathname === link.to
                    ? "text-secondary after:content-[''] after:absolute after:right-0 after:bottom-[-2px] after:w-[35%] after:h-[2.41px] after:bg-secondary before:content-[''] before:absolute before:left-0 before:top-0 before:w-[35%] before:h-[2.50px] before:bg-secondary "
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
                >
                  {isBookmarkActive ? (
                    <FaBookmark className="text-primary" />
                  ) : (
                    <FaRegBookmark className="text-primary" />
                  )}
                </button>
                <Link to="/profile">
                  <img
                    src={profileImage}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <div className="hidden gap-4 md:flex">
                <Link
                  to="/login"
                  className="px-3 py-1 border-2 rounded border-secondary text-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="px-3 py-1 border-2 rounded border-secondary text-secondary"
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
            {/* Background Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 top-28"
              onClick={closeMenu}
            ></div>

            {/* Mobile Menu */}
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
              <div className="flex gap-5 py-5 ml-5">
                {isLoggedIn ? (
                  <></>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-1 border-2 rounded border-secondary text-secondary"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/sign-up"
                      className="px-3 py-1 border-2 rounded border-secondary text-secondary"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
      <div className="h-20"></div>
    </div>
  );
}

export default Navbar;