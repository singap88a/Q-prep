// import React from 'react'

import { Link } from "react-router-dom"
 import hero from '../../assets/hero-home.png'
 import hero_color from '../../assets/hero-color.png'
 import hero_3 from '../../assets/hero-3.png'



function Hero() {
  return (
    <div>
         <div>
      <div className="flex-container container">
        <div className="ltr:sm:text-left rtl:sm:text-right coll">
          <h1 className="text-3xl font-extrabold sm:text-2xl text-secondary">
            Prepare for your interviews with confidence!
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed  text-[#06163AA8]">
            Our platform offers tailored questions for your chosen career track,
            expert tips, interactive challenges, skill-level assessments, and
            personalized resources to help you excel in any job interview.
            Whether youre just starting or aiming to refine your expertise, we
            ve got everything you need to succeed.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
           <Link>
           <div className="rounded bg-secondary text-white px-3 py-2  border-secondary  ">
           Choose your track now!
            
           </div>
           
           </Link>
           <Link>
           <div className="rounded   px-11 py-2 border-2 border-secondary text-secondary ">
           Test your level
            
           </div>
           
           </Link>
          </div>
        </div>
        <div className="coll">
          <div className="flex justify-center items-center h-full w-full relative py-20 ">
            <img
              className="object-cover  w-[50%] z-10"
              src={hero}
              alt="Image"
            />
                 <img
              className="object-cover  w-[65%] absolute z-11 "
              src={hero_color}
              alt="Image"
            />
                    <img
              className="object-cover  w-[45%] absolute left-[-20%] top-[40%] rotate-6  "
              src={hero_3}
              alt="Image"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hero
