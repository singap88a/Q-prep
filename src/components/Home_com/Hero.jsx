// import React from 'react';
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Hero_animation from "../../../public/animations/Hero_2.json";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="pb-2">
      <div className="container">
        <div className="flex flex-col-reverse justify-between gap-28 md:flex-row">
          <div className="w-full pt-16 ltr:sm:text-left rtl:sm:text-right">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-extrabold sm:text-3xl text-secondary"
            >
              Prepare for your interviews with confidence!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-lg sm:text-xl/relaxed text-[#06163AA8]"
            >
              Our platform offers tailored questions for your chosen career
              track, expert tips, interactive challenges, skill-level
              assessments, and personalized resources to help you excel in any
              job interview. Whether you re just starting or aiming to refine
              your expertise, we ve got everything you need to succeed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mt-8 text-center"
            >
              <Link to="/choosetrack">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 px-2 py-2 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
                >
                  Choose your track now!
                </motion.div>
              </Link>
              {/* <Link to="/test_your_level">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 px-2 py-2 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
                >
                  Test your level
                </motion.div>
              </Link> */}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Lottie
              animationData={Hero_animation}
              className="md:w-[100%] w-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;