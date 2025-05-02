// import React from 'react'

import About_Q_Prep from "../../components/Home_com/About_Q-Prep";
import Available_Tracks from "../../components/Home_com/Available_Tracks";
import FAQ from "../../components/Home_com/FAQ";
import Hero from "../../components/Home_com/Hero";
import Our_Community from "../../components/Home_com/Our_Community";
import Our_Features from "../../components/Home_com/Our_Features";
import Our_Numbers from "../../components/Home_com/Our_Numbers";
import Works from "../../components/Home_com/Works";
import RefreshToken from "../Login/RefreshToken";

function Home() {
  return (
    <div className="">
      <Hero />
      <Available_Tracks />
      <About_Q_Prep/>
      <Our_Features/>
      <Works/>
      <Our_Numbers/>
      <Our_Community/>
      <FAQ/>
    </div>
  );
}

export default Home;
