// import React from 'react'
import { Link } from "react-router-dom";
// import home_works from "../../assets/home-img/home_works.png";
import Lottie from "lottie-react";
import works_animation from "../../../public/animations/Hero.json";
function Works() {
  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="w-full md:w-[55%] flex flex-col justify-center">
          <h1 className="mb-4 text-2xl font-bold ">
            How it{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-slate-500 to-secondary bg-clip-text">
              works
            </span>
          </h1>
          <p className="mb-4 text-xl font-semibold text-gray-900">
            Preparing for your interview with Q-Prep is simple and
            straightforward! Follow these steps to get started:
          </p>
          <h1 className="mb-4 font-bold text-2x1 text-primary">
            1. Get Ready for Success with Q-Prep!
          </h1>
          <p className="mb-4 ml-5 text-xl font-semibold text-gray-900">
            Select the field or track you want to focus on, such as software
            development, marketing, or design{" "}
          </p>
          <h1 className="mb-4 font-bold text-2x1 text-primary">
            2. Take the Level Assessment
          </h1>
          <p className="mb-4 ml-5 text-xl font-semibold text-gray-900">
            Complete a quick test to determine your expertise level (Beginner,
            Intermediate, or Advanced){" "}
            <Link className="text-lg underline text-primary">Read more</Link>
          </p>
        </div>
        <div className="w-full md:w-[50%] flex justify-center mb-6 md:mb-0">
          <Lottie animationData={works_animation} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default Works;
