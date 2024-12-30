import React from "react";
import "../About_Com/About.css";

const HeroAbout = () => {
  return (
    <>
      <div className="About-hero ">
        <div className="title text-center">
          <h1 className="text-secondary text-2xl md:text-4xl sm:text-3xl ">About Q-Prep</h1>
          <p style={{ width: "80%", margin: "auto" }} className="text-sm text-gray-600 sm:text:xl md:text-2xl pt-3 ">
            Empowering You to Make Informed Decisions and Choose the Perfect
            Career Track to Achieve Your Goals
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroAbout;
