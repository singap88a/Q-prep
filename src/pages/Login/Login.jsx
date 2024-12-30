// import React from 'react'
import login from "../../assets/home-img/login.png";
import Google from "../../assets/home-img/google.png";
import Facebook from "../../assets/home-img/facebook.png";
import Apple from "../../assets/home-img/apple.png";

function Login() {
  return (
    <div className="container flex-col-reverse flex-container md:flex-row">
      <div className="coll ">
        <img src={login} alt="" className="md:w-[60%] m-auto flex flex-col " />
      </div>
      <div className="coll">
        <div className=" md:w-[70%] m-auto flex flex-col ">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back to Q-Prep{" "}
          </h1>
          <p className="mb-6 text-primary">Login now!</p>
          <form className="space-y-4">
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
                placeholder="Haninburham@gmail.com"
                className="w-full p-3 border rounded-lg border-secondary text-secondary "
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Write strong password"
                className="w-full p-3 border rounded-lg border-secondary text-secondary "
              />
            </div>

            {/* Submit Button */}
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
            <img src={Google} alt="Google" className="w-6 h-6 cursor-pointer " />
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
  );
}

export default Login;
