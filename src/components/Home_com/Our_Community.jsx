// import React from 'react'
import Home_Community from "../../assets/home-img/Home_Community.png"
import logo from "../../assets/home-img/logo.png"

function Our_Community() {
  return (
    <div className="py-10">
        <div className="container ">
        <h1 className="py-5 text-2xl font-bold">Our Community</h1>
        <div className="grid justify-between gap-4 p-6 border-2 rounded-[10px] sm:grid-cols-1 md:grid-cols-2 border-secondary">
           <div className="m-auto">
             <img src={logo} alt="" />
             <p className= "py-4 text-3xl text-gray-600">Join a growing network of professionals and job seekers who are here to support each other on their journey to success.</p>
             <button className="relative z-10 px-2 py-2 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">Be Part of the Q-Prep Community</button>
             
           </div>
           <div className="m-auto">
            <img src={Home_Community} alt="" className="w-full md:w-[80%] flex flex-col"/>
           </div>
         </div>
      
    </div> 
    </div>
   
  )
}

export default Our_Community
