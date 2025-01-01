import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/home-img/logo.png";
import userImage from "../assets/user.png";  

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const location = useLocation();
  {
    /* icon Saved questions start */
  }

  const [active, setActive] = useState(false);
  const handleGlobalLinkClick = (e) => {
    if (e.target.tagName === "A") {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleGlobalLinkClick);

    return () => {
      document.removeEventListener("click", handleGlobalLinkClick);
    };
  }, []);
  {
    /* icon Saved questions end */
  }

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`text-black fixed top-0 left-0 w-full z-50 transition-shadow duration-300 font-bold ${
          hasShadow ? "bg-white shadow-md shadow-[#4627757c]" : ""
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-auto h-12" />
            </Link>
          </div>

          {/* Links */}
          <div className="hidden space-x-4 md:flex">
            {[
              { to: "/", text: "Home" },
              { to: "/about", text: "About Us" },
              { to: "/choosetrack/1", text: "Choose Your Track" },
              { to: "/community", text: "Our Community" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-secondary px-2 relative ${
                  location.pathname === link.to
                    ? "text-secondary after:content-[''] after:absolute after:right-0 after:bottom-[-2px] after:w-[35%] after:h-[3px] after:bg-secondary before:content-[''] before:absolute before:left-0 before:top-0 before:w-[35%] before:h-[3px] before:bg-secondary "
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
              <div className="flex items-center gap-3 space-x-2">
                {/* icon Saved questions */}
                <Link
                  to="/saved_questions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(true);
                  }}
                  className={`bookmark-link ${
                    active ? "text-primary" : "text-gray-900"
                  }`}
                >
                  <i className="text-2xl font-semibold fa-regular fa-bookmark"></i>
                </Link>

                <img
                  src={userImage}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-1 text-red-600 border-2 border-red-600 rounded-md "
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-1 rounded ${
                    location.pathname === "/login"
                      ? "text-white bg-secondary"
                      : "border-2 border-secondary text-secondary"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className={`px-4 py-1 rounded ${
                    location.pathname === "/sign-up"
                      ? "text-white bg-secondary"
                      : "border-2 border-secondary text-secondary"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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
          <div className="text-black bg-white border-b-2 md:hidden">
            {[
              { to: "/", text: "Home" },
              { to: "/about", text: "About Us" },
              { to: "/choosetrack", text: "Choose Your Track" },
              { to: "/community", text: "Our Community" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 hover:bg-gray-200 ${
                  location.pathname === link.to ? "text-secondary" : ""
                }`}
              >
                {link.text}
              </Link>
            ))}
            <div className="flex gap-5 py-5 ml-5">
              {isLoggedIn ? (
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-1 text-red-600 border-2 border-red-600 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-1 border-2 rounded border-secondary text-secondary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="px-4 py-1 border-2 rounded border-secondary text-secondary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-20"></div>
    </div>
  );
}

export default Navbar;
