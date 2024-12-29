// import React from 'react'
import sign_up from "../../assets/Sign-up.png";
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Apple from "../../assets/apple.png";

function Sign_up() {
  return (
    <div className=" container flex-container ">
      <div className="coll ">
        <img src={sign_up} alt="" className="w-[60%] m-auto" />
      </div>
      <div className="coll">
        <div className=" w-[70%] m-auto  ">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Q-Prep
          </h1>
          <p className="text-primary mb-6">Register your account</p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Hanin Burham"
                className="w-full p-3 border border-secondary rounded-lg text-secondary  "
              />
            </div>

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
                className="w-full p-3 border border-secondary rounded-lg text-secondary  "
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
                className="w-full p-3 border border-secondary rounded-lg text-secondary  "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Sign up
            </button>
          </form>

          {/* Social Login */}
          <p className="text-center text-primary mt-6">Create account with</p>
          <div className="flex justify-center gap-10 mt-4">
            <img src={Google} alt="Google" className="w-6 h-6 cursor-pointer" />
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

export default Sign_up;
