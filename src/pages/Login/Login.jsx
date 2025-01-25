/* eslint-disable react/prop-types */
// import React from 'react'
// import login from "../../assets/home-img/login.png";
import Google from "../../assets/home-img/google.png";
import Facebook from "../../assets/home-img/facebook.png";
import Apple from "../../assets/home-img/apple.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Login_animation from "../../../public/animations/Login_animation.json"
function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    if (email && password) {
      setIsLoggedIn(true);
      navigate("/");
    }
  };
  return (
    <div className="container ">
      
    <div className="flex flex-col-reverse py-16 gap-28 md:flex-row">
      <div className="w-full ">
        {/* <img src={login} alt="" className="md:w-[70%] m-auto flex flex-col animate-zoom " /> */}
        <Lottie animationData={Login_animation} className="md:w-[75%] m-auto flex flex-col   "/>

      </div>
      <div className="w-full">
        <div className=" md:w-[70%] m-auto flex flex-col ">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back to Q-Prep{" "}
          </h1>
          <p className="mb-6 text-primary">Login now!</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg border-secondary text-secondary "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border rounded-lg border-secondary text-secondary "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white transition rounded-lg bg-secondary hover:bg-purple-700"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <p className="mt-6 text-center text-primary">Create account with</p>
          <div className="flex justify-center gap-10 mt-4">
            <img
              src={Google}
              alt="Google"
              className="w-6 h-6 cursor-pointer "
            />
            <img
              src={Facebook}
              alt="Facebook"
              className="w-6 h-6 cursor-pointer"
            />
            <img src={Apple} alt="Apple" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default Login;
