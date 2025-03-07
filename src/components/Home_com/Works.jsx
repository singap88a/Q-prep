import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import works_animation from "../../../public/animations/Hero.json";
import { motion } from "framer-motion";

function Works() {
  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}  
          className="w-full md:w-[55%] flex flex-col justify-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }} 
            className="mb-4 text-2xl font-bold"
          >
            How it{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-slate-500 to-secondary bg-clip-text">
              works
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}  
            className="mb-4 text-xl font-semibold text-gray-900"
          >
            Preparing for your interview with Q-Prep is simple and
            straightforward! Follow these steps to get started:
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}  
            className="mb-4 font-bold text-2x1 text-primary"
          >
            1. Get Ready for Success with Q-Prep!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}  
            className="mb-4 ml-5 text-xl font-semibold text-gray-900"
          >
            Select the field or track you want to focus on, such as software
            development, marketing, or design{" "}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }} 
            className="mb-4 font-bold text-2x1 text-primary"
          >
            2. Take the Level Assessment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}  
            className="mb-4 ml-5 text-xl font-semibold text-gray-900"
          >
            Complete a quick test to determine your expertise level (Beginner,
            Intermediate, or Advanced){" "}
            <Link className="text-lg underline text-primary">Read more</Link>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}  
          className="w-full md:w-[50%] flex justify-center mb-6 md:mb-0"
        >
          <Lottie animationData={works_animation} className="w-full" />
        </motion.div>
      </div>
    </div>
  );
}

export default Works;