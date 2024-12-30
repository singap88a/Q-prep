import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/home-img/logo.png";
function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);
    const location = useLocation();
  
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
          className={`  text-black fixed top-0 left-0 w-full z-50 transition-shadow duration-300 font-bold ${
            hasShadow ? " bg-white shadow-[#4627757e] shadow-md" : ""
          }`}
        >
          <div className="container flex items-center justify-between h-16">
             <div className="text-xl font-bold">
                <Link to="/">
                  <img src={logo} alt="Logo" className="w-auto h-12" />
                </Link>
 
             </div>
  
             <div className="hidden space-x-4 md:flex">
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About Us" },
                { to: "/track", text: "Choose Your Track" },
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
  
             <div className="hidden space-x-4 md:flex">
              <Link
                to="/login"
                className={`px-4 py-1 rounded ${
                  location.pathname === "/login"
                    ? "text-white bg-secondary"
                    : "border-2 border-secondary text-secondary"
                } relative   overflow-hidden font-bold border-2 rounded-md   isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white`}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className={`px-4 py-1 rounded ${
                  location.pathname === "/sign-up"
                    ? "text-white bg-secondary"
                    : "border-2 border-secondary text-secondary"
                  } relative overflow-hidden font-bold border-2 rounded-md isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white`}
                  >
                Sign Up
              </Link>
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
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
  
          {/* Mobile Menu */}
          {isOpen && (
            <div className="text-black bg-white border-b-2 md:hidden "    >
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About Us" },
                { to: "/track", text: "Choose Your Track" },
                { to: "/community", text: "Our Community" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2 hover:bg-gray-600 ${
                    location.pathname === link.to ? " text-white" : ""
                  }`}
                >
                  {link.text}
                </Link>
              ))}
              <div className="flex gap-5 py-5 ml-5">
                      <Link
                to="/login"
                className={`px-4 py-1 rounded block  ${
                  location.pathname === "/login"
                    ? "text-white bg-secondary"
                    : "border-2 border-secondary text-secondary"
                } hover:bg-secondary hover:text-white transition-all`}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className={`px-4 py-1 rounded block ${
                  location.pathname === "/sign-up"
                    ? "text-white bg-secondary"
                    : "border-2 border-secondary text-secondary"
                } hover:bg-secondary hover:text-white transition-all`}
              >
                Sign Up
              </Link>
              </div>
        
            </div>
          )}
        </nav>
  
        {/* Spacer */}
        <div className="h-20"></div>
  
    
 
      </div>
    );
  }
  
  export default Navbar;
  