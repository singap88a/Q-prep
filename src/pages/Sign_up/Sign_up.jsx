// import React from 'react'
import sign_up from "../../assets/home-img/Sign-up.png";
import Google from "../../assets/home-img/google.png";
import Facebook from "../../assets/home-img/facebook.png";
import Apple from "../../assets/home-img/apple.png";

function Sign_up() {
  return (
    <div className="container flex-col-reverse flex-container md:flex-row">
      <div className="coll ">
        <img src={sign_up} alt="" className="md:w-[60%] m-auto flex flex-col" />
      </div>
      <div className="coll">
        <div className=" md:w-[70%] m-auto flex flex-col  ">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Q-Prep
          </h1>
          <p className="mb-6 text-primary">Register your account</p>
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
                className="w-full p-3 border rounded-lg border-secondary text-secondary "
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
              Sign up
            </button>
          </form>

          {/* Social Login */}
          <p className="mt-6 text-center text-primary">Create account with</p>
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
