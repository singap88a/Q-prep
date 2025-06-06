/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Login_animation from "../../../public/animations/Login_animation.json";
import Google from "../../assets/home-img/google.png";
import Facebook from "../../assets/home-img/facebook.png";
import Apple from "../../assets/home-img/apple.png";
import { AuthContext } from "../../components/Auth/AuthContext";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  // const [userRole, setUserRole] = useState([]);
  const { setUserRole } = useContext(AuthContext);

  // console.log("userRole login:", userRole)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://redasaad.azurewebsites.net/api/Authenticate/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Server error occurred");
      }

      console.log("Login data:", data);

      if (!response.ok) {
        const err = new Error(data.message || data.error || "Login failed. Please check your credentials.");
        err.status = response.status;
        throw err;
      }

      localStorage.setItem("token", data.token);

      // Need reda send
      // localStorage.setItem("refreshToken", data.refreshToken);

      localStorage.setItem("role", JSON.stringify(data.roles));
      // setUserRole(localStorage.getItem("role"));
      // setUserRole(JSON.parse(localStorage.getItem("role")) || []);

      // role
      if (data.roles.includes("Admin")) {
        setSuccess("Login successful! Redirecting to admin panel...");
      } else {
        setSuccess("Login successful! Redirecting to home...");
      }
      setUserRole(JSON.parse(localStorage.getItem("role")) || []);
      setIsLoggedIn(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Login failed. Please try again.");
      if (error.status === 401) {
        navigate("/login")
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('Email', email);

      const response = await fetch(
        "https://redasaad.azurewebsites.net/api/Authenticate/ForgetPassword",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset code");
      }

      const message = await response.text();
      setSuccess(message);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col-reverse py-16 gap-28 md:flex-row">
        <div className="w-full">
          <Lottie
            animationData={Login_animation}
            className="md:w-[75%] m-auto flex flex-col"
          />
        </div>
        <div className="w-full">
          <div className="md:w-[70%] m-auto flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back to Q-Prep
            </h1>
            <p className="mb-6 text-primary">Login now!</p>
            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
                {success}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg border-secondary text-secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg border-secondary text-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-secondary mt-1 block"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white transition rounded-lg bg-secondary hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="mt-6">
              <Link
                to="/sign-up"
                className="flex justify-center mt-6 text-center text-primary hover:text-secondary"
              >
                Create a new account
              </Link>
            </div>{" "}
            {/* <p className="mt-6 text-center text-primary">Login with</p>
            <div className="flex justify-center gap-10 mt-4">
              <img
                src={Google}
                alt="Google"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src={Facebook}
                alt="Facebook"
                className="w-6 h-6 cursor-pointer"
              />
              <img src={Apple} alt="Apple" className="w-6 h-6 cursor-pointer" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
