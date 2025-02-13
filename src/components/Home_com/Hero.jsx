// import React from 'react'

import { Link } from "react-router-dom";
// import hero from "../../assets/home-img/hero-home.png";
// import hero_color from "../../assets/home-img/hero-color.png";
// import hero_3 from "../../assets/home-img/hero-3.png";
import Lottie from "lottie-react";
import Hero_animation from "../../../public/animations/Hero_2.json";
function Hero() {
  return (
    <div className="pb-2">
      <div className="container ">
        <div className="flex flex-col-reverse justify-between gap-28 md:flex-row">
          <div className="w-full pt-16 ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-2xl font-extrabold sm:text-3xl text-secondary ">
              Prepare for your interviews with confidence!
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed  text-[#06163AA8]">
              Our platform offers tailored questions for your chosen career
              track, expert tips, interactive challenges, skill-level
              assessments, and personalized resources to help you excel in any
              job interview. Whether youre just starting or aiming to refine
              your expertise, we ve got everything you need to succeed.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 text-center">
              <Link to="/choosetrack/1">
                <div className="relative z-10 px-2 py-2 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">
                  Choose your track now!
                </div>
              </Link>
              <Link to="/test_your_level">
                <div className="relative z-10 px-2 py-2 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white">
                  Test your level
                </div>
              </Link>
            </div>
          </div>
          <div className="">
            {/* <div className="relative flex items-center justify-center w-full ">
              <img
                className="object-cover  md:w-[65%] z-10 flex  flex-col"
                src={hero}
                alt="Image"
              />
              <img
                className="object-cover flex-col md:w-[65%] absolute z-11   "
                src={hero_color}
                alt="Image"
              />
              <img
                className="object-cover  w-[60%] absolute left-[-35%] top-[40%] rotate-6 hidden sm:block"
                src={hero_3}
                alt="Image"
              />
            </div> */}
            <Lottie
              animationData={Hero_animation}
              className="  md:w-[100%] w-full   "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
